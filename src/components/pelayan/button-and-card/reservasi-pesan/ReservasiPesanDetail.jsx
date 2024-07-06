"use client"

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


function ReservasiPesanDetail({respesModal, setRespesModal}) {

  const supabase = createClientComponentClient()
  
  const handleClickCustomerDone = async (nomor_meja) => {
    // Update reservasi pesanan
    const {dataRespes, errorRespes} = await supabase
    .from('reservasi_pesanan')
    .update({status:'kosong',nama_pemesan:null,pesanan:null})
    .eq('nomor_meja', respesModal.nomor_meja)

    if(errorRespes){
        return console.log(errorRespes)
    }else{
        console.log(dataRespes)
        setRespesModal(rm => ({...rm, status:'kosong', nama_pemesan:null, pesanan:null}
        ))
    }

    const {data, error} = await supabase
      .from('pesanan')
      .update({status:'selesai'})
      .eq('nomor_meja', respesModal.nomor_meja)
      .neq('status', 'selesai')
      .neq('status', 'sudah dibayar');
      
      if(error){
        console.log(error)
      }else{
        console.log(data)
      }
  }

  console.log(respesModal)

  return (
    <div className='mx-4 p-2 flex flex-col items-center w-1/2 border border-black rounded-md orange-custom'>
      <div className='text-7xl mt-3 mb-5'>
        {respesModal.nomor_meja}
      </div>

      <div className='border bg-white border-black rounded-md w-full py-1 px-3'>
        <span className='block text-sm mb-[-0.3rem]'>Pemesan</span>
        <span className='block text-xl'>{respesModal.nama_pemesan}</span>
      </div>

      <div className='border bg-white border-black rounded-md w-full py-1 px-3 mt-3 pb-4'>
        <span className='block text-sm'>Pesanan</span> 
        {
          respesModal.pesanan.map(psn => {
            return (
                <div key={psn.id} className='flex justify-between items-center border border-black rounded-md  px-2 bg-slate-100 mt-2'>
                  <div className='flex flex-col'>
                    <p>{psn.nama_masakan}</p>
                    <p>Rp. {psn.harga}</p>
                  </div>

                  <p>Jumlah : {psn.jumlah}</p>


                </div>

            )
          })
        }
      </div>

      {
        respesModal.status == 'diterima' &&
        <button className='border border-black rounded-md px-2 flex-none mt-auto bg-slate-100' onClick={handleClickCustomerDone}>Pelanggan telah selesai</button>
      }
    </div>
  )
}

export default ReservasiPesanDetail