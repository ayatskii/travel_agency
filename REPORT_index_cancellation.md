# Travel Agency Website - Implementation Report

**Student**: Nuray Nuraly (for index.html and cancellation-policy.html)

**Project Objective**

To create a fully functional, responsive, and accessible travel agency website that combines all learned web development concepts into a complete project.

---

## Index Page Implementation (index.html)

### HTML Structure & Features

#### 1. **Hero Section with Interactive Features**

```html
<section id="hero-section" class="hero text-center py-5">
    <div class="container">
        <h2 class="hero-title mb-3">Discover Your Next Adventure</h2>
        <p class="hero-description mb-4 px-sm-3">
            Explore the world's most beautiful destinations with our expertly crafted travel experiences.
            From pristine beaches to mountain peaks, your perfect journey awaits.
        </p>
        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <a href="#destinations" class="btn btn-primary px-4 py-2">Explore Destinations</a>
            <a href="#packages" class="btn btn-secondary px-4 py-2">View Packages</a>
            <button id="randomDestinationBtn" class="btn btn-outline-primary px-4 py-2">🎲 Random Destination</button>
        </div>
        <div id="heroStats" class="mt-4 d-none">
            <!-- Dynamic statistics display -->
        </div>
    </div>
</section>
```

**Key Features:**
- **Responsive Hero Section** with call-to-action buttons
- **Random Destination Button** for interactive user engagement
- **Dynamic Statistics Display** showing destination count, package count, and average rating
- **Bootstrap Grid System** for responsive layout across devices

#### 2. **Navigation Bar with Theme Toggle**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">BlueWave Travel</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
                <!-- Navigation links -->
            </ul>
            <button id="themeToggle" class="btn btn-outline-light ms-2" title="Toggle theme">🌙</button>
            <a class="btn btn-light ms-lg-3 px-3 py-2 fw-medium" href="booking.html">Book Now</a>
        </div>
    </div>
</nav>
```

**Features:**
- **Responsive Bootstrap Navbar** with collapse functionality for mobile
- **Theme Toggle Button** for dark/light mode switching
- **Active Navigation States** with visual indicators
- **Smooth Anchor Navigation** to page sections (#destinations, #packages)

#### 3. **Scroll Progress Indicator**

```html
<div id="scroll-progress"></div>
```

**Implementation Features:**
- **Visual Progress Bar** at top of page showing scroll position
- **Dynamic Color Gradient** that changes based on scroll percentage:
  - Blue gradient (0-50%): Default state
  - Orange gradient (50-80%): Mid-scroll
  - Red gradient (80-100%): Near bottom
- **Performance Optimized** with `requestAnimationFrame` for smooth updates

#### 4. **Why BlueWave Section with Modal Subscription**

```html
<section class="py-5" style="background-color: hsl(207, 81%, 90%);">
    <div class="container">
        <div class="row align-items-center g-5">
            <div class="col-sm-12 col-md-6 col-lg-6">
                <h3 class="fw-bold mb-3">Why BlueWave?</h3>
                <p class="lead mb-4">Tailored trips, fair prices, and 24/7 global support.</p>
                <button id="openPopup" class="btn btn-outline-primary mb-3">Subscribe</button>
                <div id="modal" class="hidden">
                    <div class="backdrop"></div>
                    <div class="dialog">
                        <button id="closePopup">×</button>
                        <form>
                            <input type="email" placeholder="Email">
                            <button id="send" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 text-center">
                <img src="./assets/imgs/card1.jpeg" class="img-fluid rounded-4 shadow-lg" alt="Why Choose BlueWave">
            </div>
        </div>
    </div>
</section>
```

**Features:**
- **Modal Popup System** for email subscription
- **Backdrop Click to Close** functionality
- **ESC Key Support** for closing modal
- **Responsive Image** with Bootstrap utility classes

#### 5. **Top Highlights Section**

```html
<section class="py-5 bg-light">
    <div class="container text-center">
        <h3 class="mb-5 fw-bold text-primary">Top Highlights</h3>
        <div class="row g-4">
            <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="p-4 border rounded-4 shadow-sm bg-white h-100">
                    <h5 class="mb-2">🏝️ Beaches</h5>
                    <p>Relax on crystal-clear shores with golden sand and turquoise waves.</p>
                </div>
            </div>
            <!-- More highlight cards -->
        </div>
    </div>
