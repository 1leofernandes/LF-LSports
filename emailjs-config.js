// ============================================
// EmailJS Configuration
// ============================================

// Substitua com suas chaves do EmailJS
// Obtenha em: https://dashboard.emailjs.com/

const EMAILJS_CONFIG = {
    // Seu Service ID (obtém ao criar conta)
    SERVICE_ID: 'service_bs08uxp',
    
    // Seu Template ID (obtém ao criar template)
    TEMPLATE_ID: 'template_6pt7h3m',
    
    // Sua Public Key (obtém no dashboard)
    PUBLIC_KEY: 'gDKeENDsM2D2NzaJt'
};

// Aguardar EmailJS estar disponível (versão global)
(function() {
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkEmailJS = setInterval(() => {
        attempts++;
        
        // Verificar se emailjs está disponível (versão global ou como módulo)
        const emailjsLib = (typeof window !== 'undefined' && window.emailjs) || 
                          (typeof emailjs !== 'undefined' && emailjs);
        
        if (emailjsLib && typeof emailjsLib.init === 'function') {
            console.log('✓ EmailJS detectado!');
            try {
                emailjsLib.init(EMAILJS_CONFIG.PUBLIC_KEY);
                console.log('✓ EmailJS inicializado com sucesso');
                window.emailjsLib = emailjsLib; // Armazenar em window para fácil acesso
            } catch (e) {
                console.error('Erro ao inicializar EmailJS:', e);
            }
            clearInterval(checkEmailJS);
        } else if (attempts > maxAttempts) {
            console.warn('⚠ EmailJS não carregou após tentativas. FormularioSTEM funcionará via alternativa.');
            clearInterval(checkEmailJS);
        }
    }, 100);
})();

// Exportar para uso no index.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}
