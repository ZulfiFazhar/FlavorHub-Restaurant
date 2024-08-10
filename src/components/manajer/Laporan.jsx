"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Laporan() {
  const [pembayaran, setPembayaran] = useState(null);
  const [rentangWaktu, setRentangWaktu] = useState({
    from: getFormattedDate({ yearsBefore: 1 }),
    to: getFormattedDate(),
  });
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchPembayaranData = async () => {
      console.log(rentangWaktu);
      const { data, error } = await supabase
        .from("pembayaran")
        .select(
          `
                    *,
                    pesanan (*)`
        )
        .gte("created_at", rentangWaktu.from)
        .lte("created_at", rentangWaktu.to);

      if (error) {
        return alert("Error fetching data :", error);
      } else {
        setPembayaran((p) => data);
      }
    };

    fetchPembayaranData();
  }, [rentangWaktu, supabase]);

  function getFormattedDate({
    daysBefore = 0,
    monthsBefore = 0,
    yearsBefore = 0,
  } = {}) {
    const currentDate = new Date();

    const year = String(currentDate.getFullYear() - yearsBefore);
    const month = String(currentDate.getMonth() + 1 - monthsBefore).padStart(
      2,
      "0"
    );
    let day = String(currentDate.getDate() - daysBefore).padStart(2, "0");

    if ((monthsBefore != 0 || yearsBefore != 0) && (day == 31 || day == 30)) {
      day = day - 2;
    }

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <div className="min-h-screen h-screen max-h-screen px-10 py-10">
      <h1 className="text-green-custom text-4xl font-bold">Laporan Keuangan</h1>

      <div className="flex items-center mt-7">
        <p className="text-gray-400">Berdasarkan rentang waktu : </p>

        <input
          type="date"
          value={rentangWaktu.from}
          onChange={() =>
            setRentangWaktu((rw) => ({ ...rw, from: event.target.value }))
          }
          className="ml-3 px-1 border border-gray-400 rounded-md text-sm w-28"
        />

        <p className="ml-1 mr-1">-</p>

        <input
          type="date"
          value={rentangWaktu.to}
          onChange={() =>
            setRentangWaktu((rw) => ({ ...rw, to: event.target.value }))
          }
          className="px-1 border border-gray-400 rounded-md text-sm w-28"
        />
      </div>

      <div className="mt-10 h-77p">
        <div className="overflow-x-auto h-full overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 sticky top-0 bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3">
                  No
                </th>
                <th scope="col" className="px-3 py-3 min-w-28">
                  Tanggal
                </th>
                <th scope="col" className="px-3 py-3">
                  Nama
                </th>
                <th scope="col" className="px-3 py-3">
                  Pesanan
                </th>
                <th scope="col" className="px-3 py-3">
                  Total Pembayaran
                </th>
                <th scope="col" className="px-3 py-3">
                  Total Bayar
                </th>
                <th scope="col" className="px-3 py-3">
                  Jenis Pembayaran
                </th>
              </tr>
            </thead>
            <tbody>
              {pembayaran?.map((pby, i) => {
                return (
                  <tr
                    key={pby.id}
                    className={`${
                      i % 2 == 0 ? "bg-white" : "bg-slate-100"
                    } border-b`}
                  >
                    <td
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900"
                    >
                      {i + 1}
                    </td>
                    <td className="px-3 py-4">
                      {pby.created_at.split("T")[0]}
                    </td>
                    <td className="px-3 py-4">{pby.pesanan.nama_pemesan}</td>
                    <td className="pl-3 pr-1 py-4 whitespace-normal break-words max-w-40">
                      {pby.pesanan.pesanan.map((psn, i) => {
                        let formattedPsn = String(psn.nama_masakan);
                        if (pby.pesanan.pesanan.length - 1 > i) {
                          formattedPsn += ", ";
                        }
                        return formattedPsn;
                      })}
                    </td>
                    <td className="px-3 py-4">{pby.total_tagihan}</td>
                    <td className="px-3 py-4">{pby.total_bayar}</td>
                    <td className="px-3 py-4">{pby.jenis_pembayaran}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Laporan;
