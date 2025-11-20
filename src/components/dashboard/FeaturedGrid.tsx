import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";


const promos = [
    { id: 1, title: "20% off fresh veggies", subtitle: "Today only", image: "/images/promo-veg.jpg" },
    { id: 2, title: "Free delivery over ₹499", subtitle: "All shops", image: "/images/promo-delivery.jpg" },
    { id: 3, title: "Flat 30% at SushiPlace", subtitle: "Use code SUSHI30", image: "/images/promo-food.jpg" },
];


export default function FeaturedGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promos.map((p) => (
                <Card key={p.id} className="overflow-hidden">
                    <div className="relative h-44 w-full">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <CardContent>
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{p.title}</h3>
                                <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                            </div>
                            <Badge>Hot</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

