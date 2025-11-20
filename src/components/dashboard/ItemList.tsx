import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";


// Mock sample items — replace with real data from your API
const items = Array.from({ length: 9 }).map((_, i) => ({
    id: String(i + 1),
    name: ["Fresh Tomatoes", "Paneer Pack", "Veg Thali", "Sushi Box", "Ride to Airport"][i % 5],
    price: [99, 249, 199, 599, 450][i % 5],
    vendor: ["Green Farms", "DeliHouse", "CurrySpot", "SushiPlace", "QuickRides"][i % 5],
    image: `/images/items/item-${(i % 5) + 1}.jpg`,
}));


export default function ItemList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it) => (
                <Card key={it.id} className="flex flex-col">
                    <div className="relative h-44 w-full">
                        <Image src={it.image} alt={it.name} fill className="object-cover" />
                    </div>
                    <CardContent className="flex-1 flex flex-col justify-between">
                        <div>
                            <h4 className="font-semibold text-lg">{it.name}</h4>
                            <p className="text-sm text-muted-foreground">{it.vendor}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="text-lg font-bold">₹{it.price}</div>
                            <div className="flex items-center gap-2">
                                <Button size="sm">Add</Button>
                                <Button variant="ghost" size="sm">Details</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}