</section>
```

**Features:**
- **Responsive Card Grid** using Bootstrap's grid system
- **Equal Height Cards** with `h-100` utility class
- **Shadow Effects** for visual depth
- **Emoji Icons** for visual appeal

#### 6. **Destinations Section with Interactive Cards**

```html
<section id="destinations" class="py-5" style="background-color: hsl(207, 81%, 94%);">
    <div class="container text-center">
        <h3 class="section-title mb-5">Popular Destinations</h3>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="destinationsGrid">
            <div class="col" data-destination-type="beach">
                <div class="card h-100 shadow border-0 rounded-4 destination-card">
                    <img src="./assets/imgs/card1.jpeg" class="card-img-top" alt="Tropical Paradise">
                    <div class="card-body">
                        <h4 class="card-title">Tropical Paradise</h4>
                        <p class="card-subtitle text-muted mb-2">Crystal clear waters and white sandy beaches</p>
                        <div class="mb-2">
                            <span class="badge bg-info">Beach</span>
                            <span class="badge bg-warning text-dark">⭐ 4.8</span>
                        </div>
                        <p class="card-text">Experience the ultimate beach getaway with pristine shores and vibrant coral reefs.</p>
                        <button class="btn btn-primary w-100 destination-btn" data-destination="0">Learn More</button>
                    </div>
                </div>
            </div>
            <!-- More destination cards -->
        </div>
    </div>
</section>
```

**Features:**
- **Data Attributes** for filtering (`data-destination-type`)
- **Rating Badges** displaying star ratings
- **Interactive Buttons** with event handlers (`destination-btn`)
- **Category Badges** (Beach, Mountain, Cultural) for classification
- **Responsive Card Layout** adapting to screen size

#### 7. **Travel Packages Section with Comparison Tools**

```html
<section id="packages" class="py-5 bg-light">
    <div class="container">
        <h3 class="section-title mb-5">Travel Packages</h3>
        
        <!-- Package Statistics Display -->
        <div id="packageStats" class="row mb-4 d-none">
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <strong>💡 Smart Pricing:</strong> 
                    <span id="avgPackagePrice">$0</span> average price | 
                    <span id="totalSavings">$0</span> total savings available | 
                    <span id="bestValue">Best Value</span> package recommended
                </div>
            </div>
        </div>

        <div class="row g-4" id="packagesGrid">
            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 rounded-4 package-card" data-package="weekend">
                    <div class="card-body p-4">
                        <h4 class="card-title mb-1">Weekend Getaway</h4>
                        <p class="text-muted mb-3">Perfect for short escapes</p>
                        <div class="display-6 fw-bold mb-3 text-primary price">$299</div>
                        <ul class="mb-4 ps-3">
                            <li>2 nights accommodation</li>
                            <li>Breakfast included</li>
                            <li>Airport transfers</li>
                            <li>City tour guide</li>
                        </ul>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary package-select-btn" data-package-type="weekend">Select Package</button>
                            <button class="btn btn-outline-secondary btn-sm package-info-btn" data-package-type="weekend">
                                📊 Package Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- More package cards -->
        </div>

        <!-- Package Comparison Tool -->
        <div class="mt-5">
            <div class="text-center">
                <button id="comparePackagesBtn" class="btn btn-outline-primary">📋 Compare All Packages</button>
                <button id="findBestValueBtn" class="btn btn-outline-success">💰 Find Best Value</button>
                <button id="budgetCalculatorBtn" class="btn btn-outline-info">🧮 Budget Calculator</button>
            </div>
            <div id="comparisonResult" class="mt-3"></div>
        </div>
    </div>
</section>
```

**Key Features:**
- **Dynamic Package Statistics** showing average price, savings, and recommendations
- **Three Package Types**: Weekend Getaway ($299), Adventure Week ($899), Luxury Retreat ($1,599)
- **Interactive Buttons** for package selection and details
- **Comparison Tools**:
  - Compare All Packages button
  - Find Best Value calculator
  - Budget Calculator
- **Data Attributes** for JavaScript functionality (`data-package-type`)

#### 8. **Footer with Live Clock**

```html
<footer class="footer mt-5">
    <div class="container">
        <div class="footer-grid">
            <div>
                <h4 class="footer-title">BlueWave Travel</h4>
                <p class="footer-text">Your trusted partner for unforgettable travel experiences around the world.</p>
            </div>
            <!-- Footer sections with links -->
        </div>
        <div class="footer-bottom text-center">
            <p class="mb-1">© 2025 BlueWave Travel</p>
            <p class="mb-2">Developed by: Altynay Yertay, Nuray Nuraly, Aiat Mergenbay, Merey Amangeldi</p>
            <p id="clock" class="text-center small"></p>
        </div>
    </div>
