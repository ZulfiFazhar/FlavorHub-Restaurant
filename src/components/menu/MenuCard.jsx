import React from "react";
import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";

const MenuCard = ({ item }) => {
  return (
    <Card className="py-4 w-fit" key={item.id}>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl"
          src={`/menu/${
            item.foto ? item.foto : "placeholder/menu-foto-placeholder.jpg"
          }`}
          width={250}
          height={250}
        />
      </CardBody>
      <CardFooter className="pt-2 px-4 flex-col items-start gap-2">
        <h4 className="font-bold text-large">{item.nama_masakan}</h4>
        <small className="text-default-500 capitalize">{item.deskripsi}</small>
        <p className="text-tiny font-bold">Rp.{item.harga}</p>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
