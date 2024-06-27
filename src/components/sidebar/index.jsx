"use client"

import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Local components
import LogoutButton from "../auth/LogoutButton";
import { usePekerjaanContext } from "@/app/resto/providers";

const Sidebar = ({ children }) => {
  const pekerjaan = usePekerjaanContext()
  const pathname = usePathname();

  let fixedMenu = []
  switch(pekerjaan){
    case "pelayan":
      fixedMenu = [
        { name: "Reservasi", path: "/resto", icon: "mdi:cog" },
        { name: "Pesanan", path: "/resto/pesanan", icon: "mdi:account-group" },
      ];
      break;
    case "koki":
      fixedMenu = [
        { name: "Pesanan", path: "/resto", icon: "mdi:cog" },
        { name: "Menu", path: "/resto/menu", icon: "mdi:account-group" },
      ];
      break;
    case "kasir":
      fixedMenu = [
        { name: "Pembayaran", path: "/resto", icon: "mdi:cog" },
        { name: "Histori", path: "/resto/histori", icon: "mdi:account-group" },
        { name: "Laporan", path: "/resto/laporan", icon: "mdi:mail" }
      ];
      break;
  }

  return (
    <div className="flex">
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        <aside className="sidebar px-2 bg-gradient-to-tr from-blue-500 to-purple-600 sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <section className="sidebar-title items-center p-4 justify-center my-3">
            <Image
              src="/next.svg"
              alt="NEXT Logo"
              width={190}
              height={37}
              priority
            />
          </section>
          <section className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <ul className="flex flex-col gap-4 text-white">
                  {fixedMenu.map((item, index) => (
                    <li key={index}>
                      <Link href={item.path}>
                        <div
                          className={`menu-item ${
                            pathname === item.path ? "bg-slate-900/15 py-4" : ""
                          }`}
                        >
                          <Icon icon={item.icon} fontSize={24} />
                          <span className="font-medium text-base ml-2">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}

                  <LogoutButton />

                </ul>
              </section>
            </nav>
          </section>
        </aside>
      </div>
      <div className="flex w-full flex-col">
        <div className="w-fit">
          <label
            htmlFor="sidebar-mobile-fixed"
            className="btn-primary btn sm:hidden"
          >
            Open Sidebar
          </label>
        </div>
        <div className="flex flex-col bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
