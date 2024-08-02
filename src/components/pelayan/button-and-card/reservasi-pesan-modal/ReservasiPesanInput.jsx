import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState, useRef } from "react";
import { Input, Button } from "@nextui-org/react";

// Local library
import {
  resetInterfaceState,
  handleClickPesan,
} from "../../library/reservasiPesan";

// Local components
import MenuDipilihCards from "./MenuDipilihCards";
import PencarianMenu from "./PencarianMenu";

function ReservasiPesanInput({ respesModal, setRespesModal }) {
  const [menu, setMenu] = useState(null);
  const [menuDipesan, setMenuDipesan] = useState([]);
  const [menuHasilPencarian, setMenuHasilPencarian] = useState([]);
  const searchInputRef = useRef(null);
  const namaInputRef = useRef(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    resetInterfaceState(
      setMenuDipesan,
      setMenuHasilPencarian,
      searchInputRef,
      namaInputRef
    );
  }, [respesModal]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("menu").select("*");

      if (error) console.log(error);
      if (data) setMenu(data);
    };

    fetchMenu();
  }, [supabase]);

  const handleClickPsn = () => {
    handleClickPesan(
      namaInputRef,
      searchInputRef,
      menuDipesan,
      setMenuDipesan,
      setMenuHasilPencarian,
      respesModal,
      setRespesModal,
      supabase
    );
  };

  const handleClickCancel = () => {
    setRespesModal((rm) => false);
  };

  return (
    <div className="animate-in slide-in-from-top duration-900 w-1/2 flex flex-col items-center mx-4 drop-shadow-md bg-emerald-500 rounded-lg py-2 px-4 bg-white">
      <div className="self-start">Reservasi</div>

      <h2 className=" text-7xl mb-5">{respesModal.nomor_meja}</h2>

      <div className="flex flex-col w-full mb-5">
        <Input
          ref={namaInputRef}
          id="pemesan"
          type="text"
          label="Pemesan"
          placeholder="Nama Pemesan"
          labelPlacement="outside"
          variant="bordered"
          radius="full"
          size="lg"
        />
      </div>

      <PencarianMenu
        menu={menu}
        setMenuDipesan={setMenuDipesan}
        menuHasilPencarian={menuHasilPencarian}
        setMenuHasilPencarian={setMenuHasilPencarian}
        searchInputRef={searchInputRef}
      />

      <MenuDipilihCards
        menuDipesan={menuDipesan}
        setMenuDipesan={setMenuDipesan}
      />

      <div className="flex justify-between w-5/6 flex-none mt-auto mb-auto">
        <Button
          radius="full"
          color="danger"
          variant="ghost"
          onClick={handleClickCancel}
        >
          Cancel
        </Button>
        <Button
          radius="full"
          color="success"
          variant="ghost"
          onClick={handleClickPsn}
        >
          Pesan
        </Button>
        {/* <button
          className="border border-black rounded-md bg-red-400 px-2 hover:bg-red-500"
          onClick={handleClickCancel}
        >
          Cancel
        </button>

        <button
          className="border border-black rounded-md bg-green-400 px-2 hover:bg-green-500"
          onClick={handleClickPsn}
        >
          Pesan
        </button> */}
      </div>
    </div>
  );
}

export default ReservasiPesanInput;
