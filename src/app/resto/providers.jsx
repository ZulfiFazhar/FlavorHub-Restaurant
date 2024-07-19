"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Sidebar from "@/components/sidebar";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PekerjaanContext = createContext();

export default function Providers({ children }) {
  const [pekerjaan, setPekerjaan] = useState();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function setPekerjaanData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setPekerjaan((rl) => user.user_metadata.pekerjaan);
    }

    setPekerjaanData();
  }, [supabase.auth]);

  return (
    <NextUIProvider>
      <PekerjaanContext.Provider value={pekerjaan}>
        <Sidebar>{children}</Sidebar>
      </PekerjaanContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </NextUIProvider>
  );
}

export const usePekerjaanContext = () => {
  return useContext(PekerjaanContext);
};
