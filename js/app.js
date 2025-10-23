// ===== AIAT MERGENBAY'S JAVASCRIPT ADVANCED CONCEPTS IMPLEMENTATION =====

// 1. OBJECTS AND METHODS - Travel Packages Data Structure
const travelPackages = {
    weekend: {
        name: "Weekend Getaway",
        price: 299,
        duration: "2-3 days",
        features: ["2 nights accommodation", "Breakfast included", "Airport transfers", "City tour guide"],
        calculateDiscount: function(percentage = 10) { 
            return Math.round(this.price * (1 - percentage / 100)); 
        },
        getPackageInfo: function() {
            return `${this.name}: $${this.price} - ${this.features.join(', ')}`;
        },
        isAffordable: function(budget) {
            return this.price <= budget;
        },
        getDiscountedPrice: function() {
            return this.calculateDiscount();
        }
    },
    adventure: {
        name: "Adventure Week",
        price: 899,
        duration: "7 days",
        features: ["7 nights accommodation", "All meals included", "Adventure activities", "Professional guide", "Travel insurance"],
        calculateDiscount: function(percentage = 15) { 
            return Math.round(this.price * (1 - percentage / 100)); 
        },
        getPackageInfo: function() {
            return `${this.name}: $${this.price} - ${this.features.join(', ')}`;
        },
        isAffordable: function(budget) {
            return this.price <= budget;
        },
        getDiscountedPrice: function() {
            return this.calculateDiscount();
        }
    },
    luxury: {
        name: "Luxury Retreat",
        price: 1599,
        duration: "5 days",
        features: ["5 nights luxury resort", "Gourmet dining", "Spa treatments", "Private transportation", "Concierge service"],
        calculateDiscount: function(percentage = 20) { 
            return Math.round(this.price * (1 - percentage / 100)); 
        },
        getPackageInfo: function() {
            return `${this.name}: $${this.price} - ${this.features.join(', ')}`;
        },
        isAffordable: function(budget) {
            return this.price <= budget;
        },
        getDiscountedPrice: function() {
            return this.calculateDiscount();
        }
    }
};

// 2. ARRAYS AND LOOPS - Destinations and Team Data
const destinations = [
    {
        name: "Tropical Paradise",
        country: "Maldives",
        type: "beach",
        rating: 4.8,
        image: "./assets/imgs/The Maldives.jpeg",
        description: "Crystal clear waters and white sandy beaches"
    },
    {
        name: "Mountain Escapes", 
        country: "Switzerland",
        type: "mountain",
        rating: 4.9,
        image: "./assets/imgs/Switzerland.jpeg",
        description: "Breathtaking peaks and alpine adventures"
    },
    {
        name: "Cultural Cities",
        country: "Japan",
        type: "cultural",
        rating: 4.7,
        image: "./assets/imgs/Japan.jpeg",
        description: "Historic landmarks and vibrant cultures"
    },
    {
        name: "Desert Safari",
        country: "Dubai",
        type: "adventure",
        rating: 4.6,
        image: "./assets/imgs/Dubai.jpeg",
        description: "Thrilling desert adventures and luxury"
    },
    {
        name: "Ancient Wonders",
        country: "Italy",
        type: "cultural",
        rating: 4.8,
        image: "./assets/imgs/The Colosseum, Rome.jpeg",
        description: "Explore ancient Roman architecture"
    },
    {
        name: "Tropical Beach",
        country: "Thailand",
        type: "beach",
        rating: 4.5,
        image: "./assets/imgs/Phuket.jpeg",
        description: "Pristine beaches and island hopping"
    },
    {
        name: "Great Wall Adventure",
        country: "China",
        type: "cultural",
        rating: 4.7,
        image: "./assets/imgs/China.jpeg",
        description: "Walk along the historic Great Wall"
    }
];

const teamMembers = [
    { 
        name: "Altynay Yertay", 
        role: "Business Development Director",
        expertise: "Strategic Planning & Client Relations",
        experience: "5+ years",
        image: "./assets/imgs/altynay.JPG"
    },
    { 
        name: "Nuray Nuraly", 
        role: "Financial Director",
        expertise: "Financial Management & Analysis", 
        experience: "7+ years",
        image: "./assets/imgs/nuray.JPG"
    },
    { 
        name: "Aiat Mergenbay", 
        role: "Technical Director",
        expertise: "Web Development & System Architecture",
        experience: "6+ years", 
        image: "./assets/imgs/aiat.JPG"
    },
    { 
        name: "Merey Amangeldi", 
        role: "Marketing Director",
        expertise: "Digital Marketing & Brand Strategy",
        experience: "4+ years",
        image: "./assets/imgs/merey.JPG"
    }
];

// 3. HIGHER-ORDER FUNCTIONS Implementation
const packagePrices = [299, 899, 1599];

// Using map to transform data
const discountedPrices = packagePrices.map(price => Math.round(price * 0.9));

// Using filter to select specific data  
const expensivePackages = packagePrices.filter(price => price > 500);
const budgetPackages = packagePrices.filter(price => price <= 500);

// Custom higher-order function
function createPackageFilter(minPrice, maxPrice) {
    return function(packageObj) {
        return packageObj.price >= minPrice && packageObj.price <= maxPrice;
    };
}

function createDestinationFilter(type) {
    return function(destination) {
        return destination.type === type;
    };
}

// Advanced array processing functions
const destinationProcessor = {
    // Get destinations by type
    getByType: function(type) {
        return destinations.filter(createDestinationFilter(type));
    },
    
    // Get top rated destinations
    getTopRated: function(minRating = 4.5) {
        return destinations.filter(dest => dest.rating >= minRating)
                          .sort((a, b) => b.rating - a.rating);
    },
    
    // Get random destination
    getRandomDestination: function() {
        return destinations[Math.floor(Math.random() * destinations.length)];
    },
    
    // Search destinations
    searchDestinations: function(query) {
        const lowerQuery = query.toLowerCase();
        return destinations.filter(dest => 
            dest.name.toLowerCase().includes(lowerQuery) ||
            dest.country.toLowerCase().includes(lowerQuery) ||
            dest.description.toLowerCase().includes(lowerQuery)
        );
    }
};

