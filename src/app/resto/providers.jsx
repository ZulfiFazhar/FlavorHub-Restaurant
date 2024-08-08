"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Sidebar from "@/components/sidebar";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import { Motion } from "@/components/transition/motion";
import InitLoading from "@/components/initialization/index";

import "react-toastify/dist/ReactToastify.css";

const PekerjaanContext = createContext();

export default function Providers({ children }) {
  const [pekerjaan, setPekerjaan] = useState();
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function setPekerjaanData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setPekerjaan(user.user_metadata.pekerjaan);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }

    setPekerjaanData();
  }, [supabase.auth]);

  return (
    <NextUIProvider>
      <PekerjaanContext.Provider value={pekerjaan}>
        {loading ? (
          <InitLoading />
        ) : (
          <Sidebar>
            <Motion>{children}</Motion>
          </Sidebar>
        )}
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
