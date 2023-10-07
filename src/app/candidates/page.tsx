"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

// import type { Database } from "@/lib/database.types";

// type Todo = Database["public"]["Tables"]["todos"]["Row"];

export default function Page() {
  const [todos, setTodos] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("candidates").select();
      console.log(data)
    };

    getData();
  }, []);

  return todos ? <pre>{JSON.stringify(todos, null, 2)}</pre> : <p>Loading todos...</p>;
}
