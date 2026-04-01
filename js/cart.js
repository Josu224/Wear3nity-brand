// =========================
// GET CART
// =========================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// =========================
// SAVE CART
// =========================
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =========================
// UPDATE QUANTITY
// =========================
function updateQty(index, newQty) {
  let cart = getCart();

  newQty = parseInt(newQty); // ✅ ensure number

  if (isNaN(newQty) || newQty < 1) return; // 🚫 safety check
  if (!cart[index]) return; // 🚫 prevent crash

  cart[index].qty = newQty;

  saveCart(cart);

  if (typeof renderCart === "function") renderCart();
  if (typeof updateCartCount === "function") updateCartCount();
}

// =========================
// REMOVE ITEM
// =========================
function removeFromCart(index) {
  let cart = getCart();

  if (!cart[index]) return; // 🚫 prevent crash

  cart.splice(index, 1);

  saveCart(cart);

  if (typeof renderCart === "function") renderCart();
  if (typeof updateCartCount === "function") updateCartCount();
  if (!freshCart.length) return; // 🚫 prevent empty message
}

// =========================
// BUILD CART MESSAGE (WITH USER)
// =========================
function buildCartMessage(cart) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  let message = "🛒 *NEW ORDER - WEAR3NITY*\n\n";

  // 👤 CUSTOMER INFO
  message += "*Customer Details*\n";
  message += `Name: ${user.name || "Not provided"}\n`;
  message += `Phone: ${user.phone || "Not provided"}\n`;
  message += `Address: ${user.address || "Not provided"}\n\n`;

  message += "--------------------------\n\n";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    message += `${index + 1}. *${item.name}*\n`;
    message += `   Size: ${item.size}\n`;
    message += `   Qty: ${item.qty}\n`;
    message += `   Price: ₦${item.price}\n`;
    message += `   Subtotal: ₦${itemTotal}\n\n`;
  });

  message += "--------------------------\n";
  message += `*TOTAL: ₦${total}*\n\n`;
  message += "Please confirm availability. Thank you 🙏";

  return encodeURIComponent(message);
}

// =========================
// SEND TO WHATSAPP
// =========================
function sendWhatsApp(message) {
  const phone = "2347025776737"; // your number (no +)
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}