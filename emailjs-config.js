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

// Exportar para uso no index.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}
