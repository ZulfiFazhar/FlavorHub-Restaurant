"use client"

import React from "react";
import { usePekerjaanContext } from "./providers";

// Local components
import ReservasiPelayan from "@/components/pelayan/ReservasiPelayan";

export default function Home() {
  const pekerjaan = usePekerjaanContext()

  let content;
  switch (pekerjaan) {
    case "pelayan":
      content = <ReservasiPelayan />
      break;
    case "koki":
      content = "Halaman Koki"
      break;
    case "kasir":
      content = "Halaman kasir"
      break;
    default:
      content = "Selamat datang"
      break;
  }

  return (
    <>
        {content}
    </>
  );
}
