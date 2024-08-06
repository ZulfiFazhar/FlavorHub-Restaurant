"use client";

import React, { useState, useEffect } from "react";

// Local components
import MejaButton from "./button-and-card/MejaButton";
import ReservasiPesanModal from "./button-and-card/ReservasiPesanModal";

// lib
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function ReservasiPelayan() {
  const [reservasiPesanan, setReservasiPesanan] = useState(null);
  // Respes = Reservasi dan pesan
  const [respesModal, setRespesModal] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getReservasiPesananData = async () => {
      const { data, error } = await supabase
        .from("reservasi_pesanan")
        .select("*");

      if (error) {
        console.log("error");
      } else {
        setReservasiPesanan(data);
      }
    };

    getReservasiPesananData();
  }, [supabase]);

  // Subcribe to reservasi pesanan
  useEffect(() => {
    const subscribeToReservasiPesanan = supabase
      .channel("reservasi-pesanan-subscribe")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reservasi_pesanan",
        },
        (payload) => {
          if (payload.eventType == "UPDATE") {
            setReservasiPesanan((prevRespes) => {
              return prevRespes.map((rp) =>
                rp.id === payload.new.id ? payload.new : rp
              );
            });
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscribeToReservasiPesanan.unsubscribe();
    };
  }, [supabase]);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("id-ID");

  const sortedReservasiPesanan =  reservasiPesanan?.slice().sort((a, b) => {
    // Compare the first character
    const charA = a.nomor_meja[0];
    const charB = b.nomor_meja[0];
  
    if (charA === charB) {
      // If the first character is the same, compare the number part
      const numA = parseInt(a.nomor_meja.slice(1), 10);
      const numB = parseInt(b.nomor_meja.slice(1), 10);
      return numA - numB;
    } else {
      // If the first character is different, sort by character
      return charA.localeCompare(charB);
    }
  });

  return (
    <div className="w-full min-h-screen max-h-screen py-10 bg-emerald-100/80 flex">
      <div className="animate-in slide-in-from-top w-6/12 bg-white overflow-auto rounded-md drop-shadow-md ml-4">
        <div className="flex justify-between items-center w-5/6 border-b border-black mx-auto px-2 py-1 mt-3">
          <h1 className="text-2xl">Reservasi</h1>
          <span>{formattedDate}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 py-4">
          {sortedReservasiPesanan?.map((rp) => {
            return (
              <MejaButton
                key={rp.id}
                respesModal={respesModal}
                setRespesModal={setRespesModal}
                properti={rp}
              />
            );
          })}
        </div>
      </div>
      <ReservasiPesanModal
        respesModal={respesModal}
        setRespesModal={setRespesModal}
      />
    </div>
  );
}

export default ReservasiPelayan;