</footer>
```

**Features:**
- **Live Clock Display** updated every second showing current date and time (Asia/Almaty timezone)
- **Responsive Footer Grid** with multiple sections
- **Quick Links** to all major pages
- **Contact Information** with icons

### JavaScript Functionality

#### 1. **Notification System**

```javascript
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
        this.notifications = new Map();
        this.defaultDuration = 5000;
    }
    // Methods: show, success, error, warning, info, loading
}
```

**Features:**
- **Toast-style notifications** with animations
- **Multiple notification types** (success, error, warning, info, loading)
- **Auto-dismiss** with configurable duration
- **Click to dismiss** functionality
- **Integration** with form submissions and user actions

#### 2. **Scroll-Based Features**

- **Scroll Progress Bar**: Visual indicator of page scroll position
- **Scroll-Based Notifications**: Trigger notifications when sections come into view
- **Performance Optimized**: Uses `requestAnimationFrame` for smooth animations

#### 3. **Theme Toggle**

- **Dark/Light Mode** switching
- **Persistent theme** (localStorage integration)
- **Notification feedback** on theme change

---

## Cancellation Policy Page Implementation (cancellation-policy.html)

### HTML Structure & Features

#### 1. **Interactive Refund Calculator**

```html
<!-- Interactive Refund Calculator -->
<div class="mb-4">
    <div class="card">
        <div class="card-header">
            <h4>🧮 Refund Calculator</h4>
            <p class="mb-0">Calculate your potential refund based on cancellation timing</p>
        </div>
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-4">
                    <label for="packageType" class="form-label">Package Type</label>
                    <select id="packageType" class="form-select">
                        <option value="">Select Package</option>
                        <option value="weekend">Weekend Getaway ($299)</option>
                        <option value="adventure">Adventure Week ($899)</option>
                        <option value="luxury">Luxury Retreat ($1,599)</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="travelDate" class="form-label">Travel Date</label>
                    <input type="date" id="travelDate" class="form-control">
                </div>
                <div class="col-md-4">
                    <label for="cancellationDate" class="form-label">Cancellation Date</label>
                    <input type="date" id="cancellationDate" class="form-control">
                </div>
            </div>
            <div class="mt-3">
                <button id="calculateRefundBtn" class="btn btn-primary">Calculate Refund</button>
                <button id="clearCalculatorBtn" class="btn btn-outline-secondary">Clear</button>
            </div>
            <div id="refundResult" class="mt-3"></div>
        </div>
    </div>
</div>
```

**Key Features:**
- **Package Type Selection**: Dropdown with three package options and prices
- **Date Inputs**: Travel date and cancellation date selection
- **Calculate Button**: Processes refund calculation based on policy rules
- **Clear Button**: Resets all calculator inputs
- **Dynamic Result Display**: Shows calculated refund amount with visual formatting

#### 2. **Policy Timeline Visualization**

```html
<div class="policy-timeline">
    <div class="timeline-item" data-days="30">
        <div class="timeline-period">More than 30 days before travel</div>
        <div class="timeline-refund">100% Refund</div>
        <p>Full refund of all payments made, minus any non-refundable supplier fees.</p>
        <div class="timeline-features">
            <span class="badge bg-success">✓ Full Refund</span>
            <span class="badge bg-info">✓ No Penalties</span>
        </div>
    </div>

    <div class="timeline-item" data-days="15">
        <div class="timeline-period">15-30 days before travel</div>
        <div class="timeline-refund">50% Refund</div>
        <p>50% refund of total package cost, plus full refund of any refundable components.</p>
        <div class="timeline-features">
            <span class="badge bg-warning">⚠ Partial Refund</span>
            <span class="badge bg-secondary">Processing Fee</span>
        </div>
    </div>

    <div class="timeline-item" data-days="8">
        <div class="timeline-period">8-14 days before travel</div>
        <div class="timeline-refund">25% Refund</div>
        <p>25% refund of package cost, subject to supplier policies and availability.</p>
        <div class="timeline-features">
            <span class="badge bg-warning">⚠ Limited Refund</span>
            <span class="badge bg-danger">High Penalties</span>
        </div>
    </div>

    <div class="timeline-item" data-days="0">
        <div class="timeline-period">Less than 7 days before travel</div>
        <div class="timeline-refund">No Refund</div>
        <p>No refund available due to supplier commitments made on your behalf.</p>
        <div class="timeline-features">
            <span class="badge bg-danger">✗ No Refund</span>
            <span class="badge bg-dark">Non-refundable</span>
        </div>
    </div>
