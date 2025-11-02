// nuray.js - Упрощенный и очищенный jQuery функционал
$(document).ready(function() {
    console.log("jQuery is ready!");
    initLoadingSpinner();
    if (document.getElementById('bookingForm')) {
        new BookingFormHandler();
        console.log('Booking form handler initialized');
    }
});

// Task: Loading Spinner on Submit - для форм бронирования и контактов
function initLoadingSpinner() {
    $('#bookingForm').on('submit', function(e) {
        const $form = $(this);
        const $submitBtn = $('#submitBtn');
        const originalText = $submitBtn.text();
        
        $submitBtn.html(`
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Please wait...
        `).prop('disabled', true);
        
        setTimeout(function() {
            $submitBtn.text(originalText).prop('disabled', false);
            showNotification('Booking confirmed successfully!', 'success');
            $form[0].reset();
            
            if (window.bookingFormHandler) {
                window.bookingFormHandler.currentStep = 1;
                window.bookingFormHandler.updateStepDisplay();
            }
            
        }, 2000);
        
        e.preventDefault();
    });
    
    $('#contactForm').on('submit', function(e) {
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');
        const originalText = $submitBtn.text();
        
        $submitBtn.html(`
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Sending...
        `).prop('disabled', true);
        
        // Симуляция отправки на сервер
        setTimeout(function() {
            // Восстанавливаем кнопку
            $submitBtn.text(originalText).prop('disabled', false);
            
            // Показываем уведомление об успехе
            showNotification('Message sent successfully!', 'success');
            
            // Сбрасываем форму
            $form[0].reset();
            
        }, 2000);
        
        e.preventDefault();
    });
}

