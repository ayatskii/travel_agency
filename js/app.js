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

    const modal = document.getElementById('modal');
    const open = () => modal.classList.remove('hidden');
    const close = () => modal.classList.add('hidden');
    document.getElementById('openPopup')?.addEventListener('click', open);
    document.getElementById('closePopup')?.addEventListener('click', close);
    modal?.addEventListener('click', e => {
        if (e.target.classList.contains('backdrop')) close();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });

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

    const chatForm = document.querySelector('#chat-form');
    const chatContainer = document.querySelector('#chat-bubbles');

    if (chatForm && chatContainer) {
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

    function playBeep() {
        const audio = new Audio('assets/sounds/beep.mp3');
        audio.play();
    }


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

        // Package selection notifications
        document.querySelectorAll('.package-select-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const packageType = this.dataset.packageType;
                notificationSystem.info(`Selected ${packageType} package. Redirecting to booking...`, 3000);
            });
        });

        // Destination button notifications
        document.querySelectorAll('.destination-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const destination = this.dataset.destination;
                notificationSystem.info('Loading destination details...', 2000);
            });
        });

        // Theme toggle notification
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                notificationSystem.info(`Switched to ${newTheme} theme`, 2000);
            });
        }
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

// ===== INITIALIZATION =====
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize scroll progress bar
        initScrollProgressBar();

        // Initialize notification system
        enhanceFormSubmissions();

        // Initialize scroll-based notifications
        initScrollNotifications();

        // Show welcome notification
        setTimeout(() => {
            notificationSystem.info('Welcome to BlueWave Travel! 🏖️', 4000);
        }, 1000);
    });

// Make notification system globally available
    window.notificationSystem = notificationSystem;
}
