"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type Location = Database["public"]["Tables"]["location"]["Row"];
type Locations = Location[];

export default function Locations() {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<Locations | []>([]);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    async function loadLocations() {
      setIsLoading(true);

      const { data } = await supabase.from("location").select();

      setIsLoading(false);
      setLocations(data || []);
    }

    loadLocations();
  }, []);

  useEffect(() => {
    const locationsEvents = supabase
      .channel("custom-insert-channel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "location" }, (payload) => {
        setLocations((value: any) => {
          return [...value, ...[payload.new]];
        });
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "location" }, (payload) => {
        setLocations((value: any) => {
          return value?.map((item: Location) => {
            if (item.id === payload.new.id) {
              return payload.new as Location;
            }
            return item;
          });
        });
      })
      .subscribe();
    return () => {
      locationsEvents.unsubscribe();
    };
  }, []);

  if (!isLoading && ((locations && locations.length <= 0) || !locations)) {
    return <p>Locations not found.</p>;
  }

  return (
    <ul className='flex space-x-6'>
      {isLoading && <p>loading...</p>}
      {locations &&
        locations?.length >= 1 &&
        locations?.map((item) => (
          <li key={item.id}>
            <Button variant={"outline"}>{item.address}</Button>
          </li>
        ))}
    </ul>
  );
}
