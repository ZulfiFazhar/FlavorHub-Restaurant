"use client"

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


function ReservasiPesanDetail({respesModal, setRespesModal}) {

  const supabase = createClientComponentClient()
  
  const handleClickCustomerDone = async () => {
    const {data, error} = await supabase
      .from('reservasi_pesanan')
      .update({status:'kosong',nama_pemesan:null,pesanan:null})
      .eq('id', respesModal.id)

      if(error){
        console.log(error)
      }else{
        console.log(data)
        setRespesModal(rm => ({...rm, status:'kosong', nama_pemesan:null, pesanan:null}
        ))
      }
  }


  return (
    <div className='p-2 flex flex-col'>
      <div>
        {respesModal.nomor_meja}
      </div>
      <div>
        Pemesan : {respesModal.nama_pemesan}
      </div>
      <div>
        Pesanan : 
        <br />
        {
          respesModal.pesanan.map(psn => {
            return (
              <div key={Math.random()} className='mr-2'>
                + {psn.nama_masakan} - Jumlah : {psn.jumlah}
              </div>
            )
          })
        }
      </div>

      <button className='border border-black rounded-md px-2 mt-10' onClick={handleClickCustomerDone}>Pelanggan telah selesai</button>
    </div>
  )
}

export default ReservasiPesanDetail