"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShopStatusCard() {
  const [online, setOnline] = useState(true);

  return (
    <Card className="p-2 border">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Shop Status</h3>
        <Badge className="font-medium">
          {online ? "Online" : "Offline"}
        </Badge>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Customers can place orders only when your shop is online.
        </p>

        <Switch className="mr-2" checked={online} onCheckedChange={setOnline} />
      </CardContent>
    </Card>
  );
}
