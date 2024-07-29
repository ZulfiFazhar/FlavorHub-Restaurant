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
  }, [supabase]);

  const filterMenuByCategory = (category) => {
    return category === "Semua"
      ? menu
      : menu.filter((item) => item.kategori === category);
  };

  return (
    <div className="h-min-full bg-white text-black">
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-4/5 p-6">
          <section id="semua">
            <h1 className="ml-3 mb-3 text-2xl font-medium">Semua</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {filterMenuByCategory("Semua").map((item) => (
                <MenuCard item={item} key={item.id} />
              ))}
            </div>
          </section>

          <section id="makanan">
            <h1 className="ml-3 mb-3 text-2xl font-medium">Makanan</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {filterMenuByCategory("Makanan").map((item) => (
                <MenuCard item={item} key={item.id} />
              ))}
            </div>
          </section>

          <section id="minuman">
            <h1 className="ml-3 mb-3 text-2xl font-medium">Minuman</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {filterMenuByCategory("Minuman").map((item) => (
                <MenuCard item={item} key={item.id} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
