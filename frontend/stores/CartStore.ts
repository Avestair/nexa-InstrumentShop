// store/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "../types/CartItem";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartActions {
  addToCart: (item: Omit<CartItem, "quantity">) => void; // item without quantity, quantity handled by store
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  updateItemDetails: (
    id: number,
    updatedDetails: Partial<Omit<CartItem, "id" | "quantity">>,
  ) => void;
  // You might add checkout related actions later
  // checkout: () => void;
}

// Combine state and actions into a single type for the store
type CartStore = CartState & CartActions;

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            // If item already exists, update its quantity
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
            return {
              items: updatedItems,
              ...calculateTotals(updatedItems),
            };
          } else {
            // If item is new, add it with quantity 1
            const newItems = [...state.items, { ...product, quantity: 1 }];
            return {
              items: newItems,
              ...calculateTotals(newItems),
            };
          }
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            ...calculateTotals(updatedItems),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // If quantity is 0 or less, remove the item
            return {
              items: state.items.filter((item) => item.id !== id),
              ...calculateTotals(state.items.filter((item) => item.id !== id)),
            };
          } else {
            // Otherwise, update the quantity
            const updatedItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity: quantity } : item,
            );
            return {
              items: updatedItems,
              ...calculateTotals(updatedItems),
            };
          }
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      updateItemDetails: (id, updatedDetails) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id == id ? { ...item, ...updatedDetails } : item,
          ),
        }));
      },
    }),
    {
      name: "nexa-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
