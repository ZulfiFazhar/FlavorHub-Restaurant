import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";

function PesananCards({ pesanan, supabase, setPesanan }) {
  const handleClickUpdateStatus = async (id, nomor_meja, newStatus) => {
    const { data, error } = await supabase
      .from("pesanan")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      return console.log(error);
    } else {
      console.log(data);
    }

    // Update reservasi pesanan
    const { dataRespes, errorRespes } = await supabase
      .from("reservasi_pesanan")
      .update({ status: newStatus })
      .eq("nomor_meja", nomor_meja);

    if (errorRespes) {
      return console.log(errorRespes);
    } else {
      console.log(dataRespes);
    }
  };

  return (
    <div className="p-5 min-h-screen bg-emerald-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pesanan.map((psn) => {
          return (
            <Card key={psn.id} className="max-w-[300px]">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={60}
                  radius="sm"
                  src="/logo_black.svg"
                  width={60}
                />
                <div className="flex flex-col">
                  <p className="text-lg">
                    Meja <span className="font-bold">{psn.nomor_meja}</span>
                  </p>
                  <p className="text-lg text-default-500">{psn.nama_pemesan}</p>
                </div>
              </CardHeader>
              <CardBody>
                <ul>
                  {psn.pesanan.map((ps) => {
                    return (
                      <li
                        key={Math.random()}
                        className="flex justify-between items-center border-b-2 border-default"
                      >
                        <span className="m-2">{ps.nama_masakan}</span>

                        {ps.opsi != false && (
                          <span className="m-2 text-sm">{ps.opsi}</span>
                        )}

                        <span className="m-2">{ps.jumlah}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardBody>
              <CardFooter className="flex justify-center items-center">
                {psn.status == "dipesan" && (
                  <Button
                    radius="full"
                    color="success"
                    variant="ghost"
                    onClick={() =>
                      handleClickUpdateStatus(psn.id, psn.nomor_meja, "dimasak")
                    }
                  >
                    Masak
                  </Button>
                )}
                {psn.status == "dimasak" && (
                  <Button
                    radius="full"
                    color="warning"
                    variant="ghost"
                    onClick={() =>
                      handleClickUpdateStatus(psn.id, psn.nomor_meja, "diantar")
                    }
                  >
                    Siap Diantar
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}

        {pesanan.length < 1 && (
          <p className="text-3xl text-red-500">Tidak ada pesanan</p>
        )}
      </div>
    </div>
  );
}

export default PesananCards;