</div>
```

**Features:**
- **Visual Timeline**: Four distinct cancellation periods with clear visual hierarchy
- **Data Attributes**: `data-days` for JavaScript calculation logic
- **Color-Coded Badges**: Visual indicators using Bootstrap badge classes
  - Green (Success): Full refund available
  - Yellow (Warning): Partial refund
  - Red (Danger): No refund
- **Policy Details**: Clear explanations for each time period

#### 3. **Policy Comparison Tool**

```html
<!-- Interactive Policy Comparison -->
<div class="mb-4">
    <div class="card">
        <div class="card-header">
            <h4>📊 Policy Comparison Tool</h4>
            <p class="mb-0">Compare cancellation policies across different package types</p>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <button id="showComparisonBtn" class="btn btn-info">Show Detailed Comparison</button>
                    <button id="hideComparisonBtn" class="btn btn-outline-secondary d-none">Hide Comparison</button>
                </div>
                <div class="col-md-6">
                    <button id="simulateScenarioBtn" class="btn btn-warning">🎭 Simulate Scenarios</button>
                </div>
            </div>
            <div id="comparisonTable" class="d-none">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                        <tr>
                            <th>Package Type</th>
                            <th>Original Price</th>
                            <th>30+ Days</th>
                            <th>15-30 Days</th>
                            <th>8-14 Days</th>
                            <th>&lt;7 Days</th>
                        </tr>
                        </thead>
                        <tbody id="comparisonTableBody">
                        <!-- Will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="scenarioResult" class="mt-3"></div>
        </div>
    </div>
</div>
```

**Features:**
- **Toggle Visibility**: Show/Hide comparison table
- **Comprehensive Comparison**: Side-by-side view of all packages and refund percentages
- **Scenario Simulator**: Interactive tool to simulate different cancellation scenarios
- **Responsive Table**: Bootstrap table-responsive for mobile compatibility
- **Dynamic Content**: Table populated via JavaScript

#### 4. **Policy Table with Quick Actions**

```html
<table class="policy-table">
    <thead>
    <tr>
        <th>Package Type</th>
        <th>Cancellation Period</th>
        <th>Refund Amount</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr data-package="weekend">
        <td>Weekend Getaway</td>
        <td>7+ days before</td>
        <td>Full refund</td>
        <td>
            <button class="btn btn-sm btn-outline-primary calculate-specific-btn" data-package="weekend">
                Calculate
            </button>
        </td>
    </tr>
    <tr data-package="adventure">
        <td>Adventure Week</td>
        <td>14+ days before</td>
        <td>Full refund</td>
        <td>
            <button class="btn btn-sm btn-outline-primary calculate-specific-btn" data-package="adventure">
                Calculate
            </button>
        </td>
    </tr>
    <tr data-package="luxury">
        <td>Luxury Retreat</td>
        <td>30+ days before</td>
        <td>Full refund</td>
        <td>
            <button class="btn btn-sm btn-outline-primary calculate-specific-btn" data-package="luxury">
                Calculate
            </button>
        </td>
    </tr>
    </tbody>
</table>
```

**Features:**
- **Quick Calculate Buttons**: One-click access to calculator with pre-filled package type
- **Data Attributes**: `data-package` for JavaScript integration
- **Table Format**: Clear presentation of package-specific policies
- **Action Buttons**: Bootstrap-styled buttons for user interaction

#### 5. **Advanced Features Section**

```html
<!-- Advanced Features Section -->
<div class="mt-5">
    <div class="row g-4">
        <div class="col-md-6">
            <div class="card h-100">
                <div class="card-header">
                    <h5>🔍 Policy Search</h5>
                </div>
                <div class="card-body">
                    <input type="text" id="policySearchInput" class="form-control mb-3" placeholder="Search policy terms...">
                    <div id="searchResults"></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card h-100">
                <div class="card-header">
                    <h5>💡 Smart Recommendations</h5>
                </div>
                <div class="card-body">
                    <button id="getRecommendationsBtn" class="btn btn-success mb-3">Get Recommendations</button>
                    <div id="recommendationsResult"></div>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Features:**