// 4. SOUND EFFECTS Implementation using Web Audio API
const soundEffects = {
    // Rating sound effect
    playRatingSound: function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    },

    // Success sound for bookings
    playSuccessSound: function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Audio not supported');
        }
    },

    // Notification sound
    playNotificationSound: function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (error) {
            console.log('Audio not supported');
        }
    },

    // Booking confirmation sound
    playBookingSound: function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Pleasant ascending melody
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        } catch (error) {
            console.log('Audio not supported');
        }
    }
};

// 5. SWITCH STATEMENTS Implementation
function handlePackageSelection(packageType) {
    switch(packageType) {
        case 'weekend':
            applyWeekendFeatures();
            showPackageDetails(travelPackages.weekend);
            soundEffects.playNotificationSound();
            break;
        case 'adventure':
            applyAdventureFeatures();
            showPackageDetails(travelPackages.adventure);
            soundEffects.playNotificationSound();
            break;
        case 'luxury':
            applyLuxuryFeatures();
            showPackageDetails(travelPackages.luxury);
            soundEffects.playNotificationSound();
            break;
        default:
            showBasicInformation();
            break;
    }
}

function processUserAction(action, data = null) {
    switch(action) {
        case 'booking':
            initiateBookingProcess(data);
            soundEffects.playBookingSound();
            showNotification('Booking process initiated!', 'success');
            break;
        case 'inquiry':
            showContactForm();
            soundEffects.playNotificationSound();
            showNotification('Contact form opened', 'info');
            break;
        case 'rating':
            showRatingSystem();
            soundEffects.playRatingSound();
            break;
        case 'package-select':
            handlePackageSelection(data);
            break;
        case 'destination-view':
            showDestinationDetails(data);
            soundEffects.playNotificationSound();
            break;
        default:
            showMainMenu();
            break;
    }
}

function handleDestinationType(type) {
    switch(type) {
        case 'beach':
            displayBeachDestinations();
            break;
        case 'mountain':
            displayMountainDestinations();
            break;
        case 'cultural':
            displayCulturalDestinations();
            break;
        case 'adventure':
            displayAdventureDestinations();
            break;
        default:
            displayAllDestinations();
            break;
    }
}

// Supporting functions for switch statements
function applyWeekendFeatures() {
    console.log('Weekend package features applied');
    updatePriceDisplay('weekend', travelPackages.weekend.price);
}

function applyAdventureFeatures() {
    console.log('Adventure package features applied');
    updatePriceDisplay('adventure', travelPackages.adventure.price);
}

function applyLuxuryFeatures() {
    console.log('Luxury package features applied');
    updatePriceDisplay('luxury', travelPackages.luxury.price);
}

function showPackageDetails(packageObj) {
    console.log(`Package: ${packageObj.getPackageInfo()}`);
    console.log(`Discounted Price: $${packageObj.getDiscountedPrice()}`);
}

function showBasicInformation() {
    console.log('Showing basic package information');
}

function initiateBookingProcess(packageData) {
    console.log('Initiating booking process for:', packageData);
    // Redirect to booking page or show booking modal
    if (typeof window !== 'undefined') {
        window.location.href = 'booking.html';
    }
}

function showContactForm() {
    console.log('Showing contact form');
    if (typeof window !== 'undefined') {
        window.location.href = 'contact.html';
    }
}

function showRatingSystem() {
    console.log('Rating system activated');
}

function showDestinationDetails(destination) {
    console.log('Showing destination details for:', destination);
}

function showMainMenu() {
    console.log('Showing main menu');
}

function updatePriceDisplay(packageType, price) {
    const priceElements = document.querySelectorAll(`[data-package="${packageType}"] .price`);
    priceElements.forEach(el => {
        if (el) el.textContent = `$${price}`;
    });
}

// Utility functions for destinations
function displayBeachDestinations() {
    const beachDests = destinationProcessor.getByType('beach');
    console.log('Beach destinations:', beachDests);
}

function displayMountainDestinations() {
    const mountainDests = destinationProcessor.getByType('mountain');
    console.log('Mountain destinations:', mountainDests);
}

function displayCulturalDestinations() {
    const culturalDests = destinationProcessor.getByType('cultural');
    console.log('Cultural destinations:', culturalDests);
}

function displayAdventureDestinations() {
    const adventureDests = destinationProcessor.getByType('adventure');
    console.log('Adventure destinations:', adventureDests);
}

