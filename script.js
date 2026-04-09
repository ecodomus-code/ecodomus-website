// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Language Switcher
let currentLang = localStorage.getItem('language') || 'it';

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-it][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Check if it's a button or link with text content
            if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                element.textContent = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
    
    // Update form placeholders
    document.querySelectorAll('[data-placeholder-it][data-placeholder-en]').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.setAttribute('placeholder', placeholder);
        }
    });
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLang);
    
    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('.benefit-card, .service-card, .process-step, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contact Form Submission (EmailJS)
const EMAILJS_SERVICE_ID = 'service_yczfsth';
const EMAILJS_TEMPLATE_ID = 'template_opg3r4u';
const EMAILJS_PUBLIC_KEY = 'GE5C31-tLP8VaSxJK';

const contactForm = document.getElementById('contactForm');
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (typeof emailjs === 'undefined') {
            alert(currentLang === 'it'
                ? 'Servizio email non disponibile. Riprova tra poco.'
                : 'Email service is unavailable. Please try again shortly.');
            return;
        }

        const formData = new FormData(contactForm);
        const userName = (formData.get('user_name') || '').toString().trim();
        const userEmail = (formData.get('user_email') || '').toString().trim();
        const userPhone = (formData.get('user_phone') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!userName || !userEmail || !message) {
            alert(currentLang === 'it'
                ? 'Compila tutti i campi obbligatori prima di inviare.'
                : 'Please complete all required fields before sending.');
            return;
        }

        const originalButtonText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = currentLang === 'it' ? 'Invio in corso...' : 'Sending...';
        }

        const templateParams = {
            user_name: userName,
            user_email: userEmail,
            user_phone: userPhone,
            message: message,
            from_name: userName,
            from_email: userEmail,
            phone: userPhone,
            company_name: 'EcoDomus 3H',
            reply_to: userEmail,
            to_name: 'EcoDomus 3H'
        };

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            alert(currentLang === 'it'
                ? 'Messaggio inviato con successo. Ti risponderemo al piu presto.'
                : 'Message sent successfully. We will contact you shortly.');
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS send failed:', error);
            alert(currentLang === 'it'
                ? 'Invio non riuscito. Riprova tra qualche minuto.'
                : 'Sending failed. Please try again in a few minutes.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText || (currentLang === 'it' ? 'Invia Messaggio' : 'Send Message');
            }
        }
    });
}

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Cookie Consent Banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');
const cookieSettingsBtn = document.getElementById('cookieSettings');
const cookieSettingsPanel = document.getElementById('cookieSettingsPanel');
const cookieSaveSettings = document.getElementById('cookieSaveSettings');

function showCookieBanner() {
    if (!localStorage.getItem('cookie_consent')) {
        setTimeout(() => cookieBanner.classList.add('show'), 800);
    }
}

function hideCookieBanner() {
    cookieBanner.classList.remove('show');
}

function saveConsent(analytics, marketing) {
    localStorage.setItem('cookie_consent', JSON.stringify({
        necessary: true,
        analytics: analytics,
        marketing: marketing,
        date: new Date().toISOString()
    }));
    hideCookieBanner();
}

cookieAccept.addEventListener('click', () => saveConsent(true, true));
cookieDecline.addEventListener('click', () => saveConsent(false, false));

cookieSettingsBtn.addEventListener('click', () => {
    cookieSettingsPanel.classList.toggle('open');
    const lang = currentLang;
    cookieSettingsBtn.textContent = cookieSettingsPanel.classList.contains('open')
        ? (lang === 'it' ? 'Chiudi' : 'Close')
        : (lang === 'it' ? 'Personalizza' : 'Customize');
});

cookieSaveSettings.addEventListener('click', () => {
    const analytics = document.getElementById('analyticsToggle').checked;
    const marketing = document.getElementById('marketingToggle').checked;
    saveConsent(analytics, marketing);
});

showCookieBanner();
