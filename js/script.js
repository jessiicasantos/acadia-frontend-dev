const btnAddCart = document.querySelectorAll('.add-cart');

btnAddCart.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        
        btn.classList.toggle('added');
        btn.textContent = btn.classList.contains('added') ? 'Added' : 'Add';
    });
});