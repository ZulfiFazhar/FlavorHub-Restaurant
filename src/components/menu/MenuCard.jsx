import React from "react";
import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";

const BlogCard = ({ item }) => {
  return (
    <Card className="py-4" key={item.id}>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
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

export default BlogCard;
