// "use client"

// import React, { useState, useEffect } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { usePekerjaanContext } from "./providers";


// export default function Home() {
//   const [reservasiPesanan, setReservasiPesanan] = useState()
//   const pekerjaan = usePekerjaanContext()

//   useEffect(() => {
//     const getReservasiPesananData = async () => {
//       const supabase = createClientComponentClient()
//       const {data, error} = await supabase.from('reservasi_pesanan').select('*')

//       if(error){
//         console.log("error")
//       }else{
//         setReservasiPesanan(data)
//       }
//     }


//     getReservasiPesananData()

//   }, [])


//   const DashboardPelayan = (
//     <div className=" text-sm pl-24">
//       {JSON.stringify(reservasiPesanan)}
//     </div>
//   )

//   let content;
//   switch (pekerjaan) {
//     case "pelayan":
//       content = DashboardPelayan
//       break;
//     case "koki":
//       content = "Halaman Koki"
//       break;
//     case "kasir":
//       content = "Halaman kasir"
//       break;
//     default:
//       content = "Selamat datang"
//       break;
//   }



//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1 className="text-4xl font-bold text-black">{content}</h1>
//     </main>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>Hello</div>
  )
}

// export default page
