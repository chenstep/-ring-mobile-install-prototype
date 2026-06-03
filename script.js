document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('installForm');
    const otherRadio = document.querySelector('input[name="locationType"][value="other"]');
    const otherGroup = document.getElementById('otherSpecifyGroup');

    document.querySelectorAll('input[name="locationType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            otherGroup.classList.toggle('hidden', this.value !== 'other');
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        document.querySelector('.form-container form').classList.add('hidden');
        document.querySelector('.progress-steps').classList.add('hidden');
        document.querySelector('.form-header').classList.add('hidden');
        const successState = document.getElementById('successState');
        successState.classList.remove('hidden');
        document.getElementById('confirmNum').textContent = Math.random().toString(36).substring(2, 8).toUpperCase();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function goToStep(stepNum) {
    if (!validateCurrentStep(stepNum)) return;

    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step' + stepNum).classList.add('active');

    document.querySelectorAll('.progress-steps .step').forEach((step, i) => {
        const num = i + 1;
        step.classList.remove('active', 'completed');
        if (num === stepNum) step.classList.add('active');
        else if (num < stepNum) step.classList.add('completed');
    });

    if (stepNum === 4) buildReview();

    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateCurrentStep(targetStep) {
    const currentStep = document.querySelector('.form-step.active');
    const currentNum = parseInt(currentStep.id.replace('step', ''));

    if (targetStep <= currentNum) return true;

    let valid = true;

    if (currentNum === 1) {
        const fields = ['customerName', 'customerEmail', 'customerPhone'];
        fields.forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                input.classList.add('error');
                valid = false;
            } else {
                input.classList.remove('error');
            }
        });
    }

    if (currentNum === 2) {
        const address = document.getElementById('installAddress');
        if (!address.value.trim()) {
            address.classList.add('error');
            valid = false;
        } else {
            address.classList.remove('error');
        }

        const locationType = document.querySelector('input[name="locationType"]:checked');
        if (!locationType) {
            valid = false;
            document.querySelector('.radio-group').style.outline = '2px solid #cc0c39';
            document.querySelector('.radio-group').style.borderRadius = '8px';
        } else {
            document.querySelector('.radio-group').style.outline = 'none';
            if (locationType.value === 'other') {
                const otherInput = document.getElementById('otherSpecify');
                if (!otherInput.value.trim()) {
                    otherInput.classList.add('error');
                    valid = false;
                } else {
                    otherInput.classList.remove('error');
                }
            }
        }
    }

    if (currentNum === 3) {
        const deviceType = document.querySelector('input[name="deviceType"]:checked');
        if (!deviceType) {
            valid = false;
            document.querySelector('.device-select').style.outline = '2px solid #cc0c39';
            document.querySelector('.device-select').style.borderRadius = '8px';
        } else {
            document.querySelector('.device-select').style.outline = 'none';
        }
    }

    return valid;
}

function buildReview() {
    const reviewContent = document.getElementById('reviewContent');

    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const purchaseDate = document.getElementById('purchaseDate').value;
    const orderNumber = document.getElementById('orderNumber').value;

    const installAddress = document.getElementById('installAddress').value;
    const locationType = document.querySelector('input[name="locationType"]:checked');
    let locationLabel = '';
    if (locationType) {
        const labels = {
            'parking_lot': 'Parking Lot',
            'construction_site': 'Construction Site',
            'event_venue': 'Event Venue',
            'other': 'Other: ' + document.getElementById('otherSpecify').value
        };
        locationLabel = labels[locationType.value];
    }

    const deviceType = document.querySelector('input[name="deviceType"]:checked');
    let deviceLabel = '';
    if (deviceType) {
        deviceLabel = deviceType.closest('.device-option').querySelector('.device-name').textContent;
    }

    const ringEmail = document.getElementById('ringEmail').value;
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const contactPhone = document.getElementById('contactPhone').value;

    let html = `
        <div class="review-block">
            <h4>Customer Information</h4>
            <div class="review-row"><span class="review-label">Name</span><span class="review-value">${customerName}</span></div>
            <div class="review-row"><span class="review-label">Email</span><span class="review-value">${customerEmail}</span></div>
            <div class="review-row"><span class="review-label">Phone</span><span class="review-value">${customerPhone}</span></div>
            ${purchaseDate ? `<div class="review-row"><span class="review-label">Purchase Date</span><span class="review-value">${purchaseDate}</span></div>` : ''}
            ${orderNumber ? `<div class="review-row"><span class="review-label">Order Number</span><span class="review-value">${orderNumber}</span></div>` : ''}
        </div>
        <div class="review-block">
            <h4>Installation Details</h4>
            <div class="review-row"><span class="review-label">Address</span><span class="review-value">${installAddress}</span></div>
            <div class="review-row"><span class="review-label">Location Type</span><span class="review-value">${locationLabel}</span></div>
        </div>
        <div class="review-block">
            <h4>Device Selection</h4>
            <div class="review-row"><span class="review-label">Device</span><span class="review-value">${deviceLabel}</span></div>
            ${ringEmail ? `<div class="review-row"><span class="review-label">Ring Account Email</span><span class="review-value">${ringEmail}</span></div>` : ''}
        </div>
    `;

    if (contactName || contactEmail || contactPhone) {
        html += `
            <div class="review-block">
                <h4>Onsite Point-of-Contact</h4>
                ${contactName ? `<div class="review-row"><span class="review-label">Name</span><span class="review-value">${contactName}</span></div>` : ''}
                ${contactEmail ? `<div class="review-row"><span class="review-label">Email</span><span class="review-value">${contactEmail}</span></div>` : ''}
                ${contactPhone ? `<div class="review-row"><span class="review-label">Phone</span><span class="review-value">${contactPhone}</span></div>` : ''}
            </div>
        `;
    }

    reviewContent.innerHTML = html;
}
