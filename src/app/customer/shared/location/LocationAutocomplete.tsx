"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNominatim } from "@/hooks/use-nominatim";

interface Props {
  label: string;
  value: string; // selected address from parent
  onSelect: (place: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function LocationAutocomplete({
  label,
  value,
  onSelect,
}: Props) {
  const [input, setInput] = useState(value);
  const [open, setOpen] = useState(false);

  // Fetch suggestions based on what user types
  const { results } = useNominatim(input);

  // Sync local input when parent value changes (after selection/reset)
  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div className="relative space-y-2">
      <label className=" text-sm font-medium">{label}</label>

      <Input
        className="mt-1"
        value={input}
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => input && setOpen(true)}
      />

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md max-h-60 overflow-auto">
          {results.map((r) => (
            <button
              key={`${r.lat}-${r.lon}`}
              type="button"
              className="block w-full text-left px-3 py-2 text-sm hover:bg-muted"
              onClick={() => {
                onSelect({
                  address: r.display_name,
                  lat: Number(r.lat),
                  lng: Number(r.lon),
                });
                setInput(r.display_name);
                setOpen(false);
              }}
            >
              {r.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
