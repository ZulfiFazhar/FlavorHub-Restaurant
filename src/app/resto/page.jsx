"use client"

import React from "react";
import { usePekerjaanContext } from "./providers";
import { useRouter } from "next/navigation";

export default function Home() {
  const pekerjaan = usePekerjaanContext()
  const router = useRouter()
  let content;
  switch (pekerjaan) {
    case "pelayan":
      router.push('/resto/pelayan')
      break;
    case "koki":
      router.push('/resto/koki')
      break;
    case "kasir":
      router.push('/resto/kasir')
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
