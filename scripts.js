const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

let cart = [];

function renderProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  Products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button onclick="addToCart(${product.id})">+</button>
      <span id="quantity-${product.id}">0</span>
      <button onclick="removeFromCart(${product.id})">-</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}

function renderCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '';
  let totalPrice = 0;
  let totalQuantity = 0;
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>No Product added to the cart</p>';
  } else {
    cart.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.innerHTML = `
        <span>${item.name} - $${item.price} x ${item.quantity}</span>
      `;
      cartContainer.appendChild(cartItemDiv);
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
  }
  document.getElementById('total-price').innerText = `Total Price: $${totalPrice}`;
  document.getElementById('total-quantity').innerText = `Total Quantity: ${totalQuantity}`;
}

function addToCart(productId) {
  const product = Products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  document.getElementById(`quantity-${productId}`).innerText = cartItem ? cartItem.quantity : 1;
  renderCart();
}

function removeFromCart(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      cart = cart.filter(item => item.id !== productId);
    }
    document.getElementById(`quantity-${productId}`).innerText = cartItem ? cartItem.quantity : 0;
    renderCart();
  }
}

function clearCart() {
  cart = [];
  Products.forEach(product => {
    document.getElementById(`quantity-${product.id}`).innerText = 0;
  });
  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  document.getElementById('clear-cart').addEventListener('click', clearCart);
});
