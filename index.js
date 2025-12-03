/* ============================================
   LANDING PAGE - LSPORTS
   JavaScript Interactivity & Conversions
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // UTILS
    // ============================================

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const addClass = (el, cls) => el.classList.add(cls);
    const removeClass = (el, cls) => el.classList.remove(cls);
    const toggleClass = (el, cls) => el.classList.toggle(cls);
    const hasClass = (el, cls) => el.classList.contains(cls);

    // ============================================
    // NAVBAR & MOBILE MENU
    // ============================================

    function setupNavigation() {
        const menuToggle = $('#menuToggle');
        const mobileMenu = $('#mobileMenu');
        const mobileLinks = $$('.mobile-link');

        // Toggle mobile menu
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                toggleClass(mobileMenu, 'active');
            });
        }

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                removeClass(mobileMenu, 'active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = $('nav.navbar');
            if (window.scrollY > 50) {
                addClass(navbar, 'scrolled');
            } else {
                removeClass(navbar, 'scrolled');
            }
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================

    function setupFAQ() {
        const faqItems = $$('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close others
                faqItems.forEach(other => {
                    if (other !== item) {
                        removeClass(other, 'active');
                    }
                });
                
                // Toggle current
                toggleClass(item, 'active');
            });
        });
    }

    // ============================================
    // MODAL - DEMO
    // ============================================

    function setupModal() {
        const demoBtn = $('#demoBtn');

        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                // Redirecionar para página de demonstração
                window.open('https://l-sports.vercel.app/cliente1/login.html', '_blank');
            });
        }
    }

    // ============================================
    // WHATSAPP INTEGRATION
    // ============================================

    function setupWhatsApp() {
        const whatsappPhone = '5562984894774';
        const whatsappMessage = encodeURIComponent('Olá, tenho interesse no sistema LSports');
        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

        const whatsappButtons = $$('.whatsapp-btn');

        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(whatsappUrl, '_blank');
            });
        });
    }

    // ============================================
    // FORM HANDLING - LEAD CAPTURE
    // ============================================

    function setupForms() {
        const leadForm = $('#leadForm');

        if (leadForm) {
            leadForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = leadForm.querySelector('input[type="text"]').value;
                const email = leadForm.querySelector('input[type="email"]').value;
                const phone = leadForm.querySelector('input[type="tel"]').value;
                const quadras = leadForm.querySelector('select').value;

                // Validation
                if (!name || !email || !phone || !quadras) {
                    showNotification('Por favor, preencha todos os campos', 'error');
                    return;
                }

                try {
                    // Enviar via FormSubmit (serviço gratuito, sem Tracking Prevention issues)
                    const formData = new FormData();
                    formData.append('name', name);
                    formData.append('email', email);
                    formData.append('phone', phone);
                    formData.append('quadras', quadras);
                    formData.append('date', new Date().toLocaleString('pt-BR'));
                    formData.append('_captcha', 'false');
                    formData.append('_next', window.location.href);

                    const response = await fetch('https://formsubmit.co/ajax/lfsoftware004@gmail.com', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error(`Erro ao enviar: ${response.statusText}`);
                    }

                    const result = await response.json();

                    console.log('Lead enviado com sucesso:', { name, email, phone, quadras });

                    // Show success
                    showNotification('✓ Cadastro realizado! Você receberá um email em breve.', 'success');

                    // Reset form
                    leadForm.reset();

                    // Track conversion
                    trackConversion('lead_submitted', { name, email, quadras });

                } catch (error) {
                    console.error('Erro ao enviar lead:', error);
                    showNotification('❌ Erro ao enviar. Tente novamente.', 'error');
                }
            });
        }
    }

    // ============================================
    // NOTIFICATIONS
    // ============================================

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#0c63e4'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addClass(entry.target, 'animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        $$('.feature-card, .benefit-row, .testimonial-card, .pricing-card, .faq-item').forEach(el => {
            observer.observe(el);
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================

    function animateCounters() {
        const counters = $$('.stat-count');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 20);
    }

    // ============================================
    // CONVERSION TRACKING
    // ============================================

    function trackConversion(event, data = {}) {
        // Log to console (for development)
        console.log(`Conversion: ${event}`, data);

        // In production, send to analytics service (Google Analytics, Hotjar, etc)
        // Example:
        // if (window.gtag) {
        //     gtag('event', event, data);
        // }
    }

    // ============================================
    // SMOOTH SCROLL LINKS
    // ============================================

    function setupSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && $(href)) {
                    e.preventDefault();
                    $(href).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ============================================
    // PERFORMANCE - LAZY LOAD IMAGES
    // ============================================

    function setupLazyLoad() {
        if ('IntersectionObserver' in window) {
            const images = $$('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ============================================
    // CSS ANIMATIONS STYLES
    // ============================================

    function injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            .feature-card, .benefit-row, .testimonial-card, .pricing-card, .faq-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }

            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Formulário usa FormSubmit.co (não requer EmailJS)
        console.log('✓ Sistema de formulários configurado (FormSubmit)');

        // Inject animation styles
        injectAnimationStyles();

        // Setup all features
        setupNavigation();
        setupFAQ();
        setupModal();
        setupWhatsApp();
        setupForms();
        setupSmoothScroll();
        setupScrollAnimations();
        setupLazyLoad();
        animateCounters();

        // Track page view
        trackConversion('page_view', {
            page: document.title,
            timestamp: new Date().toISOString()
        });

        // Log initialization
        console.log('✓ LSports Landing Page initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
