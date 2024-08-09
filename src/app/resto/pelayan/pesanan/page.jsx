"use client";

import React, { useEffect, useState } from "react";
import { usePekerjaanContext } from "@/app/resto/providers";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Local components
import PesananCard from "./PesananCard";

function PesananPelayan() {
  const [pesanan, setPesanan] = useState([]);
  const pekerjaan = usePekerjaanContext();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (pekerjaan !== "pelayan") {
      console.log("tes");
      router.push("/");
    }
  }, [pekerjaan, router]);

  // Fetch pesanan data
  useEffect(() => {
    const fetchPesananData = async () => {
      const { data, error } = await supabase.from("pesanan").select("*");

      if (error) console.log(error);
      if (data) {
        const undonePesanan = data.filter(
          (psn) => psn.status == "diantar" || psn.status == "diterima"
        );
        setPesanan((p) => undonePesanan);
      }
    };

    fetchPesananData();
  }, [supabase]);

  useEffect(() => {
    const subscribeToPesanan = supabase
      .channel("pesanan-subscribe")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pesanan",
        },
        (payload) => {
          // Update the state with new data depending on action
          if (payload.eventType == "UPDATE") {
            // Jika update-nya berupa status menjadi 'selesai'
            if (payload.new.status == "selesai") {
              setPesanan((prevPesanan) => {
                return prevPesanan.filter((psn) => psn.id != payload.new.id);
              });
            } else if (payload.new.status == "diantar") {
              setPesanan((prevPesanan) => {
                let newPesanan = [...prevPesanan];
                newPesanan.unshift(payload.new);
                return newPesanan;
              });
            } else if (payload.new.status == "diterima") {
              setPesanan((prevPesanan) => {
                return prevPesanan.map((psn) =>
                  psn.id == payload.new.id ? payload.new : psn
                );
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
  // console.log(pesanan)
  const pesananSiapDiantar = pesanan.filter((psn) => psn.status == "diantar");
  const pesananDiterima = pesanan.filter((psn) => psn.status == "diterima");

  return (
    <div className="p-4 min-h-screen bg-emerald-100/80">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pesananSiapDiantar.map((psn) => {
          return <PesananCard key={psn.id} psn={psn} supabase={supabase} />;
        })}
      </div>

      <div className="border rounded-lg p-4 bg-white drop-shadow-md my-4">
        Pesanan yang sudah diterima
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pesananDiterima.map((psn) => {
          return <PesananCard key={psn.id} psn={psn} supabase={supabase} />;
        })}
      </div>
    </div>
  );
}

export default PesananPelayan;
