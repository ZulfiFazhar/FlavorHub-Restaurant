"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Image,
  Link,
} from "@nextui-org/react";
import MenuItems from "./MenuItems.jsx";
import { SearchIcon } from "./SearchIcon.jsx";

export default function App({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { name: "Makanan", path: "#makanan" },
    { name: "Minuman", path: "#minuman" },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="#top">
            <Image
              src="/logo_black.svg"
              alt="FlavorHub log0"
              width={50}
              height={50}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <MenuItems path={item.path} name={item.name} />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="sm:flex gap-6" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20",
          }}
          placeholder="Cari Menu"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </NavbarContent>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />

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
