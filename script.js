document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('installForm');
    const otherGroup = document.getElementById('otherSpecifyGroup');

    document.querySelectorAll('input[name="locationType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            otherGroup.classList.toggle('hidden', this.value !== 'other');
            checkStep2();
        });
    });

    // Step 1: Activate Next button when required fields have values
    const step1Fields = ['customerName', 'customerEmail', 'customerPhone'];
    const btnNext1 = document.getElementById('btnNext1');

    function checkStep1() {
        const allFilled = step1Fields.every(id => document.getElementById(id).value.trim() !== '');
        if (allFilled) {
            btnNext1.classList.add('active');
            btnNext1.disabled = false;
        } else {
            btnNext1.classList.remove('active');
            btnNext1.disabled = true;
        }
    }

    step1Fields.forEach(id => {
        document.getElementById(id).addEventListener('input', checkStep1);
    });
    checkStep1();

    // Step 2: Activate Next button when required step 2 fields are filled
    const btnNext2 = document.getElementById('btnNext2');

    function checkStep2() {
        const addressFields = ['installAddress', 'installCity', 'installState', 'installZip'];
        const allAddressFilled = addressFields.every(id => document.getElementById(id).value.trim() !== '');
        const locationChecked = document.querySelector('input[name="locationType"]:checked');
        const deviceChecked = document.querySelector('input[name="deviceType"]:checked');
        const otherValid = !locationChecked || locationChecked.value !== 'other' ||
            document.getElementById('otherSpecify').value.trim() !== '';

        if (allAddressFilled && locationChecked && deviceChecked && otherValid) {
            btnNext2.classList.add('active');
            btnNext2.disabled = false;
        } else {
            btnNext2.classList.remove('active');
            btnNext2.disabled = true;
        }
    }

    ['installAddress', 'installCity', 'installState', 'installZip'].forEach(id => {
        document.getElementById(id).addEventListener('input', checkStep2);
    });
    document.getElementById('otherSpecify').addEventListener('input', checkStep2);
    document.querySelectorAll('input[name="locationType"]').forEach(r => {
        r.addEventListener('change', checkStep2);
    });
    document.querySelectorAll('input[name="deviceType"]').forEach(r => {
        r.addEventListener('change', checkStep2);
    });
    checkStep2();

    // Step 3: Submit is always active (all fields optional)
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('step3').classList.remove('active');
        document.getElementById('confirmationStep').classList.add('active');
        document.getElementById('confirmNum').textContent = Math.random().toString(36).substring(2, 8).toUpperCase();
        window.scrollTo({ top: document.querySelector('.form-card').offsetTop - 100, behavior: 'smooth' });
    });
});

function goToStep(stepNum) {
    if (stepNum === 2) {
        const btnNext1 = document.getElementById('btnNext1');
        if (!btnNext1.classList.contains('active')) return;
    }
    if (stepNum === 3) {
        const btnNext2 = document.getElementById('btnNext2');
        if (!btnNext2.classList.contains('active')) return;
    }

    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step' + stepNum).classList.add('active');
    window.scrollTo({ top: document.querySelector('.form-card').offsetTop - 100, behavior: 'smooth' });
}
