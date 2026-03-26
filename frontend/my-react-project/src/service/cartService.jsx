const CART_KEY = "cart";

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
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
};

export const removeFromCart = (id) => {
  let cart = getCart().filter(p => p.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};