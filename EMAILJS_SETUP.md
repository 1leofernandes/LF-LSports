# 📧 Como Configurar EmailJS - Guia Completo

Agora vamos obter suas chaves do EmailJS e configurar tudo para receber leads no seu email.

---

## ✅ PASSO 1: Criar Conta no EmailJS

1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up Free"**
3. Escolha: **Sign up with GitHub** (recomendado) ou com Email
4. Confirme seu email

---

## ✅ PASSO 2: Obter suas Chaves

### 2.1 Pegar a Public Key

1. No dashboard do EmailJS, clique em **"Account"** (ícone de engrenagem no canto superior direito)
2. Na aba **"Account"**, procure por **"General"**
3. Copie a **"Public Key"** (será algo como: `abc123XyZ...`)

### 2.2 Criar Email Service (Gmail)

1. No dashboard, clique em **"Email Services"** (no menu esquerdo)
2. Clique em **"Add Service"**
3. Selecione **"Gmail"**
4. Clique em **"Connect Account"**
5. Autorize o EmailJS a acessar seu Gmail (use: `lfsoftware004@gmail.com`)
6. **Copie o Service ID** (exemplo: `service_abc123xyz`)

---

## ✅ PASSO 3: Criar Template de Email

### 3.1 Acessar Templates

1. No dashboard, clique em **"Email Templates"** (menu esquerdo)
2. Clique em **"Create New Template"**

### 3.2 Configurar Template

Preencha assim:

**Nome do Template**: `LSports Lead Notification`

**Destinatário (To Email)**: `{{to_email}}`

**Assunto**: `🚀 Novo Lead LSports - {{from_name}}`

**HTML Body** (copie e cole):

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f8f9ff;
        border-radius: 8px;
      }
      .header {
        background: linear-gradient(135deg, #5a2ea6 0%, #7c3aed 100%);
        color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
      }
      .content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin-top: 10px;
      }
      .field {
        margin: 15px 0;
      }
      .label {
        font-weight: bold;
        color: #5a2ea6;
      }
      .value {
        color: #333;
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>🎉 Novo Lead Recebido!</h2>
      </div>

      <div class="content">
        <div class="field">
          <div class="label">📝 Nome:</div>
          <div class="value">{{from_name}}</div>
        </div>

        <div class="field">
          <div class="label">📧 Email:</div>
          <div class="value">{{from_email}}</div>
        </div>

        <div class="field">
          <div class="label">📱 Telefone:</div>
          <div class="value">{{phone}}</div>
        </div>

        <div class="field">
          <div class="label">🏐 Quadras:</div>
          <div class="value">{{quadras}}</div>
        </div>

        <div class="field">
          <div class="label">🕐 Data:</div>
          <div class="value">{{date}}</div>
        </div>
      </div>
    </div>
  </body>
</html>
```

3. Clique em **"Save"**
4. **Copie o Template ID** (que aparece no topo da página)

---

## ✅ PASSO 4: Preencher as Chaves no Arquivo

Agora que você tem as 3 chaves, vamos preencher o arquivo `emailjs-config.js`:

### Abra o arquivo: `public/emailjs-config.js`

```javascript
// ============================================
// EmailJS Configuration
// ============================================

const EMAILJS_CONFIG = {
  // Seu Service ID
  SERVICE_ID: "service_abc123xyz", // ← Cole aqui seu Service ID do Gmail

  // Seu Template ID
  TEMPLATE_ID: "template_xyz789", // ← Cole aqui seu Template ID

  // Sua Public Key
  PUBLIC_KEY: "seu_public_key_aqui", // ← Cole aqui sua Public Key
};
```

**Exemplo preenchido:**

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_h7k3j2m8b",
  TEMPLATE_ID: "template_5x9y2k1w",
  PUBLIC_KEY: "JKhB3j2K_j3K3j2KJKhB3j2K",
};
```

---

## ✅ PASSO 5: Testar Localmente

### 5.1 Servir os arquivos

```bash
# Na pasta c:\Users\Leonardo\Desktop\LSports
cd c:\Users\Leonardo\Desktop\LSports

# Com Python
python -m http.server 8000

# OU com Node
npx http-server
```

### 5.2 Acessar a página

Abra no navegador: `http://localhost:8000/index.html`

### 5.3 Testar o formulário

1. Preencha o formulário com dados de teste
2. Clique em **"Começar Teste Grátis"**
3. Você deve receber um email em **lfsoftware004@gmail.com** em segundos!

---

## 🎯 O que Você Vai Receber

Cada lead será um email formatado assim:

```
🚀 Novo Lead LSports - João Silva

📝 Nome: João Silva
📧 Email: joao@example.com
📱 Telefone: (62) 98489-4774
🏐 Quadras: 6+ quadras
🕐 Data: 03/12/2025, 14:30:25
```

---

## ❌ Se Algo Não Funcionar

### Erro: "EmailJS not initialized"

- ✅ Verificar se a Public Key está preenchida corretamente em `emailjs-config.js`
- ✅ Verificar se o arquivo `emailjs-config.js` está sendo carregado (abrir DevTools → Console)

### Erro: "Invalid Service ID"

- ✅ Copiar novamente o Service ID do Gmail exatamente como aparece no dashboard

### Erro: "Invalid Template ID"

- ✅ Copiar novamente o Template ID exatamente como aparece no dashboard

### Não está recebendo emails

- ✅ Verificar a pasta de SPAM do Gmail
- ✅ Verificar se o Gmail foi autorizado no EmailJS Dashboard
- ✅ Abrir DevTools (F12) → Console e procurar por mensagens de erro

---

## 📱 Testar com DevTools

Abra o **DevTools** (F12) e na aba **Console**:

1. Quando preencher e submeter o formulário, você verá:

   ```
   ✓ LSports Landing Page initialized
   ✓ EmailJS inicializado
   Lead enviado com sucesso: {name: "...", email: "...", ...}
   ```

2. Se houver erro:
   ```
   Erro ao enviar lead: [erro detalhado]
   ```

---

## 🚀 Próximos Passos

1. ✅ Criar conta no EmailJS
2. ✅ Preencher o arquivo `emailjs-config.js` com suas chaves
3. ✅ Testar localmente
4. ✅ Fazer deploy em produção
5. ✅ Começar a receber leads! 🎉

---

## 📊 Limite Grátis do EmailJS

- **200 emails/mês** (grátis)
- Após isso: $15/mês por 5.000 emails adicionais

Para seus primeiros meses de vendas, deve ser mais que suficiente!

---

Pronto? Qualquer dúvida na configuração, é só avisar! 🚀
