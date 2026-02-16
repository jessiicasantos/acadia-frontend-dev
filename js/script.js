const cart = document.getElementById('side-cart');
const overlay = document.getElementById('global-overlay');
const closeBtn = document.getElementById('close-cart');
const btnAddCart = document.querySelectorAll('.add-cart');

function openCart() {
    cart.classList.add('open');
    overlay.classList.add('active');
}

function closeCart() {
    cart.classList.remove('open');
    overlay.classList.remove('active');
}

btnAddCart.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        
        btn.classList.toggle('added');
        btn.textContent = btn.classList.contains('added') ? 'Added' : 'Add';

        openCart();
    });
});

// closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);