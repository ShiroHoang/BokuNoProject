const CART_KEY = "cart";

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

const notifyCartChange = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product) => {
  let cart = getCart();

  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyCartChange();
};

export const removeFromCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartChange();
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  notifyCartChange();
};