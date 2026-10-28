/* Aarvika Living — static frontend demo. No backend, checkout or payment processing. */
"use strict";

const PRODUCTS = [
  { id: 1, name: "Woven Storage Basket", category: "Storage", price: 349, description: "A versatile basket for everyday organization.", tag: "Everyday pick", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=80", alt: "Woven storage basket in a neutral home setting" },
  { id: 2, name: "Ceramic Serve Bowl", category: "Kitchen", price: 299, description: "A simple serving piece for daily meals.", tag: "Kitchen", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80", alt: "Minimal ceramic serving bowl" },
  { id: 3, name: "Decor Accent Vase", category: "Household", price: 499, description: "A subtle decorative accent for a shelf or table.", tag: "Home edit", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80", alt: "Decorative vase on a neutral surface" },
  { id: 4, name: "Gold-Tone Hoop Earrings", category: "Jewellery", price: 249, description: "An easy-to-style accessory for everyday outfits.", tag: "Style pick", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80", alt: "Gold-tone fashion earrings displayed on a neutral surface" },
  { id: 5, name: "Organizing Storage Box", category: "Storage", price: 199, description: "Keep small household items neatly together.", tag: "Useful find", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80", alt: "Organized home interior with storage and decor" },
  { id: 6, name: "Layered Fashion Necklace", category: "Jewellery", price: 599, description: "A layered look for casual and occasion wear.", tag: "Occasion", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80", alt: "Delicate gold-tone fashion necklace" },
  { id: 7, name: "Kitchen Utility Set", category: "Kitchen", price: 399, description: "Practical sample essentials for kitchen routines.", tag: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80", alt: "Bright organized kitchen with everyday essentials" },
  { id: 8, name: "Classic Bangle Set", category: "Jewellery", price: 449, description: "A versatile imitation jewellery set for celebrations.", tag: "Style pick", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80", alt: "Gold-tone jewellery accessories" },
  { id: 9, name: "Soft Cushion Cover", category: "Household", price: 279, description: "A simple way to refresh a living room corner.", tag: "Home edit", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80", alt: "Soft neutral furnishings in a living room" },
  { id: 10, name: "Everyday Pendant Set", category: "Jewellery", price: 699, description: "A decorative pendant-style accessory set.", tag: "Occasion", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80", alt: "Gold-tone pendant jewellery on a neutral background" },
  { id: 11, name: "Home Organizer Tray", category: "Storage", price: 229, description: "Keep small essentials together and easy to find.", tag: "Useful find", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=80", alt: "Home organization items on shelves" },
  { id: 12, name: "Daily Use Mug", category: "Kitchen", price: 179, description: "A minimal sample mug for tea and coffee breaks.", tag: "Kitchen", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80", alt: "Ceramic mug on a table" }
];

const CART_STORAGE_KEY = "aarvikaLivingCartV1";
const state = { category: "All", search: "", sort: "featured", cart: loadCart() };
const productGrid = document.getElementById("productGrid");
const resultsMessage = document.getElementById("resultsMessage");
const noResults = document.getElementById("noResults");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const toast = document.getElementById("toast");
let toastTimer = null;
let previousFocus = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(value);
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) =>
      item && Number.isInteger(item.id) && Number.isInteger(item.quantity) &&
      item.quantity > 0 && PRODUCTS.some((product) => product.id === item.id)
    ).map((item) => ({ id: item.id, quantity: Math.min(item.quantity, 99) }));
  } catch (error) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  } catch (error) {
    showToast("Cart could not be saved in this browser session.");
  }
}

function filteredProducts() {
  let items = PRODUCTS.filter((product) => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const term = state.search.trim().toLowerCase();
    const matchesSearch = !term || [product.name, product.category, product.description, product.tag]
      .some((field) => field.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });
  if (state.sort === "low-high") items.sort((a, b) => a.price - b.price);
  if (state.sort === "high-low") items.sort((a, b) => b.price - a.price);
  if (state.sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

function renderProducts() {
  const items = filteredProducts();
  productGrid.innerHTML = items.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.alt)}" loading="lazy" width="700" height="805">
        <span class="product-tag">${escapeHTML(product.tag)}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${escapeHTML(product.category)}</span>
        <h3>${escapeHTML(product.name)}</h3>
        <p class="product-description">${escapeHTML(product.description)}</p>
        <div class="product-bottom">
          <span class="product-price">${formatINR(product.price)}</span>
          <button class="add-cart" type="button" data-add="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart">+ Add to bag</button>
        </div>
      </div>
    </article>
  `).join("");
  noResults.hidden = items.length > 0;
  productGrid.hidden = items.length === 0;
  const categoryLabel = state.category === "All" ? "all categories" : state.category;
  resultsMessage.textContent = `Showing ${items.length} sample product${items.length === 1 ? "" : "s"} in ${categoryLabel}${state.search.trim() ? ` matching “${state.search.trim()}”` : ""}.`;
}

function setCategory(category) {
  state.category = category;
  document.querySelectorAll(".filter-pill").forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderProducts();
}

function addToCart(id) {
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) return;
  const current = state.cart.find((item) => item.id === id);
  if (current) current.quantity = Math.min(current.quantity + 1, 99);
  else state.cart.push({ id, quantity: 1 });
  saveCart();
  renderCart();
  showToast(`${product.name} added to your bag.`);
}

function changeQuantity(id, delta) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  else item.quantity = Math.min(item.quantity, 99);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
  showToast("Item removed from your bag.");
}

function cartDetails() {
  return state.cart.map((item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id);
    return product ? { ...product, quantity: item.quantity, lineTotal: product.price * item.quantity } : null;
  }).filter(Boolean);
}

function renderCart() {
  const items = cartDetails();
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  document.getElementById("cartCount").textContent = String(count);
  document.getElementById("drawerItemCount").textContent = `(${count})`;
  document.getElementById("cartSubtotal").textContent = formatINR(subtotal);
  document.getElementById("cartTotal").textContent = formatINR(subtotal);
  document.getElementById("cartEmpty").hidden = items.length > 0;
  document.getElementById("cartFooter").hidden = items.length === 0;
  cartItems.innerHTML = items.map((item) => `
    <article class="cart-item">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" width="76" height="86">
      <div>
        <h3>${escapeHTML(item.name)}</h3>
        <span class="cart-item-category">${escapeHTML(item.category)}</span>
        <div class="cart-item-price">${formatINR(item.price)}</div>
        <div class="quantity-controls" aria-label="Quantity for ${escapeHTML(item.name)}">
          <button type="button" data-quantity="${item.id}" data-delta="-1" aria-label="Decrease quantity of ${escapeHTML(item.name)}">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity="${item.id}" data-delta="1" aria-label="Increase quantity of ${escapeHTML(item.name)}">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" data-remove="${item.id}" aria-label="Remove ${escapeHTML(item.name)}">Remove</button>
    </article>
  `).join("");
}

function openCart() {
  previousFocus = document.activeElement;
  cartBackdrop.hidden = false;
  cartDrawer.inert = false;
  cartDrawer.setAttribute("aria-hidden", "false");
  cartDrawer.classList.add("is-open");
  document.body.classList.add("cart-open");
  document.getElementById("closeCart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartDrawer.inert = true;
  cartBackdrop.hidden = true;
  document.body.classList.remove("cart-open");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function setFormMessage(element, message, type) {
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) element.classList.add(type);
}

function validateForm(form) {
  let valid = true;
  const fields = Array.from(form.querySelectorAll("input[required], textarea[required]"));
  fields.forEach((field) => {
    const fieldValid = field.checkValidity() && field.value.trim().length > 0;
    field.setAttribute("aria-invalid", String(!fieldValid));
    if (!fieldValid) valid = false;
  });
  const invalid = fields.find((field) => field.getAttribute("aria-invalid") === "true");
  if (invalid) invalid.focus();
  return valid;
}

document.getElementById("siteSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});
document.querySelectorAll(".filter-pill").forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.filter));
});
document.getElementById("sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});
productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});
document.querySelectorAll("[data-category-link]").forEach((link) => {
  link.addEventListener("click", () => setCategory(link.dataset.categoryLink));
});
document.getElementById("resetFilters").addEventListener("click", () => {
  state.search = "";
  document.getElementById("siteSearch").value = "";
  document.getElementById("sortSelect").value = "featured";
  state.sort = "featured";
  setCategory("All");
});
document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("continueShopping").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(Number(quantityButton.dataset.quantity), Number(quantityButton.dataset.delta));
  if (removeButton) removeFromCart(Number(removeButton.dataset.remove));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
  if (event.key === "Tab" && cartDrawer.classList.contains("is-open")) {
    const focusable = Array.from(cartDrawer.querySelectorAll("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])"))
      .filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});
primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  primaryNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}));

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("contactMessageStatus");
  if (!validateForm(form)) {
    setFormMessage(status, "Please complete every required field with valid information.", "error");
    return;
  }
  /* Honest demo behaviour: no network request is made and the message is not stored. */
  setFormMessage(status, "Frontend demo: your form passed validation, but no message was sent. Connect a secure backend to receive enquiries.", "success");
  form.reset();
  form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
});

document.getElementById("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = document.getElementById("newsletterEmail");
  const status = document.getElementById("newsletterMessage");
  if (!email.checkValidity() || !email.value.trim()) {
    email.setAttribute("aria-invalid", "true");
    setFormMessage(status, "Enter a valid email address to test the signup form.", "error");
    email.focus();
    return;
  }
  email.removeAttribute("aria-invalid");
  setFormMessage(status, "Demo only: validation passed, but you have not been subscribed and no email was sent.", "success");
  form.reset();
});

document.getElementById("enquireCart").addEventListener("click", () => {
  closeCart();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  showToast("Please use the contact form to enquire. The cart is not sent with your message.");
});
document.getElementById("currentYear").textContent = String(new Date().getFullYear());

renderProducts();
renderCart();
