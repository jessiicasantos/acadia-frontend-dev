import { maskCurrency } from './utils.js';

let cartItems = [];

const cartContainer = document.getElementById('cart-items');
const totalElement = document.querySelector('.cart-footer .total em');
const cartAside = document.getElementById('side-cart');
const overlay = document.getElementById('global-overlay');
const btnBuy = document.querySelector('.buy');

export const cartActions = {
    open() {
        cartAside.classList.add('open');
        overlay.classList.add('active');
    },
    close() {
        cartAside.classList.remove('open');
        overlay.classList.remove('active');
    },
    updateUI() {
        if(cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalElement.textContent = '$ 0.00';
            btnBuy.disabled = true;
            return;
        }

        btnBuy.disabled = false;

        // Render mini cards
        cartContainer.innerHTML = cartItems.map(item => 
            `<div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" />
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <span>${maskCurrency(item.price)}</span>
                </div>
            </div>`
        ).join('');

        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        totalElement.textContent = maskCurrency(total);
    },
    toggleItem(product) {
        const index = cartItems.findIndex(item => item.id === product.id);

        console.log(index);

        if(index === -1) {
            cartItems.push(product); // Add
        } else {
            cartItems.splice(index, 1) // Remove
        }

        this.updateUI();
        this.open();
    },
    removeById(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        
        this.updateUI();
        this.open();
    }
};