import { Package } from "lucide-react";

interface Props {
  text: string;
}

export default function EmptyState({ text }: Props) {
  return (
    <div className="flex flex-row gap-6 bg-white justify-center border rounded-xl p-6 text-center">
      <Package className="text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