function displayAllDestinations() {
    console.log('All destinations:', destinations);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("clock");
    if (!el) return;
    function updateClock() {
        const now = new Date();
        const opts = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Almaty"
        };
        el.textContent = now.toLocaleString("en-US", opts);
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ===== INITIALIZE ADVANCED FEATURES =====
    
    // Initialize package selection handlers
    initializePackageHandlers();
    
    // Initialize destination filtering
    initializeDestinationFilters();
    
    // Initialize interactive features
    initializeInteractiveFeatures();
    
    // Display initial data using higher-order functions
    displayInitialData();

    // Booking form
  const form = document.getElementById('bookingForm');
  if (form){
    const q = id => document.getElementById(id);
  const firstName = q('firstName');
  const lastName  = q('lastName');
  const email     = q('email');
  const phone     = q('phone');
  const destination = q('destination');
  const pkg       = q('pkg');
  const checkin   = q('checkin');
  const checkout  = q('checkout');
  const travellers= q('travellers');
  const agree     = q('agree');
  const statusBox = q('formStatus');

  const err = id => q(id);
  const show = (el, msg) => { if (el) { el.textContent = msg; el.classList.remove('d-none'); } };
  const hide = el => { if (el) el.classList.add('d-none'); };

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const isPhone = v => /^\+?[0-9 ()-]{7,}$/.test(v);

  function validate() {
    let ok = true;
    ['err-firstName','err-lastName','err-email','err-phone','err-destination',
     'err-pkg','err-checkin','err-checkout','err-travellers','err-agree']
      .forEach(id => hide(err(id)));
    statusBox.innerHTML = '';

    if (!firstName.value.trim()) { show(err('err-firstName'),'Enter your first name.'); ok = false; }
    if (!lastName.value.trim())  { show(err('err-lastName'),'Enter your last name.'); ok = false; }

    const e = email.value.trim();
    if (!e || !isEmail(e)) { show(err('err-email'),'Enter a valid email.'); ok = false; }

    const p = phone.value.trim();
    if (!p || !isPhone(p)) { show(err('err-phone'),'Enter a valid phone number.'); ok = false; }

    if (!destination.value) { show(err('err-destination'),'Choose a destination.'); ok = false; }
    if (!pkg.value)         { show(err('err-pkg'),'Choose a package.'); ok = false; }
    if (!travellers.value)  { show(err('err-travellers'),'Select number of travelers.'); ok = false; }

    const cin = checkin.value ? new Date(checkin.value) : null;
    const cout= checkout.value ? new Date(checkout.value) : null;
    if (!cin) { show(err('err-checkin'),'Select check-in date.'); ok = false; }
    if (!cout){ show(err('err-checkout'),'Select check-out date.'); ok = false; }
    if (cin && cout && cout <= cin) { show(err('err-checkout'),'Check-out must be after check-in.'); ok = false; }

    if (!agree.checked) { show(err('err-agree'),'You must agree before submitting.'); ok = false; }

    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      statusBox.innerHTML = "<p class='text-success mb-0'>Booking request submitted successfully.</p>";
      form.reset();
    } else {
      statusBox.innerHTML = "<p class='text-danger mb-0'>Please fix the errors above.</p>";
    }
  });

  [firstName,lastName,email,phone,destination,pkg,checkin,checkout,travellers,agree]
    .forEach(el => el && el.addEventListener('input', validate));
  }

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
  const show = (el,msg)=>{ if(el){ el.textContent=msg; el.classList.remove('d-none'); } };
  const hide = el => { if(el) el.classList.add('d-none'); };
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  function validateContact(){
    let ok = true;
    ['err-cName','err-cEmail','err-cMessage','err-cAgree'].forEach(i=>hide(err(i)));
    contactStatus.innerHTML = '';

    if(!cName.value.trim()){ show(err('err-cName'),'Enter your name.'); ok=false; }
    const e = cEmail.value.trim();
    if(!e || !isEmail(e)){ show(err('err-cEmail'),'Enter a valid email.'); ok=false; }
    const m = cMessage.value.trim();
    if(m.length < 10){ show(err('err-cMessage'),'Message must be at least 10 characters.'); ok=false; }
    if(!cAgree.checked){ show(err('err-cAgree'),'You must agree before submitting.'); ok=false; }

    return ok;
  }

  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(validateContact()){
      contactStatus.innerHTML = "<p class='text-success mb-0'>Message sent successfully.</p>";
      contactForm.reset();
    } else {
      contactStatus.innerHTML = "<p class='text-danger mb-0'>Please fix the errors above.</p>";
    }
  });

  [cName,cEmail,cMessage,cAgree].forEach(el=>el && el.addEventListener('input', validateContact));
}
});

const modal=document.getElementById('modal');
const open=()=>modal.classList.remove('hidden');
const close=()=>modal.classList.add('hidden');
document.getElementById('openPopup')?.addEventListener('click',open);
document.getElementById('closePopup')?.addEventListener('click',close);
modal?.addEventListener('click',e=>{if(e.target.classList.contains('backdrop')) close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});

// ===== Background color cycler button on cancellation-policy page =====
(()=>{
  const btn = document.getElementById('bgBtn');
  if(!btn) return;
  const colors=['#f6f7f9','#ffe8a1','#d1f7c4','#cde3ff','#ffd1dc'];
  let i=0;
  btn.addEventListener('click',()=>{
    const next = colors[i++ % colors.length];
    document.body.style.backgroundColor = next;
    const section = document.querySelector('.policy-section');
    if (section) section.style.backgroundColor = next;
  });
})();

const chatForm = document.querySelector('#chat-form');
const chatContainer = document.querySelector('#chat-bubbles');

if (chatForm && chatContainer) {
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMessage = document.querySelector('#chat-input').value;
        const userBubble = document.createElement('div');
        userBubble.classList.add('chat-bubble', 'user');
        userBubble.textContent = userMessage;
        chatContainer.appendChild(userBubble);

        setTimeout(() => {
            const botMessage = 'We will respond soon.';
            const botBubble = document.createElement('div');
            botBubble.classList.add('chat-bubble', 'bot');
            botBubble.textContent = botMessage;
            chatContainer.appendChild(botBubble);
            playBeep();
        }, 500);
    });
}

document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
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
  try {
    const audio = new Audio('assets/sounds/beep.mp3'); 
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  } catch (error) {
    console.log('Audio not supported:', error);
  }
}


const accordionHeaders = document.querySelectorAll('.accordion-header');


accordionHeaders.forEach(header => {
  header.addEventListener('click', function() {
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

function initializePackageHandlers() {
    // Add event listeners to package selection buttons
    const packageButtons = document.querySelectorAll('.card .btn-primary');
    
    packageButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            let packageType;
            const cardTitle = this.closest('.card').querySelector('.card-title').textContent;
            
            // Use switch to determine package type
            switch(cardTitle) {
                case 'Weekend Getaway':
                    packageType = 'weekend';
                    break;
                case 'Adventure Week':
                    packageType = 'adventure';
                    break;
                case 'Luxury Retreat':
                    packageType = 'luxury';
                    break;
                default:
                    packageType = 'weekend';
            }
            
            // Process the action using switch statement
            processUserAction('package-select', packageType);
        });
    });
}

