import React from "react";
import { Card, CardFooter, CardBody, Skeleton } from "@nextui-org/react";

const MenuCardSkeleton = () => {
  return (
    <Card className="py-4 w-full">
      <CardBody className="overflow-visible py-2">
        <Skeleton className="rounded-xl w-full h-28" />
      </CardBody>
      <CardFooter className="pt-2 px-4 flex-col items-start gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  );
};

export default MenuCardSkeleton;
