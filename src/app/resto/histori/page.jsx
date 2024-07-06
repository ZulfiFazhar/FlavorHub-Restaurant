"use client"

import React, {useEffect, useState} from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function page() {
  const [pesanan, setPesanan] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPesananData = async () => {
      const {data, error} = await supabase
        .from('pesanan')
        .select('*')
        .eq('status', 'sudah dibayar')

      if(error){
        return console.log(error)
      }else{
        console.log(data)
        setPesanan(p => data)
      }
    }

    fetchPesananData()
  }, [])

  console.log(pesanan)

  return (
    <div className='min-h-screen  w-full'>
      <div className='w-full border-b' >
        <div className=' flex justify-stretch bg-orange-200'>
          <div className='w-1/6 text-center border-t border-l border-black'>No</div>
          <div className='w-1/6 text-center border-t border-x border-black'>Tanggal</div>
          <div className='w-1/6 text-center border-t border-x border-black'>Nama</div>
          <div className='w-1/6 text-center border-t border-x border-black'>Nomor Meja</div>
          <div className='w-1/6 text-center border-t border-x border-black'>Pesanan</div>
          <div className='w-1/6 text-center border-t border-r border-black'>Total Bayar</div>
        </div>

        {pesanan.map((psn, i) => {
          const date = new Date(psn.created_at)
          return (
            <div key={psn.id} className='flex justify-stretch bg-orange-200'>
              <div className=' w-1/6 text-center border-t border-l border-black'>{i+1}</div>
              <div className=' w-1/6 text-center border-t border-x border-black'>{date.toLocaleDateString('id-ID')}</div>
              <div className=' w-1/6 text-center border-t border-x border-black'>{psn.nama_pemesan}</div>
              <div className=' w-1/6 text-center border-t border-x border-black'>{psn.nomor_meja}</div>
              <div className=' w-1/6 text-center border-t border-x border-black break-words'>{JSON.stringify(psn.pesanan)}</div>
              <div className=' w-1/6 text-center border-t border-r border-black'>{psn.total_harga}</div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default page