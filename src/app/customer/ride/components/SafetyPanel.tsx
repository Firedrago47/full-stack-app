import { Button } from "@/components/ui/button";
import { PhoneCall, Shield } from "lucide-react";

export function SafetyPanel() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline">
        <PhoneCall className="mr-2 h-4 w-4" /> Emergency
      </Button>
      <Button variant="outline">
        <Shield className="mr-2 h-4 w-4" /> Share Trip
      </Button>
    </div>
  );
}
