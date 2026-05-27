// products.js - with colour‑switching data for shop page

const products = [
  {
    id: 1,
    name: "WEAR3NITY Polo",
    price: 15000,
    category: "shirts",
    images: ["assets/images/IMG_2647.jpg", "assets/images/IMG_2645.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    colorImages: {
      "Black": "assets/images/IMG_2647.jpg",
      "White": "assets/images/IMG_2645.jpg"
    }
  },
  {
    id: 2,
    name: "Retro Jersey",
    price: 18000,
    category: "shirts",
    images: ["assets/images/front.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: { "Black": "assets/images/front.jpg" }
  },
  {
    id: 3,
    name: "Acid-Wash Tee",
    price: 17000,
    category: "shirts",
    images: ["assets/images/IMG_2500.jpg", "assets/images/prod2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black"],
    colorImages: {
      "Brown": "assets/images/IMG_2500.jpg",
      "Black": "assets/images/prod2.jpg"
    }
  },
  {
    id: 4,
    name: "Sleeveless",
    price: 20000,
    category: "shirts",
    images: ["assets/images/sleeveless.jpg", "assets/images/IMG_1423.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    colorImages: {
      "Black": "assets/images/sleeveless.jpg",
      "Charcoal": "assets/images/IMG_1423.jpg"
    }
  },
  {
    id: 5,
    name: "Classic White Tee",
    price: 16000,
    category: "shirts",
    images: ["assets/images/prod4.jpg", "assets/images/prod9.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Cream"],
    colorImages: {
      "White": "assets/images/prod4.jpg",
      "Cream": "assets/images/prod9.jpg"
    }
  },
  {
    id: 6,
    name: "Girls Special Tee",
    price: 14000,
    category: "girl",
    images: ["assets/images/girl2.jpg", "assets/images/girl1.jpg", "assets/images/girl3.jpg"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Black", "White"],
    colorImages: {
      "Pink": "assets/images/girl2.jpg",
      "Black": "assets/images/girl1.jpg",
      "White": "assets/images/girl3.jpg"
    }
  },
  {
    id: 7,
    name: "Hoodie",
    price: 19000,
    category: "hoodies",
    images: ["assets/images/IMG_0757.jpg", "assets/images/IMG_0801.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Beige"],
    colorImages: {
      "Brown": "assets/images/IMG_0757.jpg",
      "Beige": "assets/images/IMG_0801.jpg"
    }
  },
  {
    id: 8,
    name: "Casual Everyday Shirt",
    price: 13000,
    category: "shirts",
    images: ["assets/images/new2.jpg", "assets/images/new.jpg", "assets/images/new3.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "BlackWhite", "Beige"],
    colorImages: {
      "Black": "assets/images/new2.jpg",
      "BlackWhite": "assets/images/new.jpg",
      "Beige": "assets/images/new3.jpg"
    }
  },
  {
    id: 9,
    name: "Black Essential Hoodie",
    price: 25000,
    category: "hoodies",
    images: ["assets/images/IMG_0802.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: { "Black": "assets/images/IMG_0802.jpg" }
  },
  {
    id: 10,
    name: "WEAR3NITY Joggers",
    price: 22000,
    category: "joggers",
    images: ["assets/images/joggers.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: { "Black": "assets/images/joggers.jpg" }
  },
  {
    id: 11,
    name: "WEAR3NITY Cap",
    price: 18000,
    category: "cap",
    images: ["assets/images/cap.jpg"],
    sizes: ["One size"],
    colors: ["Black"],
    colorImages: { "Black": "assets/images/cap.jpg" }
  }
];

// Helper to generate a single product card with colour‑switching data
function generateProductCard(product) {
  // Build colour dropdown options
  let colorOptions = '';
  product.colors.forEach(color => {
    colorOptions += `<option value="${color}">${color}</option>`;
  });

  // Build size dropdown options
  let sizeOptions = '';
  product.sizes.forEach(size => {
    const selected = (size === 'M' || (size === 'One size' && product.sizes.length === 1)) ? 'selected' : '';
    sizeOptions += `<option value="${size}" ${selected}>${size}</option>`;
  });

  // Convert colourImages object to JSON string (safe for HTML)
  const colorImagesJson = JSON.stringify(product.colorImages).replace(/"/g, '&quot;');

  // Default image (first one from the list)
  const defaultImage = product.images[0];

  return `
    <div class="card" data-id="${product.id}" data-color-images='${colorImagesJson}'>
      <img src="${defaultImage}" alt="${product.name}" class="product-main-image" />
      <h3>${product.name}</h3>
      <p class="price">₦${product.price.toLocaleString()}</p>
      <div class="variant-group">
        <label>Color:</label>
        <select class="product-color" title="Select color">
          ${colorOptions}
        </select>
      </div>
      <div class="variant-group">
        <label>Size:</label>
        <select class="product-size" title="Select size">
          ${sizeOptions}
        </select>
      </div>
      <div class="card-actions">
        <button class="btn small" onclick="addCartWithOptions(event, ${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        <button class="btn primary small" onclick="quickOrderWithOptions(event, ${product.id}, '${product.name}', ${product.price})">Order</button>
      </div>
    </div>
  `;
}

// Render all products on shop page
function renderAllProducts() {
  const container = document.getElementById('products');
  if (!container) return;
  let html = '';
  products.forEach(product => {
    html += generateProductCard(product);
  });
  container.innerHTML = html;
}

// Filter products by category
function filterProducts(category) {
  const container = document.getElementById('products');
  if (!container) return;
  let filtered = products;
  if (category !== 'all') {
    filtered = products.filter(p => p.category === category);
  }
  let html = '';
  filtered.forEach(product => {
    html += generateProductCard(product);
  });
  container.innerHTML = html;

  // Update active button style
  document.querySelectorAll('.filter-bar button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'All')) {
      btn.classList.add('active');
    }
  });

  // Re‑initialise colour‑switching after new cards are added
  if (typeof initColorSwitching === 'function') {
    initColorSwitching();
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  renderAllProducts();
  // The colour‑switching script in shop.html will run after a short delay
});