function initializeDestinationFilters() {
    // Create filter buttons if they don't exist
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
        const container = destinationsSection.querySelector('.container');
        const title = container.querySelector('.section-title');
        
        // Create filter buttons container
        const filterContainer = document.createElement('div');
        filterContainer.className = 'mb-4 text-center';
        filterContainer.innerHTML = `
            <button class="btn btn-outline-primary me-2 mb-2 filter-btn active" data-filter="all">All</button>
            <button class="btn btn-outline-primary me-2 mb-2 filter-btn" data-filter="beach">Beach</button>
            <button class="btn btn-outline-primary me-2 mb-2 filter-btn" data-filter="mountain">Mountain</button>
            <button class="btn btn-outline-primary me-2 mb-2 filter-btn" data-filter="cultural">Cultural</button>
            <button class="btn btn-outline-primary me-2 mb-2 filter-btn" data-filter="adventure">Adventure</button>
        `;
        
        title.insertAdjacentElement('afterend', filterContainer);
        
        // Add event listeners to filter buttons
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterType = this.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('btn-outline-primary');
                    btn.classList.remove('btn-primary');
                });
                
                this.classList.add('active');
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
                
                // Filter destinations using switch statement
                handleDestinationType(filterType === 'all' ? 'all' : filterType);
                
                // Play sound effect
                soundEffects.playNotificationSound();
            });
        });
    }
}

function initializeInteractiveFeatures() {
    // Add click handlers for destination cards
    const destinationCards = document.querySelectorAll('#destinations .card');
    
    destinationCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const destination = destinations[index] || destinations[0];
            processUserAction('destination-view', destination);
        });
        
        // Add hover effects with sound
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add interactive package price updates
    updatePackagePricesWithDiscounts();
    
    // Add team member interactions if on about page
    initializeTeamInteractions();
}

function displayInitialData() {
    
    // Display destinations by type using forEach
    destinations.forEach((dest, index) => {
        console.log(`${index + 1}. ${dest.name} (${dest.country}) - Rating: ${dest.rating}`);
    });
    
    // Display top-rated destinations
    const topRated = destinationProcessor.getTopRated(4.7);
    console.log('Top Rated Destinations (4.7+):', topRated.map(d => d.name));
    
    // Display team members using forEach
    console.log('=== TEAM MEMBERS ===');
    teamMembers.forEach(member => {
        console.log(`${member.name} - ${member.role} (${member.experience})`);
    });
}

function updatePackagePricesWithDiscounts() {
    // Update package cards with discount information
    const packageCards = document.querySelectorAll('#packages .card');
    
    packageCards.forEach((card, index) => {
        const priceElement = card.querySelector('.display-6');
        const cardTitle = card.querySelector('.card-title').textContent;
        
        if (priceElement) {
            let packageKey;
            switch(cardTitle) {
                case 'Weekend Getaway':
                    packageKey = 'weekend';
                    break;
                case 'Adventure Week':
                    packageKey = 'adventure';
                    break;
                case 'Luxury Retreat':
                    packageKey = 'luxury';
                    break;
            }
            
            if (packageKey && travelPackages[packageKey]) {
                const originalPrice = travelPackages[packageKey].price;
                const discountedPrice = travelPackages[packageKey].getDiscountedPrice();
                
                // Add discount information
                const discountInfo = document.createElement('div');
                discountInfo.className = 'text-muted small';
                discountInfo.innerHTML = `<s>$${originalPrice}</s> <span class="text-success">Save $${originalPrice - discountedPrice}!</span>`;
                
                priceElement.insertAdjacentElement('afterend', discountInfo);
                priceElement.textContent = `$${discountedPrice}`;
            }
        }
    });
}

function initializeTeamInteractions() {
    // Add team member cards if on about page
    const aboutSection = document.querySelector('#team, .team-section');
    if (aboutSection) {
        const teamContainer = document.createElement('div');
        teamContainer.className = 'row g-4 mt-4';
        
        // Use forEach to create team member cards
        teamMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'col-md-6 col-lg-3';
            memberCard.innerHTML = `
                <div class="card h-100 shadow-sm team-card" style="cursor: pointer;">
                    <img src="${member.image}" class="card-img-top" alt="${member.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${member.name}</h5>
                        <p class="card-text text-primary">${member.role}</p>
                        <p class="small text-muted">${member.expertise}</p>
                        <span class="badge bg-secondary">${member.experience}</span>
                    </div>
                </div>
            `;
            
            // Add click handler
            memberCard.addEventListener('click', function() {
                soundEffects.playNotificationSound();
                showNotification(`${member.name} - ${member.role}`, 'info');
            });
            
            teamContainer.appendChild(memberCard);
        });
        
        aboutSection.appendChild(teamContainer);
    }
}

// ===== ENHANCED ARRAY PROCESSING WITH LOOPS =====

// Using for loop for specific operations
function processDestinationsWithForLoop() {
    console.log('=== Processing destinations with for loop ===');
    for (let i = 0; i < destinations.length; i++) {
        const dest = destinations[i];
        console.log(`Processing ${i + 1}/${destinations.length}: ${dest.name}`);
        
        // Simulate processing time
        if (dest.rating > 4.7) {
            console.log(`⭐ ${dest.name} is highly rated!`);
        }
    }
}

// Using for...of loop for cleaner iteration
function processPackagesWithForOf() {
    console.log('=== Processing packages with for...of loop ===');
    const packageKeys = Object.keys(travelPackages);
    
    for (const key of packageKeys) {
        const pkg = travelPackages[key];
        console.log(`Package: ${pkg.name}`);
        console.log(`Original: $${pkg.price}, Discounted: $${pkg.getDiscountedPrice()}`);
        console.log(`Features: ${pkg.features.length} items`);
        console.log('---');
    }
}

