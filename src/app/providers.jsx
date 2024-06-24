"use client";
import React from "react";
import Sidebar from "@/components/sidebar";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <Sidebar>{children}</Sidebar>
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
