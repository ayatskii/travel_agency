// ===== Contact form validation =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const g = id => document.getElementById(id);
    const cName = g('cName');
    const cEmail = g('cEmail');
    const cMessage = g('cMessage');
    const cAgree = g('cAgree');
    const contactStatus = g('contactStatus');

    const err = id => g(id);
    const show = (el, msg) => {
        if (el) {
            el.textContent = msg;
            el.classList.remove('d-none');
        }
    };
    const hide = el => {
        if (el) el.classList.add('d-none');
    };
    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

    function validateContact() {
        let ok = true;
        ['err-cName', 'err-cEmail', 'err-cMessage', 'err-cAgree'].forEach(i => hide(err(i)));
        contactStatus.innerHTML = '';

        if (!cName.value.trim()) {
            show(err('err-cName'), 'Enter your name.');
            ok = false;
        }
        const e = cEmail.value.trim();
        if (!e || !isEmail(e)) {
            show(err('err-cEmail'), 'Enter a valid email.');
            ok = false;
        }
        const m = cMessage.value.trim();
        if (m.length < 10) {
            show(err('err-cMessage'), 'Message must be at least 10 characters.');
            ok = false;
        }
        if (!cAgree.checked) {
            show(err('err-cAgree'), 'You must agree before submitting.');
            ok = false;
        }

        return ok;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateContact()) {
            contactStatus.innerHTML = "<p class='text-success mb-0'>Message sent successfully.</p>";
            contactForm.reset();
        } else {
            contactStatus.innerHTML = "<p class='text-danger mb-0'>Please fix the errors above.</p>";
        }
    });

    [cName, cEmail, cMessage, cAgree].forEach(el => el && el.addEventListener('input', validateContact));
}

// ===== Subscribe Modal Popup =====
const modal = document.getElementById('modal');
if (modal) {
    const open = () => modal.classList.remove('hidden');
    const close = () => modal.classList.add('hidden');
    document.getElementById('openPopup')?.addEventListener('click', open);
    document.getElementById('closePopup')?.addEventListener('click', close);
    modal.addEventListener('click', e => {
        if (e.target.classList.contains('backdrop')) close();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
}

// ===== Background color cycler button on cancellation-policy page =====
(() => {
    const btn = document.getElementById('bgBtn');
    if (!btn) return;
    const colors = ['#f6f7f9', '#ffe8a1', '#d1f7c4', '#cde3ff', '#ffd1dc'];
    let i = 0;
    btn.addEventListener('click', () => {
        const next = colors[i++ % colors.length];
        document.body.style.backgroundColor = next;
        const section = document.querySelector('.policy-section');
        if (section) section.style.backgroundColor = next;
    });
})();

// ===== Chat Form =====
const chatForm = document.querySelector('#chat-form');
const chatContainer = document.querySelector('#chat-bubbles');

if (chatForm && chatContainer) {
    function playBeep() {
        const audio = new Audio('assets/sounds/beep.mp3');
        audio.play();
    }

    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.querySelector('#chat-input');
        const userMessage = (input?.value || '').trim();
        if (!userMessage) return;

        const userBubble = document.createElement('div');
        userBubble.classList.add('chat-bubble', 'user');
        userBubble.textContent = userMessage;
        chatContainer.appendChild(userBubble);

        // автоскролл вниз
        chatContainer.scrollTop = chatContainer.scrollHeight;

        setTimeout(() => {
            const botMessage = 'We will respond soon.';
            const botBubble = document.createElement('div');
            botBubble.classList.add('chat-bubble', 'bot');
            botBubble.textContent = botMessage;
            chatContainer.appendChild(botBubble);

            // автоскролл вниз
            chatContainer.scrollTop = chatContainer.scrollHeight;

            playBeep();
        }, 500);

        input.value = '';
    });
}

// ===== Accordion functionality =====
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function () {
        const panel = button.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
        button.classList.toggle('active');
    });
});

const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const isOpen = content.classList.contains('open');

        if (isOpen) {
            content.classList.remove('open');
            this.classList.remove('open');
        } else {
            content.classList.add('open');
            this.classList.add('open');
        }
    });
});