// Using while loop for conditional processing
function findAffordablePackages(budget) {
    console.log(`=== Finding packages within budget: $${budget} ===`);
    const packageKeys = Object.keys(travelPackages);
    let i = 0;
    const affordable = [];
    
    while (i < packageKeys.length) {
        const pkg = travelPackages[packageKeys[i]];
        if (pkg.isAffordable(budget)) {
            affordable.push(pkg);
        }
        i++;
    }
    
    return affordable;
}

// ===== ADVANCED HIGHER-ORDER FUNCTIONS =====

// Reduce function for calculating statistics
function calculatePackageStatistics() {
    const stats = packagePrices.reduce((acc, price, index) => {
        acc.total += price;
        acc.count++;
        acc.average = acc.total / acc.count;
        
        if (price > acc.max) acc.max = price;
        if (price < acc.min) acc.min = price;
        
        return acc;
    }, { total: 0, count: 0, average: 0, max: 0, min: Infinity });
    
    console.log('Package Statistics:', stats);
    return stats;
}

// Complex array processing with chaining
function getDestinationRecommendations(userPreferences = {}) {
    const { type, minRating = 4.0, maxResults = 3 } = userPreferences;
    
    return destinations
        .filter(dest => !type || dest.type === type)
        .filter(dest => dest.rating >= minRating)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, maxResults)
        .map(dest => ({
            ...dest,
            recommendation: `Highly recommended! Rating: ${dest.rating}/5`
        }));
}

// ===== PAGE-SPECIFIC ENHANCEMENTS =====

// Index.html specific features
function initializeIndexPageFeatures() {
    // Random Destination Button
    const randomDestBtn = document.getElementById('randomDestinationBtn');
    if (randomDestBtn) {
        randomDestBtn.addEventListener('click', function() {
            const randomDest = destinationProcessor.getRandomDestination();
            soundEffects.playNotificationSound();
            showNotification(`🎲 Random pick: ${randomDest.name} in ${randomDest.country}!`, 'info');
            
            // Highlight the destination card
            const destCards = document.querySelectorAll('.destination-card');
            destCards.forEach((card, index) => {
                if (destinations[index] && destinations[index].name === randomDest.name) {
                    card.style.transform = 'scale(1.05)';
                    card.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 2000);
                }
            });
        });
    }

    // Update hero statistics
    updateHeroStatistics();
    
    // Package comparison features
    initializePackageComparison();
    
    // Enhanced destination interactions
    initializeEnhancedDestinations();
}

// Cancellation Policy page specific features
function initializeCancellationPageFeatures() {
    // Refund Calculator
    const calculateBtn = document.getElementById('calculateRefundBtn');
    const clearBtn = document.getElementById('clearCalculatorBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateRefund);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearRefundCalculator);
    }
    
    // Policy comparison features
    initializePolicyComparison();
    
    // Policy search functionality
    initializePolicySearch();
    
    // Smart recommendations
    initializeSmartRecommendations();
    
    // Specific package calculations
    initializeSpecificCalculations();
}

function updateHeroStatistics() {
    const heroStats = document.getElementById('heroStats');
    if (heroStats) {
        const destCount = document.getElementById('destinationCount');
        const packageCount = document.getElementById('packageCount');
        const avgRating = document.getElementById('avgRating');
        
        if (destCount) destCount.textContent = destinations.length;
        if (packageCount) packageCount.textContent = Object.keys(travelPackages).length;
        
        if (avgRating) {
            const totalRating = destinations.reduce((sum, dest) => sum + dest.rating, 0);
            const average = (totalRating / destinations.length).toFixed(1);
            avgRating.textContent = average;
        }
        
        heroStats.classList.remove('d-none');
        
        // Animate the statistics
        setTimeout(() => {
            heroStats.style.opacity = '0';
            heroStats.style.transform = 'translateY(20px)';
            heroStats.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }, 100);
        }, 500);
    }
}

function initializePackageComparison() {
    const compareBtn = document.getElementById('comparePackagesBtn');
    const bestValueBtn = document.getElementById('findBestValueBtn');
    const budgetBtn = document.getElementById('budgetCalculatorBtn');
    
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            showPackageComparison();
            soundEffects.playNotificationSound();
        });
    }
    
    if (bestValueBtn) {
        bestValueBtn.addEventListener('click', function() {
            findBestValuePackage();
            soundEffects.playSuccessSound();
        });
    }
    
    if (budgetBtn) {
        budgetBtn.addEventListener('click', function() {
            showBudgetCalculator();
            soundEffects.playNotificationSound();
        });
    }
    
    // Package info buttons
    const infoButtons = document.querySelectorAll('.package-info-btn');
    infoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageType = this.dataset.packageType;
            showPackageDetails(travelPackages[packageType]);
            soundEffects.playNotificationSound();
        });
    });
    
    // Update package statistics
    updatePackageStatistics();
}

function showPackageComparison() {
    const result = document.getElementById('comparisonResult');
    if (!result) return;
    
    let html = '<div class="alert alert-info"><h5>📋 Package Comparison</h5>';
    
    html += '<div class="table-responsive"><table class="table table-striped">';
    html += '<thead><tr><th>Package</th><th>Price</th><th>Duration</th><th>Features</th><th>Value Score</th></tr></thead><tbody>';
    
    Object.keys(travelPackages).forEach(key => {
        const pkg = travelPackages[key];
        const valueScore = calculateValueScore(pkg);
        
        html += `<tr>
            <td><strong>${pkg.name}</strong></td>
            <td>$${pkg.price} <small class="text-success">($${pkg.getDiscountedPrice()} with discount)</small></td>
            <td>${pkg.duration}</td>
            <td><span class="badge bg-primary">${pkg.features.length} features</span></td>
            <td><span class="badge bg-${valueScore > 8 ? 'success' : valueScore > 6 ? 'warning' : 'secondary'}">${valueScore}/10</span></td>
        </tr>`;
    });
    
    html += '</tbody></table></div></div>';
    result.innerHTML = html;
}

