import { create } from "zustand";

// Define the shape of the cart item
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Define the shape of the cart store
export interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

// Create the cart store
const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }
    });
  },
  removeFromCart: (itemId) => {
    set((state) => {
      const itemIndex = state.cartItems.findIndex((i) => i.id === itemId);
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        if (item.quantity === 1) {
          // Remove the item from the cart if there is only one
          return {
            cartItems: state.cartItems.filter(
              (i, index) => index !== itemIndex
            ),
          };
        } else {
          // Decrease the quantity by one if there are multiple items
          return {
            cartItems: state.cartItems.map((i, index) =>
              index === itemIndex ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }
      }
      return state; // Return the current state if the item was not found
    });
  },
}));

export default useCartStore;
