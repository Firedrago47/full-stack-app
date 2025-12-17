"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ShopStatusCard() {
  const [online, setOnline] = useState(true);

  return (
    <Card className="p-2 border">
      <CardHeader>
        <h3 className="text-xl font-semibold">Shop Status</h3>
        <p className="text-sm text-muted-foreground">
          Customers can place orders only when your shop is online.
        </p>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <span className="font-medium">
          {online ? "Online" : "Offline"}
        </span>

        <Switch checked={online} onCheckedChange={setOnline} />
      </CardContent>
    </Card>
  );
}
