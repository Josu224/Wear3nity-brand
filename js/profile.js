// =========================
// INIT (LOAD EVERYTHING)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // PROFILE PAGE FIELDS
  const nameEl = document.getElementById("user-name");
  const emailEl = document.getElementById("user-email");
  const phoneEl = document.getElementById("user-phone");
  const avatarEl = document.getElementById("avatar-img");

  if (nameEl) nameEl.value = user.name || "";
  if (emailEl) emailEl.value = user.email || "";
  if (phoneEl) phoneEl.value = user.phone || "";
  if (avatarEl && user.avatar) avatarEl.src = user.avatar;

  // CHECKOUT FORM AUTO-FILL
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");

  if (nameInput) nameInput.value = user.name || "";
  if (phoneInput) phoneInput.value = user.phone || "";
  if (addressInput) addressInput.value = user.address || "";
});


// =========================
// SAVE PROFILE (ACCOUNT PAGE)
// =========================
function saveProfile() {
  const existing = JSON.parse(localStorage.getItem("user")) || {};

  const name = document.getElementById("user-name")?.value;
  const email = document.getElementById("user-email")?.value;
  const phone = document.getElementById("user-phone")?.value;
  const avatar = document.getElementById("avatar-img")?.src;

  const user = {
    ...existing, // 🔥 keeps address
    name,
    email,
    phone,
    avatar
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Profile saved ✅");
}


// =========================
// SAVE USER INFO (CHECKOUT FORM)
// =========================
function saveUserInfo() {
  const existing = JSON.parse(localStorage.getItem("user")) || {};

  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();

  const user = {
    ...existing, // 🔥 keeps email + avatar
    name,
    phone,
    address
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Profile saved ✅");
}


// =========================
// CHANGE AVATAR
// =========================
function changeAvatar() {
  const input = document.getElementById("avatar-input");
  if (!input) return;

  input.click();

  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = e => {
      document.getElementById("avatar-img").src = e.target.result;
    };

    reader.readAsDataURL(file);
  };
}


// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem("user");
  location.reload();
}