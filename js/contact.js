// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formInputs = document.querySelectorAll('.form-input');
  const submitBtn = contactForm.querySelector('.form-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
  // Initialize animations
  initAnimations();
  
  // Add input event listeners for real-time validation
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      validateField(this);
    });
    
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
  });
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      submitForm();
    } else {
      showFormStatus('Please fix the errors above', 'error');
      // Add shake animation to invalid fields
      document.querySelectorAll('.form-input.invalid').forEach(input => {
        input.parentElement.classList.add('shake');
        setTimeout(() => {
          input.parentElement.classList.remove('shake');
        }, 500);
      });
    }
  });
  
  // Field validation function
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const feedback = document.getElementById(`err-${fieldName}`);
    
    // Remove previous validation classes
    field.classList.remove('valid', 'invalid');
    
    // Validate based on field type
    let isValid = true;
    let message = '';
    
    switch(fieldName) {
      case 'cName':
        if (value === '') {
          isValid = false;
          message = 'Please enter your name';
        } else if (value.length < 2) {
          isValid = false;
          message = 'Name must be at least 2 characters';
        }
        break;
        
      case 'cEmail':
        if (value === '') {
          isValid = false;
          message = 'Please enter your email';
        } else if (!isValidEmail(value)) {
          isValid = false;
          message = 'Please enter a valid email address';
        }
        break;
        
      case 'cMessage':
        if (value === '') {
          isValid = false;
          message = 'Please enter your message';
        } else if (value.length < 10) {
          isValid = false;
          message = 'Message must be at least 10 characters';
        }
        break;
        
      case 'cAgree':
        isValid = field.checked;
        message = 'You must agree before submitting';
        break;
    }
    
    // Update UI based on validation
    if (isValid) {
      field.classList.add('valid');
      if (feedback) {
        feedback.classList.remove('show');
      }
    } else {
      field.classList.add('invalid');
      if (feedback && value !== '') {
        feedback.textContent = message;
        feedback.classList.add('show');
      }
    }
    
    return isValid;
  }
  
  // Form validation function
  function validateForm() {
    let isValid = true;
    
    // Validate all required fields
    formInputs.forEach(input => {
      if (input.hasAttribute('required')) {
        if (!validateField(input)) {
          isValid = false;
        }
      }
    });
    
    // Special handling for checkbox
    const agreeCheckbox = document.getElementById('cAgree');
    if (agreeCheckbox && !agreeCheckbox.checked) {
      const feedback = document.getElementById('err-cAgree');
      agreeCheckbox.classList.add('invalid');
      if (feedback) {
        feedback.classList.add('show');
      }
      isValid = false;
    }
    
    return isValid;
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Form submission function
  function submitForm() {
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
      // Hide loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      // Show success message
      showFormStatus('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Remove validation classes
      formInputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
      
      // Hide feedback messages
      document.querySelectorAll('.form-feedback').forEach(feedback => {
        feedback.classList.remove('show');
      });
      
      // Scroll to success message
      document.getElementById('contactStatus').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 2000);
  }
  
  // Show form status message
  function showFormStatus(message, type) {
    const statusElement = document.getElementById('contactStatus');
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        statusElement.classList.remove('success');
      }, 5000);
    }
  }
  
  // Initialize animations
  function initAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-slide-left, .animate-slide-right').forEach(el => {
      observer.observe(el);
    });
    
    // Add hover effects to form inputs
    formInputs.forEach(input => {
      input.addEventListener('mouseenter', function() {
        this.parentElement.classList.add('hover');
      });
      
      input.addEventListener('mouseleave', function() {
        this.parentElement.classList.remove('hover');
      });
    });
  }
  
  // Add CSS for shake animation
  const style = document.createElement('style');
  style.textContent = `
    .shake {
      animation: shake 0.5s ease;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .form-group.focused .form-label {
      color: var(--medium-blue);
    }
    
    .form-group.hover .form-input {
      border-color: var(--light-blue);
    }
  `;
  document.head.appendChild(style);
});