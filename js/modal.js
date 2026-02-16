const modal = document.getElementById('global-modal');
const overlay = document.getElementById('global-overlay');

const toggleModal = (show = true) => {
    modal.classList.toggle('active', show);
    overlay.classList.toggle('active', show);
    if (!show) document.getElementById('product-form').reset();
};

document.getElementById('add-sample-btn').addEventListener('click', () => toggleModal(true));
document.getElementById('close-modal').addEventListener('click', () => toggleModal(false));
overlay.addEventListener('click', () => toggleModal(false));