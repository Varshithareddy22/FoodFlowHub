import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, LogOut } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartDrawer from "./cart-drawer";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <a className="font-bold text-2xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
            FOODIO
          </a>
        </Link>

        <div className="flex items-center ml-auto gap-4">
          {user && (
            <>
              <span className="text-sm text-muted-foreground">
                Welcome, {user.username}
              </span>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <CartDrawer />
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}