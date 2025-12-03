# 📧 Configurando Recebimento de Leads por Email

Agora que a landing page está capturando leads através do formulário, você precisa configurar um sistema para **receber os dados dos usuários no seu email** (lfsoftware004@gmail.com).

---

## ✅ O que foi feito na Landing Page

- ✅ Todos os botões ("Teste Grátis", "Comece Agora", "Escolher Plano", "Falar com Vendas") redirecionam para WhatsApp
- ✅ Botão "Ver Demonstração" abre: https://l-sports.vercel.app/cliente1/login.html
- ✅ Formulário captura: **Nome, Email, Telefone, Quantidade de Quadras**

---

## 🚀 OPÇÃO 1: Usar Zapier (Recomendado - Mais Fácil)

Zapier conecta sua landing page a ferramentas externas como email, CRM, WhatsApp, etc.

### Passo 1: Criar conta no Zapier

1. Acesse: https://zapier.com/
2. Clique em "Sign Up" (crie conta gratuita)
3. Confirme seu email

### Passo 2: Criar um Webhook

1. No painel do Zapier, clique em "Create Zap"
2. Escolha **"Webhooks by Zapier"** como trigger
3. Selecione **"Catch Raw Hook"** (para receber dados POST)
4. Copie a **URL do Webhook** (aparecerá algo como: `https://hooks.zapier.com/hooks/catch/XXXXX/...`)

### Passo 3: Adicionar URL do Webhook ao JavaScript

Edite `/public/index.js` e encontre a função `setupForms()`:

```javascript
function setupForms() {
  const leadForm = $("#leadForm");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = leadForm.querySelector('input[type="text"]').value;
      const email = leadForm.querySelector('input[type="email"]').value;
      const phone = leadForm.querySelector('input[type="tel"]').value;
      const quadras = leadForm.querySelector("select").value;

      // Validação
      if (!name || !email || !phone || !quadras) {
        showNotification("Por favor, preencha todos os campos", "error");
        return;
      }

      // AQUI: Enviar dados para Zapier
      const webhookUrl = "COLE_SUA_URL_ZAPIER_AQUI";

      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          quadras: quadras,
          timestamp: new Date().toISOString(),
        }),
      })
        .then((response) => {
          console.log("Lead enviado:", { name, email, phone, quadras });
          showNotification(
            "✓ Cadastro realizado! Você receberá um email em breve.",
            "success"
          );
          leadForm.reset();
          trackConversion("lead_submitted", { name, email, quadras });
        })
        .catch((error) => {
          console.error("Erro ao enviar lead:", error);
          showNotification("Erro ao enviar. Tente novamente.", "error");
        });
    });
  }
}
```

### Passo 4: Configurar Email no Zapier

1. De volta no Zapier, após capturar o hook, clique em **"Continue"**
2. Agora escolha a **ação**: **Gmail** (ou Outlook, se preferir)
3. Autorize o Zapier a acessar seu Gmail
4. Configure o email:
   - **Para**: lfsoftware004@gmail.com
   - **Assunto**: `Novo Lead LSports - {Name}`
   - **Corpo**:
     ```
     Nome: {Name}
     Email: {Email}
     Telefone: {Phone}
     Quadras: {Quadras}
     Data: {Timestamp}
     ```

5. Clique em **"Test & Review"** e depois **"Publish Zap"**

---

## 🚀 OPÇÃO 2: Usar EmailJS (Alternativa - Sem Backend)

EmailJS permite enviar emails direto do JavaScript sem servidor.

### Passo 1: Criar conta

1. Acesse: https://www.emailjs.com/
2. Sign up com GitHub ou email
3. Confirme seu email

### Passo 2: Configurar Service e Template

1. Vá para **Admin Dashboard**
2. Clique em **"Email Services"**
3. **Add Service** → Gmail
4. Siga as instruções para autorizar seu Gmail (lfsoftware004@gmail.com)

### Passo 3: Criar Template de Email

1. Vá para **Email Templates**
2. **Create New Template**
3. Configure assim:
   - **To Email**: lfsoftware004@gmail.com
   - **Subject**: `Novo Lead LSports - {{name}}`
   - **Body**:

     ```
     Novo lead recebido!

     Nome: {{name}}
     Email: {{email}}
     Telefone: {{phone}}
     Quadras: {{quadras}}
     Data: {{date}}
     ```
4. Copie o **Template ID** (ex: `template_xxx`)

### Passo 4: Adicionar Script ao HTML