// Вспомогательная функция для показа уведомлений
function showNotification(message, type) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const $notification = $(`
        <div class="alert ${alertClass} alert-dismissible fade show mt-3">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);
    
    $('#formStatus, #contactStatus').html($notification);
    
    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
        $notification.alert('close');
    }, 5000);
}

// Класс для обработки формы бронирования
class BookingFormHandler {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {};
        this.init();
        
        // Сохраняем экземпляр в глобальной области для доступа из jQuery
        window.bookingFormHandler = this;
    }

    init() {
        console.log('Initializing BookingFormHandler...');
        this.initEventListeners();
        this.initKeyboardNavigation();
        this.setMinDates();
        this.updateStepDisplay();
    }

    initEventListeners() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const form = document.getElementById('bookingForm');

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextStep();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevStep();
            });
        }
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        }

        // Сохраняем данные при вводе
        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', (e) => {
                this.formData[e.target.name] = e.target.value;
                this.hideFieldError(e.target);
            });
        });

        // Обработчик для пакетов
        const pkgSelect = document.getElementById('pkg');
        if (pkgSelect) {
            pkgSelect.addEventListener('change', (e) => {
                this.handlePackageChange(e.target.value);
            });
        }
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (this.currentStep < this.totalSteps) {
                    this.nextStep();
                } else if (this.currentStep === this.totalSteps) {
                    document.getElementById('submitBtn').click();
                }
            }
            
            if (e.ctrlKey && ['1', '2', '3'].includes(e.key)) {
                e.preventDefault();
                const step = parseInt(e.key);
                
                let canNavigate = true;
                for (let i = 1; i < step; i++) {
                    if (!this.validateStep(i)) {
                        canNavigate = false;
                        showNotification(`Please complete step ${i} first`, 'error');
                        break;
                    }
                }
                
                if (canNavigate && step !== this.currentStep) {
                    this.currentStep = step;
                    this.updateStepDisplay();
                    if (this.currentStep === 3) {
                        this.updateConfirmationSummary();
                    }
                }
            }
        });
    }

    nextStep() {
        console.log('Moving to next step from:', this.currentStep);
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            this.currentStep++;
            this.updateStepDisplay();

            if (this.currentStep === 3) {
                this.updateConfirmationSummary();
            }
        } else {
            showNotification('Please fix the errors before continuing', 'error');
        }
    }

    prevStep() {
        console.log('Moving to previous step from:', this.currentStep);
        this.saveCurrentStepData();
        this.currentStep--;
        this.updateStepDisplay();
    }

    updateStepDisplay() {
        // Обновляем индикаторы шагов
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.toggle('active', stepNum === this.currentStep);
            step.classList.toggle('completed', stepNum < this.currentStep);
        });

        // Обновляем панели шагов
        document.querySelectorAll('.step-panel').forEach(panel => {
            const panelStep = parseInt(panel.getAttribute('data-step'));
            panel.classList.toggle('active', panelStep === this.currentStep);
        });

        // Обновляем кнопки навигации
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (prevBtn) {
            prevBtn.style.display = this.currentStep > 1 ? 'inline-block' : 'none';
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.currentStep < this.totalSteps ? 'inline-block' : 'none';
            nextBtn.textContent = this.currentStep === this.totalSteps - 1 ? 'Review Booking' : 'Next';
        }
        
        if (submitBtn) {
            submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
        }

        console.log('Step display updated to:', this.currentStep);
    }

    validateCurrentStep() {
        this.hideStepErrors(this.currentStep);
        let isValid = false;

        switch(this.currentStep) {
            case 1:
                isValid = this.validateStep1();
                break;
            case 2:
                isValid = this.validateStep2();
                break;
            case 3:
                isValid = this.validateStep3();
                break;
        }

        console.log(`Step ${this.currentStep} validation:`, isValid);
        return isValid;
    }

    validateStep(step) {
        switch(step) {
            case 1: return this.validateStep1();
            case 2: return this.validateStep2();
            case 3: return this.validateStep3();
            default: return false;
        }
    }

    validateStep1() {
        let valid = true;
        
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        if (!firstName || !firstName.value.trim()) {
            this.showError('err-firstName', 'Please enter your first name');
            valid = false;
        }

        if (!lastName || !lastName.value.trim()) {
            this.showError('err-lastName', 'Please enter your last name');
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.value.trim()) {
            this.showError('err-email', 'Please enter your email address');
            valid = false;
        } else if (!emailRegex.test(email.value)) {
            this.showError('err-email', 'Please enter a valid email address');
            valid = false;
        }

        const phoneRegex = /^[\+]?[1-9][\d\s\(\)\-]{8,}$/;
        const cleanPhone = phone.value.replace(/[\s\(\)\-]/g, '');
        if (!phone || !phone.value.trim()) {
            this.showError('err-phone', 'Please enter your phone number');
            valid = false;
        } else if (!phoneRegex.test(cleanPhone)) {
            this.showError('err-phone', 'Please enter a valid phone number');
            valid = false;
        }

        return valid;
    }

    validateStep2() {
        let valid = true;
        
        const destination = document.getElementById('destination');
        const pkg = document.getElementById('pkg');
        const travellers = document.getElementById('travellers');
        const checkin = document.getElementById('checkin');
        const checkout = document.getElementById('checkout');

        if (!destination || !destination.value) {
            this.showError('err-destination', 'Please select a destination');
            valid = false;
        }

        if (!pkg || !pkg.value) {
            this.showError('err-pkg', 'Please select a package type');
            valid = false;
        }

        if (!travellers || !travellers.value) {
            this.showError('err-travellers', 'Please select number of travelers');
            valid = false;
        }

        if (!checkin || !checkin.value) {
            this.showError('err-checkin', 'Please select check-in date');
            valid = false;
        }

        if (!checkout || !checkout.value) {
            this.showError('err-checkout', 'Please select check-out date');
            valid = false;
        } else if (checkin && checkin.value) {
            const checkinDate = new Date(checkin.value);
            const checkoutDate = new Date(checkout.value);
            if (checkoutDate <= checkinDate) {
                this.showError('err-checkout', 'Check-out date must be after check-in date');
                valid = false;
            }
        }

        return valid;
    }

    validateStep3() {
        const agree = document.getElementById('agree');
        let valid = true;

        if (!agree || !agree.checked) {
            this.showError('err-agree', 'You must agree to the terms and conditions');
            valid = false;
        }

        return valid;
    }

    saveCurrentStepData() {
        const panel = document.querySelector(`.step-panel[data-step="${this.currentStep}"]`);
        if (!panel) return;

        const inputs = panel.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.name) {
                if (input.type === 'checkbox') {
                    this.formData[input.name] = input.checked;
                } else {
                    this.formData[input.name] = input.value;
                }
            }
        });
    }

    handlePackageChange(packageType) {
        let message = '';
        switch(packageType) {
            case 'weekend': message = 'Weekend getaway selected!'; break;
            case 'adventure': message = 'Adventure package selected!'; break;
            case 'luxury': message = 'Luxury retreat selected!'; break;
        }
        showNotification(message, 'success');
    }

    resetForm() {
        this.formData = {};
        document.getElementById('bookingForm').reset();
        this.hideAllErrors();
    }

    updateConfirmationSummary() {
        const summary = document.getElementById('summaryContent');
        if (!summary) return;

        const formatDate = (dateString) => {
            if (!dateString) return 'Not selected';
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        summary.innerHTML = `
            <div class="mb-3">
                <strong>Personal Information:</strong>
                <div class="ms-3 mt-1">
                    <div>👤 <strong>Name:</strong> ${this.formData.firstName || ''} ${this.formData.lastName || ''}</div>
                    <div>📧 <strong>Email:</strong> ${this.formData.email || ''}</div>
                    <div>📞 <strong>Phone:</strong> ${this.formData.phone || ''}</div>
                </div>
            </div>
            <div class="mb-3">
                <strong>Travel Details:</strong>
                <div class="ms-3 mt-1">
                    <div>✈️ <strong>Destination:</strong> ${this.formData.destination || 'Not selected'}</div>
                    <div>📦 <strong>Package:</strong> ${this.formData.pkg || 'Not selected'}</div>
                    <div>👥 <strong>Travelers:</strong> ${this.formData.travellers || 'Not selected'}</div>
                    <div>📅 <strong>Dates:</strong> ${formatDate(this.formData.checkin)} to ${formatDate(this.formData.checkout)}</div>
                </div>
            </div>
            ${this.formData.notes ? `
            <div class="mb-3">
                <strong>Special Requests:</strong>
                <div class="ms-3 mt-1">${this.formData.notes}</div>
            </div>
            ` : ''}
        `;
    }

    setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        const checkin = document.getElementById('checkin');
        const checkout = document.getElementById('checkout');
        
        if (checkin) checkin.min = today;
        if (checkout) checkout.min = today;
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.remove('d-none');
        }
    }

    hideAllErrors() {
        document.querySelectorAll('.text-danger').forEach(error => {
            error.classList.add('d-none');
        });
    }

    hideStepErrors(step) {
        const panel = document.querySelector(`.step-panel[data-step="${step}"]`);
        if (panel) {
            panel.querySelectorAll('.text-danger').forEach(error => {
                error.classList.add('d-none');
            });
        }
    }

    hideFieldError(field) {
        const fieldName = field.name || field.id;
        const errorElement = document.getElementById(`err-${fieldName}`);
        if (errorElement) {
            errorElement.classList.add('d-none');
        }
    }
}