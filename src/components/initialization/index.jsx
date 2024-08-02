"use client";

import { Image, Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="h-screen bg-white text-black flex justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/logo_black.svg"
          alt="FlavorHub logo"
          width={100}
          height={100}
        />
        <h1>Initializing</h1>
        <Spinner color="success" />
      </div>
    </div>
  );
}
