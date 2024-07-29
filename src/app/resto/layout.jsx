// import "./globals.css";
import Providers from "./providers";
import { Motion } from "@/components/transition/motion";

export const metadata = {
  title: "Pak Resto UNIKOM",
  description: "Harga kaki lima, kualitas bintang lima",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="text-black">
        <Providers>
          <Motion>{children}</Motion>
        </Providers>
      </div>
    </>
  );
}
