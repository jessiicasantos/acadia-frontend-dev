import { maskCurrency } from './utils.js';
import productService from './productService.js';
import { cartActions } from './cart.js';

const cart = document.getElementById('side-cart');
const overlay = document.getElementById('global-overlay');
const closeBtn = document.getElementById('close-cart');
const productsGrid = document.getElementById('products-grid-top');
const searchInput = document.getElementById('product-search');
const searchBtn = document.querySelector('.btn-search');
const error = document.querySelector('.error-product');

// Render product card
function createProductCard(product) {
  return `
    <a href="#" class="rounded-card" data-id="${product.id}" data-title="${product.title.toLowerCase()}">
      <div class="img-wrapper">
        <img src="${product.image || './img/photo-1.jpg'}" alt="${product.alt}" />
      </div>
      <div class="card-content">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="card-footer">
        <span>${maskCurrency(product.price)}</span>
        <button class="add-cart">+ Add to Cart</button>
        </div>
      </div>
    </a>
  `
};

// API Data Fetching
async function loadProducts() {
  try {
    const products = await productService.getProducts();
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
  } catch(error) {
    console.error(`Error loading products: ${error}`);
    productsGrid.innerHTML = `<p class="error">Failed to load products.</p>`;
    
  }
}

// Search / Filter
const performSearch = (e) => {
    const term = searchInput.value.toLowerCase();
    const cards = productsGrid.querySelectorAll('.rounded-card');
    let hasResults = false;

    cards.forEach(card => {
      const title = card.getAttribute('data-title') || '';
      const matches = title.includes(term);

      if(title.includes(term)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }

      if(matches) hasResults = true;
      
      if(!hasResults) {
        error.classList.add('open');
      } else {
        error.classList.remove('open');
      }
    });
};

// --- Event Listeners ---
searchInput.addEventListener('input', performSearch);
searchBtn.addEventListener('click', performSearch);

// Button add to Cart Interaction
productsGrid.addEventListener('click', (event) => {
  event.preventDefault();

  const btnCart = event.target.closest('.add-cart');
  if(!btnCart) return;
  const card = btnCart.closest('.rounded-card');

  const productData = {
    id: card.dataset.id,
    title: card.querySelector('h3').textContent,
    price: parseFloat(card.querySelector('.card-footer span').textContent.replace(/[^0-9.]/g, '')),
    image: card.querySelector('img').src
  };

  btnCart.classList.toggle('added');
  const isAdded = btnCart.classList.contains('added');
  btnCart.textContent = isAdded ? '✓ Added' : '+ Add to Cart';

  card.classList.toggle('card-active', isAdded);

  cartActions.toggleItem(productData, isAdded);
  if(isAdded) cartActions.open();
});

// Close Sidebar
function closeCart() {
  cartActions.close();
}

// Product Event Listener
window.addEventListener('productAdded', (event) => {
  const newProduct = event.detail;
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = createProductCard(newProduct);
  const newCard = tempDiv.firstElementChild;

  productsGrid.append(newCard);
  newCard.scrollIntoView({ behavior: 'smooth' });
});

// UI Listeners
closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

// Init
loadProducts();