import { handleProductSubmission } from './productActions.js';
import { maskCurrency } from './utils.js';
import { toggleBtnLoad } from './ui-utils.js';

const modal = document.getElementById('global-modal');
const overlay = document.getElementById('global-overlay');
const form = document.getElementById('product-form');
const priceInput = document.getElementById('price');
const errorSpan = document.querySelector('.error');

const toggleModal = (show = true) => {
    modal.classList.toggle('active', show);
    overlay.classList.toggle('active', show);
    if (!show) {
        form.reset();
        errorSpan.textContent = '';
    }
};

// UI Listeners
priceInput.addEventListener('input', (e) => e.target.value = maskCurrency(e.target.value));
document.getElementById('add-sample-btn').addEventListener('click', () => toggleModal(true));
document.getElementById('close-modal').addEventListener('click', () => toggleModal(false));
overlay.addEventListener('click', () => toggleModal(false));

// Submit
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const imgFile = form.querySelector('input[type="file"]').files[0];

    try {
        toggleBtnLoad(submitBtn, true); 

        await handleProductSubmission(formData, imgFile);
        
        toggleModal(false);
        window.location.reload();
    } catch (error) {
       if (error.isValidationError) {
            Object.entries(error.errors).forEach(([field, messages]) => {
                const el = document.getElementById(`error-${field}`);
                if (el) el.textContent = messages[0];
            });
        } else {
            alert(error.message || "An unexpected error occurred");
        }
    } finally {
        toggleBtnLoad(submitBtn, false);
    }
});