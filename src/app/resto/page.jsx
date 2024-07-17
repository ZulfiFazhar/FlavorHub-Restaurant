"use client"

import React from "react";
import { usePekerjaanContext } from "./providers";
import { useRouter } from "next/navigation";

// Local components
import ReservasiPelayan from "@/components/pelayan/ReservasiPelayan";
import PesananKoki from "@/components/koki/PesananKoki";
import PembayaranKasir from "@/components/kasir/PembayaranKasir";
import Dashboard from "@/components/manajer/Dashboard";

export default function Home() {
  const pekerjaan = usePekerjaanContext()
  const router = useRouter()
  let content;
  switch (pekerjaan) {
    case "pelayan":
      content = <ReservasiPelayan />
      break;
    case "koki":
      content = <PesananKoki />
      break;
    case "kasir":
      content = <PembayaranKasir />
      break;
    case "manajer":
      router.push('/resto/manajer')
      break;
    default:
      content = <div className="h-screen text-3xl">Selamat datang</div>
      break;
  }

  return (
    <>
        {content}
    </>
  );
}
