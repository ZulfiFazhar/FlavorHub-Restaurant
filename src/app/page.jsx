"use client"

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePekerjaanContext } from "./providers";


export default function Home() {
  const pekerjaan = usePekerjaanContext()

  let content;
  switch (pekerjaan) {
    case "pelayan":
      content = "Halaman pelayan"
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-black">{content}</h1>
    </main>
  );
}
