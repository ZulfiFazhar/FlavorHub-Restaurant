"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Page() {
  const [menu, setMenu] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDataMenu = async () => {
      const { data, error } = await supabase.from("menu").select("*");

      if (error) {
        return;
      } else {
        setMenu((m) => data);
      }
    };

    fetchDataMenu();
  });

  return (
    <div>
      {menu.map((mn) => {
        return (
          <div key={mn.id} className="mb-10">
            {JSON.stringify(mn)}
          </div>
        );
      })}
    </div>
  );
}

export default Page;
