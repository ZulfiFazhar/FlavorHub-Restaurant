"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import KaryawanCard from "./KaryawanCard";
import DetailKaryawan from "./DetailKaryawan";
import TambahUbahKaryawan from "./TambahUbahKaryawan";

function Page() {
  const [karyawan, setKaryawan] = useState(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState({
    action: "tambah",
  });
  const [refetch, setRefetch] = useState(false);
  const [cariKaryawan, setCariKaryawan] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDataKaryawan = async () => {
      const { data, error } = await supabase.from("karyawan").select("*");

      if (error) {
        return alert("Error fetch data : ", error);
      } else {
        setKaryawan((k) => data);
      }
    };

    fetchDataKaryawan();
  }, [refetch, supabase]);

  let filteredKaryawan =
    karyawan?.filter((kr) => {
      return kr.nama.toLowerCase().includes(cariKaryawan.toLowerCase());
    }) || [];

  const karyawanKoki = filteredKaryawan?.filter((kyn) => kyn.jabatan == "Koki");
  const karyawanPelayan = filteredKaryawan?.filter(
    (kyn) => kyn.jabatan == "Pelayan"
  );
  const karyawanKasir = filteredKaryawan?.filter(
    (kyn) => kyn.jabatan == "Kasir"
  );

  return (
    <div className="px-10 py-8 h-screen max-h-screen ">
      <div className="flex w-4/5 items-center *:mr-16 mb-7">
        <h1 className="text-4xl text-green-custom font-bold mb-1">Karyawan</h1>

        <div className="flex ml-3">
          <input
            className="bg-slate-200 rounded-md px-2 text-sm py-1"
            placeholder="Cari nama karyawan"
            autoComplete="off"
            value={cariKaryawan}
            onChange={(e) => setCariKaryawan((ck) => e.target.value)}
          />

          <button
            className={`ml-1 rounded-xl bg-red-400 text-white px-2 hover:bg-red-600 pb-[0.1rem] ${
              cariKaryawan == "" && "bg-white hover:bg-white cursor-default"
            }`}
            onClick={() => setCariKaryawan((cm) => "")}
          >
            x
          </button>
        </div>

        <button
          className="text-center py-1 px-2 w-56 bg-orange-400 hover:bg-orange-500  transition ease-out rounded-md text-white"
          onClick={() => setSelectedKaryawan((kyn) => ({ action: "tambah" }))}
        >
          + Tambah Karyawan
        </button>
      </div>

      <div className="mt-3 h-90p flex">
        <div className="w-2/3 pr-5">
          <div className="w-full p-5 rounded-md h-full pr-4 bg-slate-100 overflow-auto ">
            <div className="flex flex-col">
              <h1 className="text-xl mb-1">Pelayan</h1>
              {karyawanPelayan?.map((kyn) => (
                <KaryawanCard
                  key={kyn.id}
                  karyawan={kyn}
                  setSelectedKaryawan={setSelectedKaryawan}
                />
              ))}
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl mb-1">Koki</h1>
              {karyawanKoki?.map((kyn) => (
                <KaryawanCard
                  key={kyn.id}
                  karyawan={kyn}
                  setSelectedKaryawan={setSelectedKaryawan}
                />
              ))}
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl mb-1">Kasir</h1>
              {karyawanKasir?.map((kyn) => (
                <KaryawanCard
                  key={kyn.id}
                  karyawan={kyn}
                  setSelectedKaryawan={setSelectedKaryawan}
                />
              ))}
            </div>
          </div>
        </div>

        {selectedKaryawan &&
          (selectedKaryawan.action == "detail" ? (
            <DetailKaryawan
              karyawan={selectedKaryawan}
              setSelectedKaryawan={setSelectedKaryawan}
            />
          ) : (
            <TambahUbahKaryawan
              karyawan={selectedKaryawan}
              setSelectedKaryawan={setSelectedKaryawan}
              setRefetch={setRefetch}
            />
          ))}
      </div>
    </div>
  );
}

export default Page;
