"use client";

import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Local components
import LogoutButton from "../auth/LogoutButton";
import { usePekerjaanContext } from "@/app/resto/providers";

const Sidebar = ({ children }) => {
  const pekerjaan = usePekerjaanContext();
  const pathname = usePathname();

  let fixedMenu = [];
  switch (pekerjaan) {
    case "pelayan":
      fixedMenu = [
        {
          name: "Reservasi",
          path: "/resto/pelayan",
          icon: "mdi:local-restaurant",
        },
        {
          name: "Pesanan",
          path: "/resto/pelayan/pesanan",
          icon: "mdi:format-list-bulleted",
        },
      ];
      break;
    case "koki":
      fixedMenu = [
        { name: "Pesanan", path: "/resto/koki", icon: "mdi:local-restaurant" },
        { name: "Menu", path: "/resto/koki/menu", icon: "mdi:food-outline" },
      ];
      break;
    case "kasir":
      fixedMenu = [
        { name: "Pembayaran", path: "/resto/kasir", icon: "mdi:payment-clock" },
        {
          name: "Histori",
          path: "/resto/kasir/histori",
          icon: "mdi:clipboard-text-history-outline",
        },
        {
          name: "Laporan",
          path: "/resto/kasir/laporan",
          icon: "mdi:report-line",
        },
      ];
      break;
    case "manajer":
      fixedMenu = [
        { name: "Dashboard", path: "/resto/manajer", icon: "mdi:report-line" },
        {
          name: "Keuangan",
          path: "/resto/manajer/keuangan",
          icon: "mdi:clipboard-text-history-outline",
        },
        { name: "Menu", path: "/resto/manajer/menu", icon: "mdi:food-outline" },
        {
          name: "Karyawan",
          path: "/resto/manajer/karyawan",
          icon: "mdi:account-group-outline",
        },
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
        <aside className="sidebar px-2 bg-emerald-700 sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <section className="sidebar-title items-center p-4 justify-center my-3">
            <Image
              src="/logo.svg"
              alt="FlavorHub log0"
              width={120}
              height={120}
              priority
            />
          </section>
          <div className="text-4xl font-bold mx-auto text-white">
            <span className="text-white">FlavorHub</span>
          </div>
          {/* <div className="mx-auto text-white">Pelayan</div> */}
          <section className="sidebar-content">
            <nav className="menu rounded-md h-full">
              <section className="menu-section px-4 h-full">
                <ul className="flex flex-col h-full gap-4 text-white">
                  {fixedMenu.map((item, index) => (
                    <li key={index}>
                      <Link href={item.path}>
                        <div
                          className={`menu-item hover:bg-slate-100/10 py-4 ${
                            pathname === item.path ? "bg-slate-100/15" : ""
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