// ===== SCROLL PROGRESS BAR =====
function initScrollProgressBar() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    function updateProgressBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = Math.min(scrollPercent, 100) + '%';

        // Add visual feedback based on scroll position
        if (scrollPercent > 80) {
            progressBar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
        } else if (scrollPercent > 50) {
            progressBar.style.background = 'linear-gradient(90deg, #ffa726, #ffb74d)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #5a67ff, #00d4ff)';
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateProgressBar);
            ticking = true;
        }
    }

    function handleScroll() {
        ticking = false;
        requestTick();
    }

    window.addEventListener('scroll', handleScroll, {passive: true});
    updateProgressBar(); // Initial call
}

// ===== NOTIFICATION SYSTEM =====
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
        this.notifications = new Map();
        this.defaultDuration = 5000;
    }

    createContainer() {
            let container = document.getElementById('notification-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'notification-container';
                container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
                pointer-events: none;
            `;
                document.body.appendChild(container);
            }
            return container;
        }

        show(message, type = 'info', duration = this.defaultDuration, options = {}) {
            const id = Date.now() + Math.random();
            const notification = this.createNotification(id, message, type, options);

            this.container.appendChild(notification);
            this.notifications.set(id, notification);

            // Animate in
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });

            // Auto remove
            if (duration > 0) {
                setTimeout(() => {
                    this.remove(id);
                }, duration);
            }

            return id;
        }

        createNotification(id, message, type, options) {
            const notification = document.createElement('div');
            notification.className = `bluewave-notification ${type}`;
            notification.dataset.id = id;

            const icon = this.getIcon(type);
            const title = options.title || this.getDefaultTitle(type);

            notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icon}</div>
                <div class="notification-body">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" onclick="notificationSystem.remove(${id})">×</button>
            </div>
        `;

            // Add click to dismiss
            notification.addEventListener('click', (e) => {
                if (!e.target.classList.contains('notification-close')) {
                    this.remove(id);
                }
            });

            return notification;
        }

        getIcon(type) {
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️',
                loading: '⏳'
            };
            return icons[type] || icons.info;
        }

        getDefaultTitle(type) {
            const titles = {
                success: 'Success',
                error: 'Error',
                warning: 'Warning',
                info: 'Information',
                loading: 'Loading'
            };
            return titles[type] || 'Notification';
        }

        remove(id) {
            const notification = this.notifications.get(id);
            if (notification) {
                notification.classList.add('hide');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                    this.notifications.delete(id);
                }, 300);
            }
        }

        clear() {
            this.notifications.forEach((notification, id) => {
                this.remove(id);
            });
        }

        // Convenience methods
        success(message, duration, options) {
            return this.show(message, 'success', duration, options);
        }

        error(message, duration, options) {
            return this.show(message, 'error', duration, options);
        }

        warning(message, duration, options) {
            return this.show(message, 'warning', duration, options);
        }

        info(message, duration, options) {
            return this.show(message, 'info', duration, options);
        }

        loading(message, duration = 0, options) {
            return this.show(message, 'loading', duration, options);
        }
    }

// Initialize notification system
const notificationSystem = new NotificationSystem();

