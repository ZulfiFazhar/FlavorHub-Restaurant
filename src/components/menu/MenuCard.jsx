import React from "react";
import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";

const MenuCard = ({ item }) => {
  return (
    <Card className="py-4 w-fit" key={item.id}>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`/menu/${
            item.foto ? item.foto : "placeholder/menu-foto-placeholder.jpg"
          }`}
          width={250}
          height={250}
        />
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{item.nama_masakan}</h4>
        <p className="text-tiny uppercase font-bold">{item.kategori}</p>
        <small className="text-default-500">Rp.{item.harga}</small>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
