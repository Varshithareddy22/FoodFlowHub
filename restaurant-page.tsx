import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Restaurant, MenuItem } from "@shared/schema";
import MenuItemCard from "@/components/menu-item-card";
import { Loader2 } from "lucide-react";

export default function RestaurantPage() {
  const [, params] = useRoute("/restaurants/:id");
  const restaurantId = parseInt(params?.id || "0");

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery<Restaurant>({
    queryKey: ["/api/restaurants", restaurantId],
  });

  const { data: menuItems, isLoading: isLoadingMenu } = useQuery<MenuItem[]>({
    queryKey: ["/api/restaurants", restaurantId, "menu"],
  });

  if (isLoadingRestaurant || isLoadingMenu) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <div className="h-[300px] relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="text-lg mt-2 text-muted-foreground">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems?.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
