// cart.js - updated to support color & size variants

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

// Update cart count badge on all pages
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadges = document.querySelectorAll('#cart-count');
  cartBadges.forEach(badge => {
    if (badge) badge.textContent = totalItems;
  });
}

// Add item to cart (used by index.html new buttons)
window.addItemToCart = function (item) {
  const existingIndex = cart.findIndex(i => i.id === item.id && i.color === item.color && i.size === item.size);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart();
  alert(`${item.name} (${item.color}, ${item.size}) added to cart`);
};

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

// Update quantity
function updateQuantity(index, newQty) {
  if (newQty < 1) {
    removeItem(index);
  } else {
    cart[index].quantity = newQty;
    saveCart();
  }
}

// Render cart page (if on cart.html)
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="color: var(--text-light);">Your cart is empty.</p>';
    document.getElementById('cart-total').innerHTML = 'Total: ₦0';
    document.getElementById('checkout-btn').style.display = 'none';
    return;
  }

  let html = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="cart-item">
        <div class="cart-details">
          <div class="cart-top">
            <h4>${item.name}</h4>
            <button class="remove-btn" onclick="removeItem(${idx})">✕</button>
          </div>
          <div class="cart-meta">${item.color} / ${item.size}</div>
          <div class="cart-price">₦${item.price.toLocaleString()}</div>
          <div class="cart-bottom">
            <div class="qty-box">
              <button onclick="updateQuantity(${idx}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateQuantity(${idx}, ${item.quantity + 1})">+</button>
            </div>
            <div class="item-total">₦${itemTotal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    `;
  });

  cartContainer.innerHTML = html;
  document.getElementById('cart-total').innerHTML = `Total: ₦${total.toLocaleString()}`;
  document.getElementById('checkout-btn').style.display = 'block';
}

// Checkout via WhatsApp (collects all items with variants)
function checkout() {
  if (cart.length === 0) return;
  let message = "My Order:\n";
  cart.forEach(item => {
    message += `${item.name} (${item.color}, ${item.size}) x${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}\n`;
  });
  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  message += `\nTotal: ₦${total.toLocaleString()}`;
  window.open(`https://wa.me/2347025776737?text=${encodeURIComponent(message)}`, '_blank');
}

// Update UI and count on every load
function updateCartUI() {
  renderCart();
  updateCartCount();
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.onclick = checkout;
});

// Also expose functions globally
window.removeItem = removeItem;
window.updateQuantity = updateQuantity;
window.checkout = checkout;