// ===== DESTINATION DETAILS MODAL =====
function showDestinationDetails(index) {
        const destinations = [
            {
                title: 'Tropical Paradise',
                subtitle: 'Crystal clear waters and white sandy beaches',
                type: 'Beach',
                rating: 4.8,
                description: 'Experience the ultimate beach getaway with pristine shores and vibrant coral reefs.',
                details: 'Our Tropical Paradise destination offers an unforgettable escape to some of the world\'s most beautiful beaches. Enjoy crystal-clear turquoise waters perfect for snorkeling, white sandy beaches ideal for relaxation, and vibrant coral reefs teeming with marine life. This destination is perfect for couples, families, and solo travelers seeking sun, sand, and serenity.',
                highlights: [
                    'Private beach access',
                    'Snorkeling and diving tours',
                    'Sunset cruises',
                    'Beachfront accommodations',
                    'Water sports equipment',
                    'Local cuisine experiences'
                ],
                duration: '3-7 days',
                bestTime: 'Year-round',
                price: 'From $599'
            },
            {
                title: 'Mountain Escapes',
                subtitle: 'Breathtaking peaks and alpine adventures',
                type: 'Mountain',
                rating: 4.9,
                description: 'Discover majestic mountain ranges and enjoy thrilling outdoor activities.',
                details: 'Embark on an adventure to stunning mountain destinations where you can hike through pristine alpine trails, witness breathtaking panoramic views, and experience the tranquility of nature. Our Mountain Escapes package includes guided hikes, mountain photography sessions, and cozy mountain lodges with spectacular views.',
                highlights: [
                    'Guided hiking tours',
                    'Mountain photography workshops',
                    'Alpine lodge accommodations',
                    'Wildlife watching',
                    'Mountain biking trails',
                    'Stargazing sessions'
                ],
                duration: '4-10 days',
                bestTime: 'May - October',
                price: 'From $799'
            },
            {
                title: 'Cultural Cities',
                subtitle: 'Historic landmarks and vibrant cultures',
                type: 'Cultural',
                rating: 4.7,
                description: 'Immerse yourself in rich history, art, and local traditions.',
                details: 'Explore vibrant cities rich in history, culture, and art. Walk through ancient streets, visit world-renowned museums, enjoy local cuisine, and experience authentic cultural performances. Our Cultural Cities package offers deep immersion into local traditions, architecture, and way of life.',
                highlights: [
                    'Guided city tours',
                    'Museum and gallery visits',
                    'Local food tours',
                    'Cultural performances',
                    'Historic site visits',
                    'Artisan workshops'
                ],
                duration: '3-5 days',
                bestTime: 'Year-round',
                price: 'From $499'
            }
        ];

        const dest = destinations[index];
        if (!dest) return;

        const modal = createModal(
            dest.title,
            `
                <div class="destination-details">
                    <div class="mb-3">
                        <span class="badge bg-info me-2">${dest.type}</span>
                        <span class="badge bg-warning text-dark">⭐ ${dest.rating}</span>
                        <span class="badge bg-secondary ms-2">${dest.duration}</span>
                    </div>
                    <p class="lead">${dest.subtitle}</p>
                    <p>${dest.details}</p>
                    <h5 class="mt-4 mb-3">Highlights:</h5>
                    <ul class="list-unstyled">
                        ${dest.highlights.map(h => `<li class="mb-2">✓ ${h}</li>`).join('')}
                    </ul>
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <strong>Best Time to Visit:</strong> ${dest.bestTime}
                        </div>
                        <div class="col-md-6">
                            <strong>Starting Price:</strong> <span class="text-primary fw-bold">${dest.price}</span>
                        </div>
                    </div>
                </div>
            `,
            'primary'
        );
        showModal(modal);
}

