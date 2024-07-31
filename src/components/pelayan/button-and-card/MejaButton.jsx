import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

function MejaButton({ respesModal, setRespesModal, properti }) {
  const handleClick = () => {
    setRespesModal((rm) => properti);
  };

  return (
    <div className="flex">
      <Card shadow="lg" isPressable onPress={handleClick}>
        <CardBody
          className={`bg-emerald-500 p-2 ${
            properti.status == "kosong" ? "" : "bg-red-500"
          }`}
        >
          <Image
            radius="lg"
            width="100%"
            alt={"Meja " + properti.nomor_meja}
            className="w-full h-[100px]"
            src="/round_table.svg"
          />
        </CardBody>
        <CardFooter
          className={`flex flex-col text-small justify-start items-start bg-emerald-50/50 ${
            properti.status == "kosong" ? "" : "bg-red-50/50"
          }`}
        >
          <b>{properti.nomor_meja}</b>
          <p className="text-default-500 capitalize">
            Status: <strong>{properti.status}</strong>
          </p>
          <p className={`text-default-500 capitalize`}>
            Pemesan: <strong>{properti.nama_pemesan}</strong>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MejaButton;
