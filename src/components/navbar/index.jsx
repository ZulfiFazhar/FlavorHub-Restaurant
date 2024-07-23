"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import MenuItems from "./MenuItems.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Semua", path: "/menu" },
    { name: "Makanan", path: "/menu" },
    { name: "Minuman", path: "/menu" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit tetx-black">ACME</p>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="end">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <MenuItems path={item.path} name={item.name} />
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <MenuItems path={item.path} name={item.name} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
