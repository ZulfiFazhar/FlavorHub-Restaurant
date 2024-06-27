import { Inter } from "next/font/google";
// import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pak Resto UNIKOM",
  description: "Harga kaki lima, kualitas bintang lima",
};

export default function RootLayout({ children }) {
  return (
        <>
            <NextTopLoader
                color="#6859f0"
                initialPosition={0.08}
                crawlSpeed={200}
                height={4}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
            />
            <div className='text-black'>
                <Providers>{children}</Providers>
            </div>
        </>
  );
}
