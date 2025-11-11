// ===== REFUND CALCULATOR =====
// Handles refund calculation based on package type and cancellation timing

document.addEventListener('DOMContentLoaded', function() {
    // Package prices
    const packagePrices = {
        weekend: 299,
        adventure: 899,
        luxury: 1599
    };

    // Package names
    const packageNames = {
        weekend: 'Weekend Getaway',
        adventure: 'Adventure Week',
        luxury: 'Luxury Retreat'
    };

    // Get DOM elements
    const calculateBtn = document.getElementById('calculateRefundBtn');
    const clearBtn = document.getElementById('clearCalculatorBtn');
    const packageTypeSelect = document.getElementById('packageType');
    const travelDateInput = document.getElementById('travelDate');
    const cancellationDateInput = document.getElementById('cancellationDate');
    const refundResult = document.getElementById('refundResult');
    const calculateSpecificBtns = document.querySelectorAll('.calculate-specific-btn');

    // Set minimum date to today for date inputs
    const today = new Date().toISOString().split('T')[0];
    if (travelDateInput) {
        travelDateInput.setAttribute('min', today);
    }
    if (cancellationDateInput) {
        cancellationDateInput.setAttribute('min', today);
    }

    // Function to update cancellation date max based on travel date
    function updateCancellationDateMax() {
        if (!travelDateInput || !cancellationDateInput) return;
        
        const travelDate = travelDateInput.value;
        if (travelDate) {
            // Set max to travel date (cancellation must be before or on travel date)
            cancellationDateInput.setAttribute('max', travelDate);
            
            // If cancellation date is set and is after travel date, clear it
            const cancellationDate = cancellationDateInput.value;
            if (cancellationDate && cancellationDate > travelDate) {
                cancellationDateInput.value = '';
                if (refundResult) {
                    refundResult.innerHTML = '';
                }
            }
        } else {
            // If no travel date, remove max constraint
            cancellationDateInput.removeAttribute('max');
        }
    }

    // Calculate refund based on days before travel
    function calculateRefundPercentage(daysBeforeTravel) {
        if (daysBeforeTravel > 30) {
            return 100; // Full refund
        } else if (daysBeforeTravel >= 15 && daysBeforeTravel <= 30) {
            return 50; // 50% refund
        } else if (daysBeforeTravel >= 8 && daysBeforeTravel < 15) {
            return 25; // 25% refund
        } else if (daysBeforeTravel >= 1 && daysBeforeTravel < 8) {
            return 0; // No refund
        } else {
            return 0; // Same day or past - no refund
        }
    }

    // Calculate days between two dates
    function calculateDaysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = d1 - d2;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    // Display refund result
    function displayRefundResult(packageType, packagePrice, daysBeforeTravel, refundPercentage, refundAmount) {
        if (!refundResult) return;

        const packageName = packageNames[packageType] || packageType;
        const daysText = daysBeforeTravel === 1 ? 'day' : 'days';
        
        let resultClass = 'alert-info';
        let icon = 'ℹ️';
        let message = '';

        if (refundPercentage === 100) {
            resultClass = 'alert-success';
            icon = '✅';
            message = 'Full refund available!';
        } else if (refundPercentage === 50) {
            resultClass = 'alert-warning';
            icon = '⚠️';
            message = 'Partial refund available.';
        } else if (refundPercentage === 25) {
            resultClass = 'alert-warning';
            icon = '⚠️';
            message = 'Limited refund available.';
        } else {
            resultClass = 'alert-danger';
            icon = '❌';
            message = 'No refund available.';
        }

        refundResult.innerHTML = `
            <div class="alert ${resultClass} refund-result-card">
                <div class="refund-result-header">
                    <h5 class="mb-2">${icon} ${message}</h5>
                </div>
                <div class="refund-result-body">
                    <div class="refund-details">
                        <p class="mb-2"><strong>Package:</strong> ${packageName}</p>
                        <p class="mb-2"><strong>Original Price:</strong> ${formatCurrency(packagePrice)}</p>
                        <p class="mb-2"><strong>Days Before Travel:</strong> ${daysBeforeTravel} ${daysText}</p>
                        <p class="mb-2"><strong>Refund Percentage:</strong> ${refundPercentage}%</p>
                        <hr class="my-3">
                        <div class="refund-amount-display">
                            <p class="mb-1 text-muted">Refund Amount:</p>
                            <h3 class="text-primary mb-0">${formatCurrency(refundAmount)}</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Scroll to result
        refundResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Validate inputs
    function validateInputs() {
        if (!packageTypeSelect || !packageTypeSelect.value) {
            showError('Please select a package type.');
            return false;
        }

        if (!travelDateInput || !travelDateInput.value) {
            showError('Please select a travel date.');
            return false;
        }

        if (!cancellationDateInput || !cancellationDateInput.value) {
            showError('Please select a cancellation date.');
            return false;
        }

        const travelDate = new Date(travelDateInput.value);
        const cancellationDate = new Date(cancellationDateInput.value);

        if (cancellationDate > travelDate) {
            showError('Cancellation date must be on or before the travel date. You cannot cancel after your travel date.');
            return false;
        }

        if (cancellationDate.getTime() === travelDate.getTime()) {
            // Same day cancellation - no refund
            // This is allowed but will result in 0% refund
        }

        return true;
    }

    // Show error message
    function showError(message) {
        if (!refundResult) return;
        refundResult.innerHTML = `
            <div class="alert alert-danger">
                <strong>⚠️ Error:</strong> ${message}
            </div>
        `;
    }

    // Main calculate function
    function calculateRefund() {
        if (!validateInputs()) return;

        const packageType = packageTypeSelect.value;
        const packagePrice = packagePrices[packageType];
        const travelDate = travelDateInput.value;
        const cancellationDate = cancellationDateInput.value;

        const daysBeforeTravel = calculateDaysBetween(travelDate, cancellationDate);

        if (daysBeforeTravel < 0) {
            showError('Cancellation date cannot be after travel date.');
            return;
        }

        const refundPercentage = calculateRefundPercentage(daysBeforeTravel);
        const refundAmount = (packagePrice * refundPercentage) / 100;

        displayRefundResult(packageType, packagePrice, daysBeforeTravel, refundPercentage, refundAmount);

        // Show notification if available
        if (window.notificationSystem) {
            const message = refundPercentage > 0 
                ? `Refund calculated: ${formatCurrency(refundAmount)}`
                : 'No refund available for this cancellation.';
            window.notificationSystem.info(message, 4000);
        }
    }

    // Clear calculator
    function clearCalculator() {
        if (packageTypeSelect) packageTypeSelect.value = '';
        if (travelDateInput) travelDateInput.value = '';
        if (cancellationDateInput) cancellationDateInput.value = '';
        if (refundResult) refundResult.innerHTML = '';
    }

    // Pre-fill calculator from table button
    function prefillCalculator(packageType) {
        if (packageTypeSelect) {
            packageTypeSelect.value = packageType;
        }
        
        // Set travel date to 30 days from now
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        if (travelDateInput) {
            travelDateInput.value = futureDate.toISOString().split('T')[0];
            // Update cancellation date max after setting travel date
            updateCancellationDateMax();
        }

        // Set cancellation date to today
        if (cancellationDateInput) {
            cancellationDateInput.value = today;
        }

        // Scroll to calculator
        const calculatorCard = document.querySelector('.card');
        if (calculatorCard) {
            calculatorCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Calculate automatically
        setTimeout(() => {
            calculateRefund();
        }, 300);
    }

    // Event listeners
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calculateRefund();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearCalculator();
        });
    }

    // Handle table calculate buttons
    calculateSpecificBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const packageType = this.dataset.package;
            if (packageType) {
                prefillCalculator(packageType);
            }
        });
    });

    // Update cancellation date max when travel date changes
    if (travelDateInput) {
        travelDateInput.addEventListener('change', function() {
            updateCancellationDateMax();
        });
        travelDateInput.addEventListener('input', function() {
            updateCancellationDateMax();
        });
    }

    // Allow Enter key to calculate
    [packageTypeSelect, travelDateInput, cancellationDateInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    calculateRefund();
                }
            });
        }
    });

    // Initialize cancellation date max on page load
    updateCancellationDateMax();
});