// ===== PACKAGE DETAILS MODAL =====
function showPackageDetails(packageType) {
        const packages = {
            weekend: {
                name: 'Weekend Getaway',
                description: 'Perfect for short escapes',
                price: '$299',
                duration: '2 nights',
                details: 'Our Weekend Getaway package is designed for those who need a quick escape from their daily routine. Perfect for couples or solo travelers looking for a refreshing break without taking too much time off work.',
                inclusions: [
                    '2 nights accommodation in selected hotels',
                    'Daily breakfast included',
                    'Airport transfers (round trip)',
                    'City tour guide (half-day)',
                    'Welcome drink upon arrival',
                    'Free Wi-Fi in hotel'
                ],
                exclusions: [
                    'Lunch and dinner',
                    'Additional activities',
                    'Travel insurance',
                    'Personal expenses'
                ],
                suitable: 'Couples, Solo Travelers, Business Travelers',
                cancellation: 'Free cancellation up to 48 hours before arrival'
            },
            adventure: {
                name: 'Adventure Week',
                description: 'Full week of excitement',
                price: '$899',
                duration: '7 nights',
                details: 'Our most popular Adventure Week package offers a complete week of thrilling activities and experiences. Perfect for adventure enthusiasts and active travelers who want to make the most of their vacation.',
                inclusions: [
                    '7 nights accommodation in adventure-friendly hotels',
                    'All meals included (breakfast, lunch, dinner)',
                    'Adventure activities (hiking, rafting, zip-lining)',
                    'Professional adventure guide throughout',
                    'Travel insurance included',
                    'Equipment rental for activities',
                    'Transportation for all activities',
                    '24/7 support during trip'
                ],
                exclusions: [
                    'International flights',
                    'Personal gear',
                    'Alcoholic beverages',
                    'Tips and gratuities'
                ],
                suitable: 'Adventure Enthusiasts, Active Travelers, Groups',
                cancellation: 'Free cancellation up to 7 days before arrival'
            },
            luxury: {
                name: 'Luxury Retreat',
                description: 'Premium experience',
                price: '$1,599',
                duration: '5 nights',
                details: 'Indulge in the ultimate luxury travel experience with our premium Luxury Retreat package. Enjoy world-class accommodations, gourmet dining, and personalized service throughout your journey.',
                inclusions: [
                    '5 nights in luxury resort or boutique hotel',
                    'Gourmet dining (all meals, fine dining restaurants)',
                    'Spa treatments (2 sessions included)',
                    'Private transportation with chauffeur',
                    'Concierge service 24/7',
                    'Butler service (where available)',
                    'Premium room upgrades (subject to availability)',
                    'VIP airport lounge access',
                    'Complimentary minibar',
                    'Personalized itinerary planning'
                ],
                exclusions: [
                    'International flights',
                    'Premium alcohol',
                    'Additional spa treatments',
                    'Shopping expenses'
                ],
                suitable: 'Luxury Travelers, Honeymooners, Special Occasions',
                cancellation: 'Free cancellation up to 14 days before arrival'
            }
        };

        const pkg = packages[packageType];
        if (!pkg) return;

        const modal = createModal(
            pkg.name,
            `
                <div class="package-details">
                    <div class="mb-3">
                        <h4 class="text-primary mb-2">${pkg.price}</h4>
                        <p class="text-muted">${pkg.description} • ${pkg.duration}</p>
                    </div>
                    <p>${pkg.details}</p>
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h5 class="mb-3">What's Included:</h5>
                            <ul class="list-unstyled">
                                ${pkg.inclusions.map(i => `<li class="mb-2 text-success">✓ ${i}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5 class="mb-3">Not Included:</h5>
                            <ul class="list-unstyled">
                                ${pkg.exclusions.map(e => `<li class="mb-2 text-muted">✗ ${e}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="mt-4 p-3 bg-light rounded">
                        <p class="mb-1"><strong>Suitable for:</strong> ${pkg.suitable}</p>
                        <p class="mb-0"><strong>Cancellation Policy:</strong> ${pkg.cancellation}</p>
                    </div>
                </div>
            `,
            'primary'
        );
        showModal(modal);
}

// ===== MODAL HELPER FUNCTIONS =====
function createModal(title, content, btnClass = 'primary') {
        const modalId = 'infoModal_' + Date.now();
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = modalId;
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', modalId + 'Label');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-${btnClass}" onclick="window.location.href='booking.html'">Book Now</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
}

function showModal(modalElement) {
        // Use Bootstrap modal if available (Bootstrap 5)
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            // Clean up modal after it's hidden
            modalElement.addEventListener('hidden.bs.modal', function () {
                if (modalElement.parentNode) {
                    document.body.removeChild(modalElement);
                }
            }, { once: true });
        } else {
            // Fallback: simple display
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            document.body.appendChild(backdrop);
            document.body.style.overflow = 'hidden';
            
            const closeBtn = modalElement.querySelector('.btn-close, [data-bs-dismiss="modal"]');
            const closeHandler = () => {
                modalElement.style.display = 'none';
                modalElement.classList.remove('show');
                if (backdrop.parentNode) {
                    document.body.removeChild(backdrop);
                }
                if (modalElement.parentNode) {
                    document.body.removeChild(modalElement);
                }
                document.body.style.overflow = '';
            };
            if (closeBtn) closeBtn.addEventListener('click', closeHandler);
            backdrop.addEventListener('click', closeHandler);
            
            // Also close on Escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeHandler();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }
}

// ===== INTEGRATION WITH EXISTING FEATURES =====
// Add notifications to form submissions
function enhanceFormSubmissions() {
        // Booking form success
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            const originalHandler = bookingForm.onsubmit;
            bookingForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validate()) {
                    notificationSystem.success('Booking request submitted successfully! We will contact you soon.', 6000);
                    form.reset();
                } else {
                    notificationSystem.error('Please fix the errors above before submitting.', 5000);
                }
            });
        }

        // Contact form success
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validateContact()) {
                    notificationSystem.success('Message sent successfully! We will get back to you soon.', 6000);
                    contactForm.reset();
                } else {
                    notificationSystem.error('Please fix the errors above before submitting.', 5000);
                }
            });
        }

        // Package selection - redirect to booking page
        document.querySelectorAll('.package-select-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const packageType = this.dataset.packageType;
                // Store selected package in localStorage
                localStorage.setItem('selectedPackage', packageType);
                notificationSystem.success(`Selected ${packageType} package. Redirecting to booking...`, 2000);
                // Redirect to booking page after short delay
                setTimeout(() => {
                    window.location.href = 'booking.html';
                }, 1500);
            });
        });

        // Package details button - show package information
        document.querySelectorAll('.package-info-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const packageType = this.dataset.packageType;
                showPackageDetails(packageType);
            });
        });

        // Destination button - show destination details
        document.querySelectorAll('.destination-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const destinationIndex = parseInt(this.dataset.destination);
                showDestinationDetails(destinationIndex);
            });
        });
}

