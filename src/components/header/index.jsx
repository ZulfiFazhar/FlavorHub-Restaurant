"use client";

import React from "react";
import { Avatar } from "@nextui-org/react";

export default function App({ judul }) {
  return (
    <div className="flex w-full justify-between px-10 py-5 border-b-2 drop-shadow sticky top-0 bg-white">
      <h1 className="font-medium text-base">{judul}</h1>
      <Avatar
        isBordered
        className="transition-transform"
        color="success"
        name="Jason Hughes"
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    </div>
  );
}
