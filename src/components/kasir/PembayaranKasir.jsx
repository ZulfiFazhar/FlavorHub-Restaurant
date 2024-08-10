"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Local components
import PilihPelanggan from "./button-and-card/PilihPelanggan";
import PembayaranCard from "./button-and-card/PembayaranCard";

function PembayaranKasir() {
  const [pesanan, setPesanan] = useState([]);
  const [curPelanggan, setCurPelanggan] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPesananData = async () => {
      const { data, error } = await supabase.from("pesanan").select("*");

      if (error) {
        return console.log(error);
      } else {
        setPesanan((p) => data.filter((dt) => dt.status == "selesai"));
      }
    };

    fetchPesananData();
  }, [supabase]);

  useEffect(() => {
    const subscribeToPesanan = supabase
      .channel("pembayaran-pesanan-subscribe")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pesanan",
        },
        (payload) => {
          if (payload.eventType == "UPDATE") {
            if (payload.new.status == "selesai") {
              setPesanan((psn) => {
                // Ensure no duplicates
                let filteredPesanan = psn.filter((p) => p.id != payload.new.id);
                return [...filteredPesanan, payload.new];
              });
            } else {
              setPesanan((psn) => {
                return psn.filter((p) => p.id != payload.new.id);
              });
            }
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscribeToPesanan.unsubscribe();
    };
  }, [supabase]);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen px-7 py-6">
      <h1 className="text-3xl text-green-custom font-bold">Pembayaran</h1>
      <div className="text-sm">{formattedDate}</div>

      <PilihPelanggan pesanan={pesanan} setCurPelanggan={setCurPelanggan} />

      {curPelanggan && (
        <PembayaranCard
          curPelanggan={curPelanggan}
          setCurPelanggan={setCurPelanggan}
          supabase={supabase}
        />
      )}
    </div>
  );
}

export default PembayaranKasir;
