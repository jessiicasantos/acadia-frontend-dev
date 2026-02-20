import { handleProductSubmission } from './productActions.js';
import { maskCurrency, toggleBtnLoad } from './utils.js';

const modal = document.getElementById('global-modal');
const overlay = document.getElementById('global-overlay');
const form = document.getElementById('product-form');
const priceInput = document.getElementById('price');
const errorsSpan = document.querySelectorAll('.error-form');
const btnAddSample = document.getElementById('add-sample-btn');
const btnCloseModal = document.getElementById('close-modal');

const toggleModal = (show = true) => {
    modal.classList.toggle('active', show);
    overlay.classList.toggle('active', show);
    if (!show) {
        form.reset();

        errorsSpan.forEach(span => {
            span.textContent = '';
        });
    }
};

// Modal Listeners
btnAddSample.addEventListener('click', () => toggleModal(true));
btnCloseModal.addEventListener('click', () => toggleModal(false));
overlay.addEventListener('click', () => toggleModal(false));

// Price Input Listener
priceInput.addEventListener('input', (e) => maskCurrency(e.target.value));

// Submit
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const imgFile = form.querySelector('input[type="file"]').files[0];

    errorsSpan.forEach(span => {
        span.textContent = '';
    });

    try {
        toggleBtnLoad(submitBtn, true);
        
        const newProduct = await handleProductSubmission(formData, imgFile);

        const eventUpdate = new CustomEvent('productAdded', { detail: newProduct });
        window.dispatchEvent(eventUpdate);

        toggleModal(false);
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