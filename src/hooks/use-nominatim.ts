"use client";

import { useEffect, useState } from "react";

export interface PlaceSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export function useNominatim(query: string) {
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              q: query,
              format: "json",
              countrycodes: "in", 
              addressdetails: "1",
              limit: "8",
            }),
          {
            signal: controller.signal,
            headers: {
              // REQUIRED by Nominatim policy
              "User-Agent": "full-stack-app",
            },
          }
        );

        const data: PlaceSuggestion[] = await res.json();
        setResults(data);
      } catch {
        // ignore abort
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return { results, loading };
}
