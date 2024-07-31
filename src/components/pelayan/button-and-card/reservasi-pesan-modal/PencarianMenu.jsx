import React from "react";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";

function PencarianMenu({
  menu,
  setMenuDipesan,
  menuHasilPencarian,
  setMenuHasilPencarian,
  searchInputRef,
}) {
  function handleTypeSearchMenu(e) {
    const input = e.target.value.toLowerCase();
    if (input == "") {
      setMenuHasilPencarian((mhp) => []);
      return;
    }

    const filteredMenu = menu?.filter((item) =>
      item.nama_masakan.toLowerCase().includes(input)
    );
    setMenuHasilPencarian((mhp) => filteredMenu);
  }

  const handleClickDeleteSearchInput = () => {
    if (searchInputRef.current) searchInputRef.current.value = "";
    setMenuHasilPencarian((mhp) => []);
  };

  const handleClickSelectMenu = (item) => {
    const itemFormatted = {
      ...item,
      id: Math.random(),
      opsiDipilih: "",
      catatan: "",
      jumlah: 1,
    };
    setMenuDipesan((md) => [...md, itemFormatted]);
    setMenuHasilPencarian((mhp) => []);
    if (searchInputRef.current) searchInputRef.current.value = "";
  };
  return (
    <div className=" w-full">
      <div className="flex">
        <Input
          isClearable
          id="carimenu"
          onChange={(e) => handleTypeSearchMenu(e)}
          ref={searchInputRef}
          type="text"
          label="Menu"
          placeholder="Cari Menu"
          labelPlacement="outside"
          variant="bordered"
          radius="full"
          size="lg"
        />
        {/* <input
          id="carimenu"
          className="px-2 rounded-md border border-black w-full"
          onChange={(e) => handleTypeSearchMenu(e)}
          ref={searchInputRef}
          autoComplete="off"
        ></input> */}
        {/* <button
          className="text-red-700 text-md absolute right-10"
          onClick={handleClickDeleteSearchInput}
        >
          x
        </button> */}
      </div>

      {menuHasilPencarian.length != 0 ? (
        <div className="border-medium border-default-400/35 p-2 mt-2 absolute w-[14rem] bg-white rounded-lg">
          {menuHasilPencarian.map((item) => {
            return (
              <Listbox key={item.id} variant="faded">
                <ListboxItem onClick={() => handleClickSelectMenu(item)}>
                  {item.nama_masakan}
                </ListboxItem>
              </Listbox>
            );
          })}
        </div>
      ) : (
        searchInputRef.current?.value != "" && (
          <p className="text-red-700 text-tiny">Menu tidak ditemukan</p>
        )
      )}
    </div>
  );
}

export default PencarianMenu;
