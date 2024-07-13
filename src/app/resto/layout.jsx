import { Inter } from "next/font/google";
// import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pak Resto UNIKOM",
  description: "Harga kaki lima, kualitas bintang lima",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="text-black">
        <Providers>{children}</Providers>
      </div>
    </>
  );
}
