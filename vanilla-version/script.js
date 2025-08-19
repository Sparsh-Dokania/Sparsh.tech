// DOM Elements
const preloader = document.getElementById('preloader');
const counterText = document.getElementById('counter-text');
const preloaderName = document.getElementById('preloader-name');
const preloaderWords = document.querySelectorAll('.preloader-words span');
const progressBar = document.querySelector('.progress-bar');

// Preloader Animation
function initPreloader() {
    let counter = 0;
    const targetCount = 100;
    const increment = Math.ceil(targetCount / 50);
    
    // Counter animation
    const counterInterval = setInterval(() => {
        counter += increment;
        if (counter >= targetCount) {
            counter = targetCount;
            clearInterval(counterInterval);
            
            // Start exit animation after counter completes
            setTimeout(() => {
                hidePreloader();
            }, 500);
        }
        counterText.textContent = counter;
    }, 50);
    
    // Animate preloader words
    preloaderWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, 1000 + (index * 300));
    });
    
    // Progress bar animation
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 1500);
    
    // Name text animation
    setTimeout(() => {
        animateNameText();
    }, 2000);
}

function animateNameText() {
    const texts = ['Sparsh Dokania', 'S      Dokania', 'S      Dev', 'SDev'];
    let currentIndex = 0;
    
    const textInterval = setInterval(() => {
        if (currentIndex < texts.length) {
            preloaderName.textContent = texts[currentIndex];
            currentIndex++;
        } else {
            clearInterval(textInterval);
        }
    }, 800);
}

function hidePreloader() {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'visible';
    
    // Remove preloader from DOM after animation
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.about, .works, .project-card, .contact');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove background opacity based on scroll
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Project Cards Hover Effect
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add any additional hover effects here
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact Form Handler (if you add a form later)
function initContactForm() {
    const contactBtn = document.querySelector('.contact-btn');
    
    contactBtn.addEventListener('click', (e) => {
        // Add any custom contact handling here
        console.log('Contact button clicked');
    });
}

// Loading Animation for Images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Cursor Custom Effects (Optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor styles to CSS if you want custom cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(26, 26, 26, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

// Resize Handler
function initResizeHandler() {
    window.addEventListener('resize', () => {
        // Handle any resize-specific logic here
        console.log('Window resized');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent body scroll initially
    document.body.style.overflow = 'hidden';
    
    // Initialize all functions
    initPreloader();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initParallaxEffect();
    initProjectCards();
    initContactForm();
    initImageLoading();
    initResizeHandler();
    
    // Optional: Initialize custom cursor
    // initCustomCursor();
    
    console.log('Portfolio initialized successfully!');
});

// Performance optimization
window.addEventListener('load', () => {
    // All resources loaded
    console.log('All resources loaded');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Export functions for potential use in other scripts
window.portfolioUtils = {
    initPreloader,
    hidePreloader,
    initSmoothScrolling,
    initScrollAnimations
};
