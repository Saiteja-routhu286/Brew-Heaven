// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==================== CART FUNCTIONALITY ====================
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function addToCart() {
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Animation
    cartCountElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
}

// Add event listeners to all add to cart buttons
document.querySelectorAll('.featured-btn').forEach(btn => {
    btn.addEventListener('click', addToCart);
});

// ==================== HERO ANIMATION ON LOAD ====================
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});

// ==================== CATEGORY CARDS HOVER ====================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ==================== FEATURED CARDS HOVER ====================
const featuredCards = document.querySelectorAll('.featured-card');

featuredCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const actions = card.querySelector('.featured-actions');
        actions.style.opacity = '1';
        actions.style.transform = 'translateX(0)';
    });
    
    card.addEventListener('mouseleave', () => {
        const actions = card.querySelector('.featured-actions');
        actions.style.opacity = '0';
        actions.style.transform = 'translateX(20px)';
    });
});
// ==================== STATS COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const startCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// Observe stats section
const aboutSection = document.querySelector('.about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                startCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(aboutSection);

// ==================== GALLERY LIGHTBOX ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Gallery Image">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                lightbox.remove();
            }
        });
    });
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
    }
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(lightboxStyles);

// ==================== FORM SUBMISSION ====================
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input').value;
    
    if (email) {
        alert('Thank you for subscribing!');
        newsletterForm.querySelector('input').value = '';
    }
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--glass-bg)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.padding = '20px';
    } else {
        navLinks.style.display = 'none';
    }
});
// ==================== COUNTDOWN TIMER ====================
const countdownTimer = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(23, 59, 59);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    const updateCountdown = () => {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff > 0) {
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
    };
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
};

// Uncomment if you have countdown elements in your HTML
// countdownTimer();

// ==================== SCROLL REVEAL ANIMATION ====================
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.category-card, .featured-card, .gallery-item, .review-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

revealOnScroll();

// ==================== HEART / FAVORITE BUTTON ====================
const heartButtons = document.querySelectorAll('.featured-action-btn:first-child');

heartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        
        if (btn.classList.contains('active')) {
            icon.style.color = '#e74c3c';
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.style.color = '';
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// ==================== NAVBAR LINK SCROLL ====================
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu if open
        if (window.innerWidth < 992) {
            document.querySelector('.nav-links').style.display = 'none';
        }
    });
});

// ==================== PREVENT DEFAULT FOR EMPTY LINKS ====================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ==================== SMOOTH PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg img');
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    
    const existingLoader = document.querySelector('.loader');
    if (!existingLoader) {
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }
});

// Add loader styles
const loaderStyles = document.createElement('style');
loaderStyles.textContent = `
    .loader {
        position: fixed;
        inset: 0;
        background: var(--primary-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--glass-border);
        border-top-color: var(--gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyles);

// ==================== TERMINATE ====================
console.log('Brew Haven Website - All Scripts Loaded Successfully!');
