"use client";

import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";

function ReservasiPesanDetail({ respesModal, setRespesModal }) {
  const supabase = createClientComponentClient();

  const handleClickCustomerDone = async (nomor_meja) => {
    // Update reservasi pesanan
    const { dataRespes, errorRespes } = await supabase
      .from("reservasi_pesanan")
      .update({ status: "kosong", nama_pemesan: null, pesanan: null })
      .eq("nomor_meja", respesModal.nomor_meja);

    if (errorRespes) {
      return console.log(errorRespes);
    } else {
      console.log(dataRespes);
      setRespesModal((rm) => ({
        ...rm,
        status: "kosong",
        nama_pemesan: null,
        pesanan: null,
      }));
    }

    const { data, error } = await supabase
      .from("pesanan")
      .update({ status: "selesai" })
      .eq("nomor_meja", respesModal.nomor_meja)
      .neq("status", "selesai")
      .neq("status", "sudah dibayar");

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  // console.log(respesModal)

  return (
    <div className="animate-in slide-in-from-top mx-4 p-2 flex flex-col items-center w-1/2 drop-shadow-md rounded-lg bg-white">
      <div className="text-7xl mt-3 mb-5">{respesModal.nomor_meja}</div>

      <Input
        isReadOnly
        type="text"
        label="Pemesan"
        placeholder={respesModal.nama_pemesan}
        labelPlacement="outside"
        variant="bordered"
        radius="full"
        size="lg"
        className="px-3"
      />
      {/* <div className="border-medium bg-white border-default-400/40 rounded-full w-full py-1 px-4">
        <span className="block text-sm mb-[-0.3rem]">Pemesan</span>
        <span className="block text-xl">{respesModal.nama_pemesan}</span>
      </div> */}

      <div className="w-full py-1 px-3 mt-3 pb-4">
        <p className="block text-sm">Pesanan</p>
        {respesModal.pesanan.map((psn) => {
          return (
            // <Listbox key={psn.id} variant="faded">
            //   <ListboxItem description={psn.opsi} endContent={psn.jumlah}>
            //     {psn.nama_masakan}
            //   </ListboxItem>
            // </Listbox>
            <div
              key={psn.id}
              className="flex justify-between items-center border-medium border-default-400/40 rounded-full py-1 px-4 mt-3"
            >
              <div className="flex flex-col px-1">
                <p>
                  {psn.nama_masakan}{" "}
                  {psn.opsi && <span className="text-sm">({psn.opsi})</span>}
                </p>
                <p>Rp. {psn.harga}</p>
              </div>

              <p className="px-1">Jumlah : {psn.jumlah}</p>
            </div>
          );
        })}
      </div>

      {respesModal.status == "diterima" && (
        <button
          className="border border-black rounded-md px-2 flex-none mt-auto bg-slate-100"
          onClick={handleClickCustomerDone}
        >
          Pelanggan telah selesai
        </button>
      )}
    </div>
  );
}

export default ReservasiPesanDetail;