// ===== SCROLL-BASED NOTIFICATIONS =====
function initScrollNotifications() {
        let sectionsViewed = new Set();

        function checkScrollPosition() {
            const sections = document.querySelectorAll('section[id]');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.id;

                // Check if section is in viewport
                if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                    if (!sectionsViewed.has(sectionId)) {
                        sectionsViewed.add(sectionId);

                        // Show section-specific notifications
                        switch (sectionId) {
                            case 'destinations':
                                notificationSystem.info('Discover our amazing destinations! 🌍', 3000);
                                break;
                            case 'packages':
                                notificationSystem.info('Check out our travel packages! ✈️', 3000);
                                break;
                        }
                    }
                }
            });
        }

        // Throttle scroll events
        let ticking = false;

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(checkScrollPosition);
                ticking = true;
            }
        }

        function handleScroll() {
            ticking = false;
            requestTick();
        }

        window.addEventListener('scroll', handleScroll, {passive: true});
}

// ===== AUTHENTICATION NAVBAR MANAGEMENT =====
function updateAuthNavbar() {
    const authNavButtons = document.getElementById('authNavButtons');
    if (!authNavButtons) return;

    // Wait for authManager to be available
    if (typeof authManager === 'undefined') {
        setTimeout(updateAuthNavbar, 100);
        return;
    }

    const currentUser = authManager.getCurrentUser();

    if (currentUser) {
        // User is logged in - show user info and logout button
        const userName = currentUser.firstName || currentUser.email.split('@')[0];
        authNavButtons.innerHTML = `
            <button id="themeToggle" class="btn btn-outline-light me-2">🌙</button>
            <span class="text-light me-3 d-none d-md-inline">Hello, ${userName}!</span>
            <button id="logoutBtn" class="btn btn-outline-light me-2">Logout</button>
            <a class="btn btn-light" href="booking.html">Book Now</a>
        `;

        // Add logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                const result = authManager.logout();
                if (result.success) {
                    if (window.notificationSystem) {
                        notificationSystem.success(result.message, 3000);
                    }
                    // Update navbar and redirect
                    updateAuthNavbar();
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }
            });
        }

        // Re-attach theme toggle if it exists
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle && typeof initThemeToggle === 'function') {
            // Theme toggle will be handled by existing code
        }
    } else {
        // User is not logged in - show login and register buttons
        authNavButtons.innerHTML = `
            <button id="themeToggle" class="btn btn-outline-light me-2">🌙</button>
            <a class="btn btn-outline-light me-2" href="auth.html">Login</a>
            <a class="btn btn-light" href="auth.html?tab=register">Register</a>
            <a class="btn btn-light ms-2" href="booking.html">Book Now</a>
        `;
    }
}

// Make function globally available
window.updateAuthNavbar = updateAuthNavbar;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    // Initialize scroll progress bar
    initScrollProgressBar();

    // Initialize notification system
    enhanceFormSubmissions();

    // Initialize scroll-based notifications
    initScrollNotifications();

    // Update authentication navbar
    updateAuthNavbar();

    // Show welcome notification (only if not on auth page)
    if (!window.location.pathname.includes('auth.html')) {
        setTimeout(() => {
            notificationSystem.info('Welcome to BlueWave Travel! 🏖️', 4000);
        }, 1000);
    }
});

// Make notification system globally available
window.notificationSystem = notificationSystem;
