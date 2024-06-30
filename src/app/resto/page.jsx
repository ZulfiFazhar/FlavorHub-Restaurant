"use client"

import React from "react";
import { usePekerjaanContext } from "./providers";

// Local components
import ReservasiPelayan from "@/components/pelayan/ReservasiPelayan";
import PesananKoki from "@/components/koki/PesananKoki";

export default function Home() {
  const pekerjaan = usePekerjaanContext()
  let content;
  switch (pekerjaan) {
    case "pelayan":
      content = <ReservasiPelayan />
      break;
    case "koki":
      content = <PesananKoki />
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