function findBestValuePackage() {
    const result = document.getElementById('comparisonResult');
    if (!result) return;
    
    let bestValue = null;
    let bestScore = 0;
    
    Object.keys(travelPackages).forEach(key => {
        const pkg = travelPackages[key];
        const score = calculateValueScore(pkg);
        if (score > bestScore) {
            bestScore = score;
            bestValue = pkg;
        }
    });
    
    if (bestValue) {
        const html = `<div class="alert alert-success">
            <h5>💰 Best Value Package</h5>
            <h6>${bestValue.name}</h6>
            <p><strong>Price:</strong> $${bestValue.price} (Discounted: $${bestValue.getDiscountedPrice()})</p>
            <p><strong>Why it's the best value:</strong> ${getBestValueReason(bestValue)}</p>
            <p><strong>Value Score:</strong> ${bestScore}/10</p>
        </div>`;
        result.innerHTML = html;
    }
}

function showBudgetCalculator() {
    const result = document.getElementById('comparisonResult');
    if (!result) return;
    
    const html = `<div class="alert alert-primary">
        <h5>🧮 Budget Calculator</h5>
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">Your Budget ($)</label>
                <input type="number" id="budgetInput" class="form-control" placeholder="Enter your budget">
            </div>
            <div class="col-md-6 d-flex align-items-end">
                <button id="findAffordableBtn" class="btn btn-primary">Find Affordable Packages</button>
            </div>
        </div>
        <div id="budgetResult" class="mt-3"></div>
    </div>`;
    
    result.innerHTML = html;
    
    // Add event listener for budget calculation
    const findAffordableBtn = document.getElementById('findAffordableBtn');
    if (findAffordableBtn) {
        findAffordableBtn.addEventListener('click', function() {
        const budget = parseInt(document.getElementById('budgetInput').value);
        if (budget) {
            const affordable = findAffordablePackages(budget);
            const budgetResult = document.getElementById('budgetResult');
            
            if (affordable.length > 0) {
                let resultHtml = '<h6>Affordable packages for your budget:</h6><ul>';
                affordable.forEach(pkg => {
                    resultHtml += `<li><strong>${pkg.name}</strong> - $${pkg.price} (You save: $${budget - pkg.price})</li>`;
                });
                resultHtml += '</ul>';
                budgetResult.innerHTML = `<div class="alert alert-success">${resultHtml}</div>`;
            } else {
                budgetResult.innerHTML = '<div class="alert alert-warning">No packages found within your budget. Consider increasing your budget or look for special offers.</div>';
            }
            
            soundEffects.playNotificationSound();
        }
        });
    }
}

function calculateValueScore(pkg) {
    // Simple value scoring algorithm
    const priceScore = pkg.price < 500 ? 10 : pkg.price < 1000 ? 7 : 4;
    const featureScore = Math.min(pkg.features.length * 2, 10);
    const discountScore = ((pkg.price - pkg.getDiscountedPrice()) / pkg.price) * 10;
    
    return Math.round((priceScore + featureScore + discountScore) / 3);
}

function getBestValueReason(pkg) {
    const reasons = [
        `Includes ${pkg.features.length} comprehensive features`,
        `Great discount savings of $${pkg.price - pkg.getDiscountedPrice()}`,
        `Perfect duration of ${pkg.duration} for the price`,
        `Excellent price-to-feature ratio`
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
}

function updatePackageStatistics() {
    const packageStats = document.getElementById('packageStats');
    if (packageStats) {
        const stats = calculatePackageStatistics();
        const totalSavings = Object.values(travelPackages).reduce((sum, pkg) => 
            sum + (pkg.price - pkg.getDiscountedPrice()), 0);
        
        document.getElementById('avgPackagePrice').textContent = `$${Math.round(stats.average)}`;
        document.getElementById('totalSavings').textContent = `$${totalSavings}`;
        
        // Find best value package
        let bestValue = null;
        let bestScore = 0;
        Object.keys(travelPackages).forEach(key => {
            const score = calculateValueScore(travelPackages[key]);
            if (score > bestScore) {
                bestScore = score;
                bestValue = travelPackages[key];
            }
        });
        
        if (bestValue) {
            document.getElementById('bestValue').textContent = bestValue.name;
        }
        
        packageStats.classList.remove('d-none');
    }
}

function initializeEnhancedDestinations() {
    // Add enhanced click handlers for destination buttons
    const destButtons = document.querySelectorAll('.destination-btn');
    destButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const destIndex = parseInt(this.dataset.destination);
            const destination = destinations[destIndex];
            
            if (destination) {
                processUserAction('destination-view', destination);
                showDestinationModal(destination);
            }
        });
    });
}

