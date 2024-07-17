"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/resto");
  }, [router]);

  return <div>Loading...</div>;
}

export default page;
