import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pak Resto UNIKOM",
  description: "Harga kaki lima, kualitas bintang lima",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className }>
          {children}
      </body>
    </html>
  );
}
