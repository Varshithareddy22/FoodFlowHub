import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/orders", {
        restaurantId: items[0].menuItem.restaurantId,
        items: items.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity
        })),
        total
      });

      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and will be delivered soon!",
      });

      clearCart();
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.menuItem.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${(item.menuItem.price / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeItem(item.menuItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${(total / 100).toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Checkout"}
              </Button>
            </div>
          </SheetFooter>
        </>
      )}
    </SheetContent>
  );
}
