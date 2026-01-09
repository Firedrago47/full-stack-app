import { Package } from "lucide-react";

interface Props {
  text: string;
}

export default function EmptyState({ text }: Props) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center">
              <Package className="h-10 w-10 text-muted-foreground" />

      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
