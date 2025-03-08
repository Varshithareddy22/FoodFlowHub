import { MenuItem } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { Plus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          </div>
          <Badge variant="secondary">{item.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-semibold">
          ${(item.price / 100).toFixed(2)}
        </span>
        <Button
          size="sm"
          onClick={() => addItem({ menuItem: item, quantity: 1 })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
