import { Restaurant } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "wouter";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <a className="block">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-[16/9] relative">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
              <Badge variant="secondary">{restaurant.cuisine}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {restaurant.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