function showDestinationModal(destination) {
    const modalHtml = `
        <div class="modal fade" id="destinationModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${destination.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${destination.image}" class="img-fluid rounded" alt="${destination.name}">
                            </div>
                            <div class="col-md-6">
                                <h6>📍 ${destination.country}</h6>
                                <p><span class="badge bg-primary">${destination.type}</span> 
                                   <span class="badge bg-warning text-dark">⭐ ${destination.rating}/5</span></p>
                                <p>${destination.description}</p>
                                <hr>
                                <h6>Recommended Packages:</h6>
                                <div id="recommendedPackages"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="processUserAction('booking', '${destination.name}')">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('destinationModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show recommended packages
    const recommendedDiv = document.getElementById('recommendedPackages');
    const suitablePackages = getSuitablePackagesForDestination(destination);
    
    let packagesHtml = '';
    suitablePackages.forEach(pkg => {
        packagesHtml += `<div class="mb-2">
            <strong>${pkg.name}</strong> - $${pkg.getDiscountedPrice()} 
            <button class="btn btn-sm btn-outline-primary ms-2" onclick="processUserAction('package-select', '${Object.keys(travelPackages).find(key => travelPackages[key] === pkg)}')">
                Select
            </button>
        </div>`;
    });
    
    recommendedDiv.innerHTML = packagesHtml;
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('destinationModal'));
    modal.show();
}

function getSuitablePackagesForDestination(destination) {
    // Simple logic to recommend packages based on destination type
    const allPackages = Object.values(travelPackages);
    
    switch(destination.type) {
        case 'luxury':
        case 'cultural':
            return allPackages.filter(pkg => pkg.price > 800);
        case 'beach':
            return allPackages.filter(pkg => pkg.price < 1200);
        case 'adventure':
            return allPackages.filter(pkg => pkg.name.includes('Adventure') || pkg.price > 500);
        default:
            return allPackages;
    }
}

// Cancellation Policy specific functions
function calculateRefund() {
    const packageType = document.getElementById('packageType').value;
    const travelDate = document.getElementById('travelDate').value;
    const cancellationDate = document.getElementById('cancellationDate').value;
    const resultDiv = document.getElementById('refundResult');
    
    if (!packageType || !travelDate || !cancellationDate) {
        resultDiv.innerHTML = '<div class="alert alert-warning">Please fill in all fields.</div>';
        return;
    }
    
    const travel = new Date(travelDate);
    const cancellation = new Date(cancellationDate);
    const daysDifference = Math.ceil((travel - cancellation) / (1000 * 60 * 60 * 24));
    
    if (daysDifference < 0) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Cancellation date cannot be after travel date.</div>';
        return;
    }
    
    const packageInfo = travelPackages[packageType];
    const refundInfo = calculateRefundAmount(packageInfo.price, daysDifference);
    
    soundEffects.playSuccessSound();
    
    const html = `<div class="alert alert-success">
        <h5>💰 Refund Calculation Result</h5>
        <p><strong>Package:</strong> ${packageInfo.name}</p>
        <p><strong>Original Price:</strong> $${packageInfo.price}</p>
        <p><strong>Days before travel:</strong> ${daysDifference} days</p>
        <p><strong>Refund Percentage:</strong> ${refundInfo.percentage}%</p>
        <p><strong>Refund Amount:</strong> <span class="text-success fs-5">$${refundInfo.amount}</span></p>
        <p><strong>Cancellation Fee:</strong> $${packageInfo.price - refundInfo.amount}</p>
        ${refundInfo.recommendation ? `<p><strong>💡 Recommendation:</strong> ${refundInfo.recommendation}</p>` : ''}
    </div>`;
    
    resultDiv.innerHTML = html;
}

function calculateRefundAmount(originalPrice, daysBefore) {
    let percentage = 0;
    let recommendation = '';
    
    // Use switch statement for refund calculation
    switch(true) {
        case daysBefore > 30:
            percentage = 100;
            recommendation = 'Perfect timing! You get a full refund.';
            break;
        case daysBefore >= 15:
            percentage = 50;
            recommendation = 'Consider travel insurance for better coverage.';
            break;
        case daysBefore >= 8:
            percentage = 25;
            recommendation = 'Limited refund available. Check if you can reschedule instead.';
            break;
        default:
            percentage = 0;
            recommendation = 'No refund available. Travel insurance might help in emergency situations.';
            break;
    }
    
    return {
        percentage,
        amount: Math.round(originalPrice * (percentage / 100)),
        recommendation
    };
}

function clearRefundCalculator() {
    document.getElementById('packageType').value = '';
    document.getElementById('travelDate').value = '';
    document.getElementById('cancellationDate').value = '';
    document.getElementById('refundResult').innerHTML = '';
    soundEffects.playNotificationSound();
}

function initializePolicyComparison() {
    const showBtn = document.getElementById('showComparisonBtn');
    const hideBtn = document.getElementById('hideComparisonBtn');
    const simulateBtn = document.getElementById('simulateScenarioBtn');
    
    if (showBtn) {
        showBtn.addEventListener('click', function() {
            showDetailedComparison();
            soundEffects.playNotificationSound();
        });
    }
    
    if (hideBtn) {
        hideBtn.addEventListener('click', function() {
            hideDetailedComparison();
            soundEffects.playNotificationSound();
        });
    }
    
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            simulateRandomScenarios();
            soundEffects.playSuccessSound();
        });
    }
}

function showDetailedComparison() {
    const table = document.getElementById('comparisonTable');
    const tbody = document.getElementById('comparisonTableBody');
    const showBtn = document.getElementById('showComparisonBtn');
    const hideBtn = document.getElementById('hideComparisonBtn');
    
    if (table && tbody) {
        let html = '';
        
        Object.keys(travelPackages).forEach(key => {
            const pkg = travelPackages[key];
            html += `<tr>
                <td><strong>${pkg.name}</strong></td>
                <td>$${pkg.price}</td>
                <td class="text-success">$${pkg.price} (100%)</td>
                <td class="text-warning">$${Math.round(pkg.price * 0.5)} (50%)</td>
                <td class="text-danger">$${Math.round(pkg.price * 0.25)} (25%)</td>
                <td class="text-muted">$0 (0%)</td>
            </tr>`;
        });
        
        tbody.innerHTML = html;
        table.classList.remove('d-none');
        showBtn.classList.add('d-none');
        hideBtn.classList.remove('d-none');
    }
}

function hideDetailedComparison() {
    const table = document.getElementById('comparisonTable');
    const showBtn = document.getElementById('showComparisonBtn');
    const hideBtn = document.getElementById('hideComparisonBtn');
    
    if (table) {
        table.classList.add('d-none');
        showBtn.classList.remove('d-none');
        hideBtn.classList.add('d-none');
    }
}

function simulateRandomScenarios() {
    const resultDiv = document.getElementById('scenarioResult');
    const scenarios = [
        { days: 45, reason: 'Family emergency' },
        { days: 20, reason: 'Work conflict' },
        { days: 10, reason: 'Weather concerns' },
        { days: 3, reason: 'Last-minute change' }
    ];
    
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const randomPackage = Object.values(travelPackages)[Math.floor(Math.random() * Object.values(travelPackages).length)];
    const refundInfo = calculateRefundAmount(randomPackage.price, randomScenario.days);
    
    const html = `<div class="alert alert-info">
        <h6>🎭 Simulation Scenario</h6>
        <p><strong>Situation:</strong> ${randomScenario.reason}</p>
        <p><strong>Package:</strong> ${randomPackage.name} ($${randomPackage.price})</p>
        <p><strong>Cancellation:</strong> ${randomScenario.days} days before travel</p>
        <p><strong>Result:</strong> ${refundInfo.percentage}% refund = <span class="text-primary">$${refundInfo.amount}</span></p>
        <p><em>${refundInfo.recommendation}</em></p>
    </div>`;
    
    resultDiv.innerHTML = html;
}

function initializePolicySearch() {
    const searchInput = document.getElementById('policySearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchPolicyTerms(query);
        });
    }
}

function searchPolicyTerms(query) {
    const resultsDiv = document.getElementById('searchResults');
    if (!resultsDiv || !query) {
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }
    
    const policyTerms = [
        { term: 'refund', description: 'Money returned when cancelling a booking', section: 'Refund Policy' },
        { term: 'cancellation', description: 'Process of cancelling your travel booking', section: 'Cancellation Terms' },
        { term: 'travel insurance', description: 'Insurance to protect against travel-related losses', section: 'Insurance Information' },
        { term: 'force majeure', description: 'Unforeseeable circumstances preventing contract fulfillment', section: 'Special Circumstances' },
        { term: 'supplier fees', description: 'Non-refundable fees charged by travel suppliers', section: 'Fee Structure' },
        { term: 'processing time', description: '7-10 business days for refund processing', section: 'Refund Timeline' }
    ];
    
    const matches = policyTerms.filter(item => 
        item.term.includes(query) || item.description.toLowerCase().includes(query)
    );
    
    if (matches.length > 0) {
        let html = '<div class="list-group">';
        matches.forEach(match => {
            html += `<div class="list-group-item">
                <strong>${match.term}</strong> - ${match.description}
                <br><small class="text-muted">Found in: ${match.section}</small>
            </div>`;
        });
        html += '</div>';
        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = '<p class="text-muted">No matching terms found.</p>';
    }
}

function initializeSmartRecommendations() {
    const recommendBtn = document.getElementById('getRecommendationsBtn');
    if (recommendBtn) {
        recommendBtn.addEventListener('click', function() {
            generateSmartRecommendations();
            soundEffects.playSuccessSound();
        });
    }
}

function generateSmartRecommendations() {
    const resultsDiv = document.getElementById('recommendationsResult');
    const currentDate = new Date();
    const recommendations = [];
    
    // Generate recommendations based on current date and packages
    const timeOfYear = currentDate.getMonth();
    
    if (timeOfYear >= 5 && timeOfYear <= 8) { // Summer
        recommendations.push('🏖️ Summer is perfect for beach destinations - consider our Tropical Paradise packages');
        recommendations.push('📅 Book 30+ days in advance for full refund flexibility');
    } else if (timeOfYear >= 11 || timeOfYear <= 2) { // Winter
        recommendations.push('🏔️ Winter adventures await - Mountain Escapes are popular this season');
        recommendations.push('❄️ Weather-related cancellations are more common - travel insurance recommended');
    } else { // Spring/Fall
        recommendations.push('🌸 Great season for cultural destinations with mild weather');
        recommendations.push('💰 Off-season pricing available - check for special discounts');
    }
    
    // Add general recommendations
    recommendations.push('📋 Always read cancellation terms before booking');
    recommendations.push('💡 Consider flexible booking options for uncertain travel dates');
    
    let html = '<div class="alert alert-success"><h6>💡 Smart Recommendations</h6><ul>';
    recommendations.forEach(rec => {
        html += `<li>${rec}</li>`;
    });
    html += '</ul></div>';
    
    resultsDiv.innerHTML = html;
}

function initializeSpecificCalculations() {
    const calcButtons = document.querySelectorAll('.calculate-specific-btn');
    calcButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageType = this.dataset.package;
            quickCalculateForPackage(packageType);
            soundEffects.playNotificationSound();
        });
    });
}

function quickCalculateForPackage(packageType) {
    const pkg = travelPackages[packageType];
    if (!pkg) return;
    
    // Auto-fill the calculator with this package
    document.getElementById('packageType').value = packageType;
    
    // Set default dates (travel in 30 days, cancel today)
    const today = new Date();
    const travelDate = new Date(today);
    travelDate.setDate(today.getDate() + 30);
    
    document.getElementById('travelDate').value = travelDate.toISOString().split('T')[0];
    document.getElementById('cancellationDate').value = today.toISOString().split('T')[0];
    
    // Calculate automatically
    calculateRefund();
    
    // Scroll to calculator
    document.getElementById('packageType').scrollIntoView({ behavior: 'smooth' });
}

// Initialize advanced processing on page load
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        // Run advanced processing examples
        processDestinationsWithForLoop();
        processPackagesWithForOf();
        
        const affordablePackages = findAffordablePackages(1000);
        console.log('Affordable packages for $1000 budget:', affordablePackages.map(p => p.name));
        
        calculatePackageStatistics();
        
        const recommendations = getDestinationRecommendations({ type: 'cultural', minRating: 4.5 });
        console.log('Cultural destination recommendations:', recommendations);
        
        // Initialize page-specific features
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            initializeIndexPageFeatures();
        }
        
        if (window.location.pathname.includes('cancellation-policy.html')) {
            initializeCancellationPageFeatures();
        }
    });
}