- **Policy Search**: Real-time search functionality to find specific policy terms
- **Smart Recommendations**: AI-style recommendations based on user scenarios
- **Responsive Card Layout**: Two-column layout on desktop, stacked on mobile
- **Equal Height Cards**: `h-100` utility for consistent card heights

#### 6. **Important Notes Section**

```html
<div class="policy-notes">
    <h3>Important Notes</h3>
    <ul class="values-list">
        <li><strong>Travel Insurance:</strong> We highly recommend purchasing travel insurance for comprehensive cancellation coverage</li>
        <li><strong>Supplier Policies:</strong> Some suppliers may have different cancellation terms</li>
        <li><strong>Force Majeure:</strong> Special considerations for unforeseen circumstances</li>
        <li><strong>Refund Processing:</strong> Refunds processed within 7-10 business days</li>
    </ul>
</div>
```

**Features:**
- **Clear Information**: Bulleted list for easy reading
- **Important Warnings**: Highlighted text for critical information
- **Policy Transparency**: Clear communication about refund processing times

#### 7. **Background Color Fun Button**

```html
<button id="bgBtn" class="btn btn-outline-light ms-2 px-3 py-2 fw-medium" type="button">Fun</button>
```

**Features:**
- **Interactive Background**: Cycles through multiple color schemes
- **User Engagement**: Adds playful interactivity to the page
- **Visual Feedback**: Immediate color change on click

### JavaScript Functionality

#### 1. **Refund Calculator Logic**

The refund calculator uses the following logic:
- **More than 30 days**: 100% refund
- **15-30 days**: 50% refund
- **8-14 days**: 25% refund
- **Less than 7 days**: No refund

**Calculation Process:**
1. User selects package type (determines base price)
2. User enters travel date
3. User enters cancellation date
4. System calculates days difference
5. Applies refund percentage based on timeline
6. Displays formatted result with visual indicators

#### 2. **Policy Comparison**

- **Dynamic Table Generation**: JavaScript creates comparison table with all packages
- **Scenario Simulation**: Allows users to test different cancellation dates
- **Visual Highlighting**: Highlights best refund options

#### 3. **Scroll Progress Bar**

- Same implementation as index.html
- Visual feedback during page scroll
- Performance optimized

#### 4. **Background Color Cycler**

```javascript
const colors=['#f6f7f9','#ffe8a1','#d1f7c4','#cde3ff','#ffd1dc'];
let i=0;
btn.addEventListener('click',()=>{
    const next = colors[i++ % colors.length];
    document.body.style.backgroundColor = next;
    const section = document.querySelector('.policy-section');
    if (section) section.style.backgroundColor = next;
});
```

**Features:**
- **5 Color Options**: Cycles through predefined color palette
- **Synchronized Changes**: Updates both body and section backgrounds
- **Loop Functionality**: Wraps around to first color after last

### Form Validation & User Experience

Both pages include:

- **Real-time validation** with error messages
- **Visual feedback** for user actions
- **Responsive design** using Bootstrap grid system
- **Accessibility features** with proper ARIA labels
- **Performance optimization** with throttled scroll events
- **Cross-browser compatibility** using modern JavaScript features

### Responsive Design Features

- **Mobile-First Approach**: Bootstrap responsive utilities
- **Flexible Grid System**: Columns adapt to screen size
- **Touch-Friendly Buttons**: Adequate sizing for mobile interaction
- **Collapsible Navigation**: Hamburger menu for mobile devices
- **Image Optimization**: Responsive images with Bootstrap classes

---

## Technologies Used

1. **HTML5**: Semantic markup with proper structure
2. **CSS3**: Modern styling with Bootstrap 5.3.3
3. **JavaScript (ES6+)**: Modern JavaScript features and classes
4. **jQuery 3.7.1**: DOM manipulation and event handling
5. **Bootstrap 5.3.3**: Responsive framework and components
6. **Custom CSS**: Styled components in `css/style.css`

## Key Implementation Highlights

1. **Interactive Elements**: Multiple interactive calculators, comparison tools, and simulators
2. **User Experience**: Toast notifications, scroll progress, theme toggle
3. **Data Visualization**: Timeline displays, comparison tables, statistics
4. **Form Handling**: Comprehensive validation and error handling
5. **Performance**: Optimized scroll handlers and efficient DOM manipulation
6. **Accessibility**: Proper semantic HTML and ARIA attributes
7. **Responsive Design**: Mobile-first approach with Bootstrap utilities

