"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "@/components/navbar";
import MenuCard from "@/components/menu/MenuCard";

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
    <div className="h-min-full bg-white text-black">
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-4/5 p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {menu.map((item) => (
            <MenuCard item={item} key={item.id} />
          ))}
        </div>
      </div>

      {menu.map((menu) => {
        return (
          <div key={menu.id} className="mb-10">
            {JSON.stringify(menu)}
          </div>
        );
      })}
    </div>
  );
}

export default Page;
