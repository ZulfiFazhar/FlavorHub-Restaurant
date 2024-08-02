"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "@/components/navbar";
import MenuCard from "@/components/menu/MenuCard";
import LoadingSkeleton from "@/components/menu/LoadingSkeleton";
import { Divider, Image, Button, Link } from "@nextui-org/react";
import { ImSpoonKnife } from "react-icons/im";

function Page() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDataMenu = async () => {
      const { data, error } = await supabase.from("menu").select("*");

      if (error) {
        return;
      } else {
        setMenu(data);
        setFilteredMenu(data);
        setLoading(false);
      }
    };

    fetchDataMenu();
  }, [supabase]);

  const filterMenuByCategory = (category) => {
    return filteredMenu.filter((item) => item.kategori === category);
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredMenu(menu);
    } else {
      const filtered = menu.filter(
        (item) =>
          item.nama_masakan &&
          item.nama_masakan.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenu(filtered);
    }
  };

  return (
    <div id="top" className="h-max bg-white text-black">
      <Navbar onSearch={handleSearch} />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center px-20 py-10">
          <section
            id="hero"
            className="w-full sm:w-11/12 p-6 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="w-full sm:w-3/4">
              <h1 className="text-4xl font-bold mb-4">
                Nikmati cita rasa autentik yang memanjakan lidah
              </h1>
              <p className="text-lg">
                Temukan berbagai pilihan makanan dan minuman yang kami tawarkan.
              </p>
              <Link href="#makanan">
                <Button
                  className="mt-10"
                  radius="full"
                  variant="ghost"
                  startContent={<ImSpoonKnife />}
                >
                  Explore
                </Button>
              </Link>
            </div>
            <div className="w-full sm:w-3/4 flex justify-center mt-10 sm:mt-0">
              <Image src="./makanan.svg" alt="logo" />
            </div>
          </section>
        </div>
        <div className="w-11/12 sm:w-4/5 p-6">
          <section id="makanan">
            <h1 className="text-left my-4 text-2xl font-medium">Makanan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))
                : filterMenuByCategory("Makanan").map((item) => (
                    <MenuCard item={item} key={item.id} />
                  ))}
            </div>
          </section>
          <Divider className="my-5" />
          <section id="minuman">
            <h1 className="text-left mb-4 text-2xl font-medium">Minuman</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))
                : filterMenuByCategory("Minuman").map((item) => (
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
