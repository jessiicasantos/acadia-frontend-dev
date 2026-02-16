import productService from './api.js';

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

closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);


const productsGrid = document.getElementById('products-grid-top');

async function loadProducts() {
  try {
    // 1. Clean call to "service layer"
    const products = await productService.getProducts();
    
    // 2. Render products in the grid
    productsGrid.innerHTML = products.map(product => `
      <a href="./single-product.html?id=${product.id}" class="rounded-card">
        <div class="img-wrapper">
          <img src="${product.image || './img/photo-1.jpg'}" alt="${product.alt}" />
        </div>
        <div class="card-content">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="card-footer">
          <span>$${Number(product.price).toFixed(2)}</span>
          <button class="add-cart">Add</button>
          </div>
        </div>
      </a>
    `).join('');
    } catch(error) {
      console.error(`'Error loading products: ${error}`);
      productsGrid.innerHTML = `<div>
          <p class="error">Failed to load products. Verify your server connection.</p>
        </div>
      `;
    }
  }

  // Init
  loadProducts();