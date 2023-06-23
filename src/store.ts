// import { create } from "zustand";

// // Define the shape of the cart item
// export interface CartItem {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// // Define the shape of the cart store
// export interface CartStore {
//   cartItems: CartItem[];
//   totalPrice: number;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (itemId: string) => void;
// }

// // Create the cart store
// const useCartStore = create<CartStore>((set) => ({
//   cartItems: [],
//   totalPrice: 0,
//   addToCart: (item) => {
//     set((state) => {
//       const existingItem = state.cartItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return {
//           cartItems: state.cartItems.map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//           ),
//           totalPrice: state.totalPrice + item.price,
//         };
//       } else {
//         return {
//           cartItems: [...state.cartItems, { ...item, quantity: 1 }],
//           totalPrice: state.totalPrice + item.price,
//         };
//       }
//     });
//   },
//   removeFromCart: (itemId) => {
//     set((state) => {
//       const itemIndex = state.cartItems.findIndex((i) => i.id === itemId);
//       if (itemIndex !== -1) {
//         const item = state.cartItems[itemIndex];
//         if (item.quantity === 1) {
//           // Remove the item from the cart if there is only one
//           return {
//             cartItems: state.cartItems.filter(
//               (i, index) => index !== itemIndex
//             ),
//             totalPrice: state.totalPrice - item.price,
//           };
//         } else {
//           // Decrease the quantity by one if there are multiple items
//           return {
//             cartItems: state.cartItems.map((i, index) =>
//               index === itemIndex ? { ...i, quantity: i.quantity - 1 } : i
//             ),
//             totalPrice: state.totalPrice - item.price,
//           };
//         }
//       }
//       return state; // Return the current state if the item was not found
//     });
//   },
// }));

// export default useCartStore;

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
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

// Load the cart items from local storage, if available
function loadCartItemsFromLocalStorage(): CartItem[] {
  const serializedCartItems =
    JSON.parse(localStorage.getItem("cartItems") as string) || [];
  return serializedCartItems;
}

// Create the cart store
const useCartStore = create<CartStore>((set) => {
  const initialCartItems = loadCartItemsFromLocalStorage();
  const initialTotalPrice = initialCartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return {
    cartItems: initialCartItems,
    totalPrice: initialTotalPrice,
    addToCart: (item) => {
      set((state) => {
        const existingItem = state.cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            totalPrice: state.totalPrice + item.price,
          };
        } else {
          return {
            cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            totalPrice: state.totalPrice + item.price,
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
              totalPrice: state.totalPrice - item.price,
            };
          } else {
            // Decrease the quantity by one if there are multiple items
            return {
              cartItems: state.cartItems.map((i, index) =>
                index === itemIndex ? { ...i, quantity: i.quantity - 1 } : i
              ),
              totalPrice: state.totalPrice - item.price,
            };
          }
        }
        return state; // Return the current state if the item was not found
      });
    },
  };
});

// Save the cart items to local storage whenever they change
useCartStore.subscribe((state: CartStore) => {
  try {
    const serializedCartItems = JSON.stringify(state.cartItems);
    localStorage.setItem("cartItems", serializedCartItems);
  } catch (error) {
    console.error(error);
  }
});

export default useCartStore;
