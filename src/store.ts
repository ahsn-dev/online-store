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
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== itemId),
    }));
  },
}));

export default useCartStore;
