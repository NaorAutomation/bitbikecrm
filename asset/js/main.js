/**
 * BitBike-CRM Landing Page - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Performance optimization - mark elements that will animate
    document.querySelectorAll('.fade-in-up, .card-hover').forEach(el => {
        el.style.willChange = 'transform, opacity';
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
    
    // ===== Mobile Menu Toggle =====
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }
    
    hamburger.addEventListener('click', toggleMobileMenu);
    mobileClose.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', toggleMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
    
    // ===== Ultra-Fast Scrolling =====
    // Force disable any scroll animations
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Handle anchor links with zero-delay scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Direct scroll without any animation processing
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo(0, offsetTop);
            }
        });
    });
    
    // ===== GSAP Animations =====
    // Register plugins with force-optimized settings
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Pre-optimize GSAP for high performance (120fps)
    gsap.ticker.fps(120);
    
    // Hero section animations - hyper-optimized
    const fadeInUpElements = document.querySelectorAll('.fade-in-up');
    
    gsap.fromTo(fadeInUpElements, 
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.3, // Ultra-fast animation
            stagger: 0.06,
            ease: "power1.out", // Simplest easing for highest performance
            onComplete: function() {
                // Remove will-change after animation completes to free up resources
                fadeInUpElements.forEach(el => {
                    el.style.willChange = 'auto';
                });
            }
        }
    );
    
    // Scroll animations for sections - hyper-optimized
    ScrollTrigger.batch('.card-hover', {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.06,
                duration: 0.3,
                ease: "power1.out",
                onComplete: function() {
                    // Remove will-change after animation completes
                    batch.forEach(el => {
                        el.style.willChange = 'auto';
                    });
                }
            });
        },
        start: "top 92%", // Trigger even earlier for immediate perception
        once: true
    });
    
    // ===== Initialize Swiper if needed =====
    if (document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            speed: 300, // Even faster transitions
            preloadImages: false, // Improve performance
            updateOnWindowResize: true,
            watchSlidesProgress: true,
            observer: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }
    
    // ===== Form Handling if needed =====
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic can be added here
            // For now, just show an alert
            alert('הטופס נשלח בהצלחה! אנו ניצור קשר בהקדם.');
            form.reset();
        });
    });
}); 
