import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "@shared/schema";
import RestaurantCard from "@/components/restaurant-card";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-100/5 to-background">
      <div className="container py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
            Restaurants
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose from our selection of finest restaurants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {restaurants?.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}