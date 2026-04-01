// =========================
// SINGLE PRODUCT MESSAGE
// =========================
function buildWhatsAppMessage(product, size, quantity) {
  let message = `🛒 *NEW ORDER - WEAR3NITY*\n\n`;

  message += `*Product:* ${product.name}\n`;
  message += `*Size:* ${size}\n`;
  message += `*Quantity:* ${quantity}\n`;
  message += `*Price:* ₦${product.price}\n\n`;

  message += "Please confirm availability. Thank you 🙏";

  return message;
}

// =========================
// BUILD CART MESSAGE (WITH USER INFO)
// =========================
function buildCartMessage(cart) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  let message = `🛒 *NEW ORDER - WEAR3NITY*\n\n`;

  // 👤 CUSTOMER INFO
  message += `👤 *Customer Info*\n`;
  message += `Name: ${user.name || "Not provided"}\n`;
  message += `Phone: ${user.phone || "Not provided"}\n`;
  message += `Address: ${user.address || "Not provided"}\n\n`;

  message += "🧾 *Order Details*\n\n";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    message += `${index + 1}. *${item.name}*\n`;
    message += `   Size: ${item.size}\n`;
    message += `   Qty: ${item.qty}\n`;
    message += `   Subtotal: ₦${itemTotal}\n\n`;
  });

  message += "--------------------------\n";
  message += `💰 *TOTAL: ₦${total}*\n\n`;
  message += "Please confirm availability. Thank you 🙏";

  return message;
}

// =========================
// SEND TO WHATSAPP
// =========================
function sendWhatsApp(message) {
  const phone = "2347025776737";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}