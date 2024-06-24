// Use the client directive for using usePathname hook.
'use client'

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import "./globals.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";


export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();
    if(pathname == "/login"){
        return (<>{children}</>)
    }else{
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
};