No arquivo `/public/index.html`, adicione no `<head>`:

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"
></script>
```

### Passo 5: Inicializar EmailJS no JavaScript

Edite `/public/index.js` e adicione no início da função `init()`:

```javascript
// Inicializar EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Pega no EmailJS Dashboard
```

### Passo 6: Atualizar setupForms()

```javascript
function setupForms() {
  const leadForm = $("#leadForm");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = leadForm.querySelector('input[type="text"]').value;
      const email = leadForm.querySelector('input[type="email"]').value;
      const phone = leadForm.querySelector('input[type="tel"]').value;
      const quadras = leadForm.querySelector("select").value;

      if (!name || !email || !phone || !quadras) {
        showNotification("Por favor, preencha todos os campos", "error");
        return;
      }

      // Enviar email via EmailJS
      emailjs
        .send("SERVICE_ID", "TEMPLATE_ID", {
          name: name,
          email: email,
          phone: phone,
          quadras: quadras,
          date: new Date().toLocaleString("pt-BR"),
        })
        .then(() => {
          console.log("Lead enviado:", { name, email, phone, quadras });
          showNotification(
            "✓ Cadastro realizado! Você receberá um email em breve.",
            "success"
          );
          leadForm.reset();
          trackConversion("lead_submitted", { name, email, quadras });
        })
        .catch((error) => {
          console.error("Erro ao enviar lead:", error);
          showNotification("Erro ao enviar. Tente novamente.", "error");
        });
    });
  }
}
```

---

## 🚀 OPÇÃO 3: Backend Node.js (Sua API Existente)

Se você quiser usar seu próprio backend (Express + Node.js), crie uma rota para receber leads:

### Passo 1: Adicionar Rota no `server.js`

```javascript
// Rota para receber leads
app.post("/api/leads", async (req, res) => {
  try {
    const { name, email, phone, quadras } = req.body;

    // Validação
    if (!name || !email || !phone || !quadras) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    // Salvar no banco de dados (opcional)
    // await database.leads.create({ name, email, phone, quadras });

    // Enviar email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "lfsoftware004@gmail.com",
      subject: `Novo Lead LSports - ${name}`,
      html: `
                <h2>Novo Lead Recebido</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Quadras:</strong> ${quadras}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            `,
    });

    res.json({ success: true, message: "Lead recebido com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar lead:", error);
    res.status(500).json({ error: "Erro ao processar lead" });
  }
});
```

### Passo 2: Atualizar `.env`

```
EMAIL_USER=lfsoftware004@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
```

### Passo 3: Atualizar JavaScript

```javascript
function setupForms() {
  const leadForm = $("#leadForm");

  if (leadForm) {
    leadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = leadForm.querySelector('input[type="text"]').value;
      const email = leadForm.querySelector('input[type="email"]').value;
      const phone = leadForm.querySelector('input[type="tel"]').value;
      const quadras = leadForm.querySelector("select").value;

      if (!name || !email || !phone || !quadras) {
        showNotification("Por favor, preencha todos os campos", "error");
        return;
      }

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, quadras }),
        });

        if (response.ok) {
          showNotification("✓ Cadastro realizado!", "success");
          leadForm.reset();
          trackConversion("lead_submitted", { name, email, quadras });
        }
      } catch (error) {
        console.error("Erro:", error);
        showNotification("Erro ao enviar. Tente novamente.", "error");
      }
    });
  }
}
```

---

## 📊 Recomendação Final

| Opção       | Facilidade             | Custo                   | Melhor Para    |
| ----------- | ---------------------- | ----------------------- | -------------- |
| **Zapier**  | ⭐⭐⭐⭐⭐ Muito Fácil | Grátis até 100 zaps/mês | Começar rápido |
| **EmailJS** | ⭐⭐⭐⭐ Fácil         | Grátis até 200/mês      | Sem servidor   |
| **Backend** | ⭐⭐⭐ Médio           | Seu servidor            | Controle total |

**Eu recomendo começar com Zapier** - é o mais rápido de implementar e está funcionando em 5 minutos!

---

## ✨ Resumo do que Fazer AGORA

1. ✅ Botões de WhatsApp → Pronto (já feito)
2. ✅ Link de Demonstração → Pronto (já feito)
3. ⏳ Escolha uma das 3 opções acima para receber leads
4. ⏳ Implemente a solução escolhida
5. ⏳ Teste o formulário localmente
6. ⏳ Deploy em produção

Precisa de ajuda com qualquer uma das opções? Avise! 🚀
