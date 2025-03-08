import { createContext, useContext, ReactNode, useState } from "react";
import { CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.menuItem.id === newItem.menuItem.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.menuItem.id === newItem.menuItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      toast({
        title: "Added to cart",
        description: `${newItem.menuItem.name} added to your cart`,
      });

      return [...currentItems, newItem];
    });
  };

  const removeItem = (itemId: number) => {
    setItems((currentItems) => 
      currentItems.filter((item) => item.menuItem.id !== itemId)
    );
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
