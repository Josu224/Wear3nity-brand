// =========================
// FADE-IN ANIMATION
// =========================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

// =========================
// HERO SLIDER
// =========================
function startSlider() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
}

// =========================
// RENDER PRODUCTS (SHOP PAGE)
// =========================
function renderProducts(list = products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = list.map(p => `
    <div class="card fade-in">
      <div class="image-wrapper">
        <img src="${p.images[0]}" />
      </div>

      <h3>${p.name}</h3>
      <p class="price">₦${p.price}</p>

      <div class="card-actions">
        <button class="btn small" onclick="addCart(${p.id})">
          Add to Cart
        </button>

        <button class="btn primary small"
          onclick="quickOrder('${p.name}', ${p.price})">
          Order
        </button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// =========================
// LATEST PRODUCTS (INDEX PAGE)
// =========================
function renderLatestProducts() {
  const container = document.getElementById("latest-products");
  if (!container || typeof products === "undefined") return;

  const latest = products.slice(0, 8);

  container.innerHTML = latest.map(p => `
    <div class="card fade-in">

      <div class="image-wrapper">
        <img src="${p.images[0]}" class="img-primary" />
        <img src="${p.images[1] || p.images[0]}" class="img-hover" />
      </div>

      <h3>${p.name}</h3>
      <p class="price">₦${p.price}</p>

      <div class="card-actions">
        <button class="btn small" onclick="quickAddToCart(${p.id})">
          Add to Cart
        </button>

        <button class="btn primary small" onclick="quickOrder('${p.name}', ${p.price})">
          Order
        </button>
      </div>

    </div>
  `).join("");

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// =========================
// PRODUCT DETAIL PAGE
// =========================
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<p>Product not found</p>";
    return;
  }

  container.innerHTML = `
    <div class="grid">
      <div>
        <img id="main-img" src="${product.images[0]}" />
        <div class="thumbs">
          ${product.images.map(img => `
            <img src="${img}" onclick="changeImage('${img}')" />
          `).join("")}
        </div>
      </div>

      <div>
        <h2>${product.name}</h2>
        <p>₦${product.price}</p>
        <p>${product.description}</p>

        <label>Size</label>
        <select id="size">
          ${product.sizes.map(s => `<option>${s}</option>`).join("")}
        </select>

        <label>Quantity</label>
        <input type="number" id="qty" value="1" min="1" />

        <button class="btn primary" onclick="orderNow(${product.id})">
          Order on WhatsApp
        </button>

        <button class="btn" onclick="addCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// =========================
// IMAGE SWITCH
// =========================
function changeImage(src) {
  const img = document.getElementById("main-img");
  if (img) img.src = src;
}

// =========================
// CART LOGIC
// =========================
function addCart(id) {
  if (typeof getCart !== "function") return;

  const product = products.find(p => p.id === id);
  if (!product) return;

  const sizeEl = document.getElementById("size");
  const qtyEl = document.getElementById("qty");

  const size = sizeEl ? sizeEl.value : product.sizes[0];
  const qty = qtyEl ? parseInt(qtyEl.value) : 1;

  let cart = getCart();

  const existing = cart.find(item => item.id === id && item.size === size);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, size, qty });
  }

  saveCart(cart);
  updateCartCount();
  alert("Cart updated");
}

// QUICK ADD (INDEX)
function quickAddToCart(id) {
  addCart(id);
}

// =========================
// WHATSAPP ORDER
// =========================
function orderNow(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const size = document.getElementById("size")?.value || product.sizes[0];
  const qty = document.getElementById("qty")?.value || 1;

  const message = buildWhatsAppMessage(product, size, qty);
  sendWhatsApp(message);
}

// SIMPLE QUICK ORDER
function quickOrder(name, price) {
  const message = `Hello, I want to order:

Product: ${name}
Quantity: 1
Price: ₦${price}

Please confirm availability.`;
  sendWhatsApp(message);
}

// =========================
// CART COUNT
// =========================
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el || typeof getCart !== "function") return;

  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  el.textContent = total;
}

// =========================
// MOBILE MENU
// =========================
function toggleMenu() {
  document.getElementById("mobile-menu")?.classList.toggle("active");
  document.getElementById("menu-overlay")?.classList.toggle("active");
}

// CLOSE WITH ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.getElementById("mobile-menu")?.classList.remove("active");
    document.getElementById("menu-overlay")?.classList.remove("active");
  }
});

// =========================
// FILTER PRODUCTS (SHOP)
// =========================
function filterProducts(category, btn) {
  const buttons = document.querySelectorAll(".filter-bar button");
  buttons.forEach(b => b.classList.remove("active"));

  if (btn) btn.classList.add("active");

  if (category === "all") {
    renderProducts(products);
    return;
  }

  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);
}



// =========================
// RENDER CART (CART PAGE)
// =========================
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!container || typeof getCart !== "function") return;

  const cart = getCart();

  // EMPTY CART
  if (!cart.length) {
    container.innerHTML = `
      <p>Your cart is empty</p>
      <a href="shop.html" class="btn">Continue Shopping</a>
    `;
    if (totalEl) totalEl.innerHTML = "";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    return;
  }

  // SHOW CHECKOUT
  if (checkoutBtn) checkoutBtn.style.display = "block";

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    return `
  <div class="cart-item">

    <img src="${item.images[0]}" alt="${item.name}" class="cart-img">

    <div class="cart-details">
      <div class="cart-top">
        <h4>${item.name}</h4>
        <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
      </div>

      <p class="cart-meta">Size: ${item.size}</p>
      <p class="cart-price">₦${item.price}</p>

      <div class="cart-bottom">
        <div class="qty-box">
          <button onclick="updateQty(${index}, ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${index}, ${item.qty + 1})">+</button>
        </div>

        <p class="item-total">₦${itemTotal}</p>
      </div>
    </div>

  </div>
`;
    
  }).join("");

  if (totalEl) {
    totalEl.innerHTML = `Total: ₦${total}`;
  }

  // CHECKOUT ACTION
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      const freshCart = getCart(); // ✅ always get latest data

      if (!freshCart.length) {
        alert("Your cart is empty");
        return;
      }

      sendWhatsApp(buildCartMessage(freshCart));
    };
  }
}
// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  startSlider();

  // SHOP PAGE
  if (document.getElementById("products")) {
    renderProducts();
  }

  // INDEX PAGE
  if (document.getElementById("latest-products")) {
    renderLatestProducts();
  }

  // PRODUCT PAGE
  if (document.getElementById("product-detail")) {
    renderProductDetail();
  }

  // CART PAGE ✅
  if (document.getElementById("cart-items") && typeof renderCart === "function") {
    renderCart();
  }

  // FADE-IN (safe check)
  if (typeof observer !== "undefined") {
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
  }

  // CART COUNT
  if (typeof getCart === "function") {
    updateCartCount();
  }
});