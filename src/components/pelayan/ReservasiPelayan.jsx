"use client"

import React, {useState, useEffect} from 'react'

// Local components
import MejaButton from './button-and-card/MejaButton'
import ReservasiPesanModal from './button-and-card/ReservasiPesanModal'

// lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function ReservasiPelayan() {
const [reservasiPesanan, setReservasiPesanan] = useState(null)
// Respes = Reservasi dan pesan
const [respesModal, setRespesModal] = useState(false)

  useEffect(() => {
    const getReservasiPesananData = async () => {
      const supabase = createClientComponentClient()
      const {data, error} = await supabase.from('reservasi_pesanan').select('*')

      if(error){
        console.log("error")
      }else{
        setReservasiPesanan(data)
      }
    }

    getReservasiPesananData()

  }, [])

  // console.log(respesModal)
  return (
    <div className=' w-full min-h-screen bg-white flex'>
        <div className=' w-1/2 min-h-screen bg-slate-100  '>
            <h1>Reservasi</h1>

            <div className='flex flex-wrap *:m-1 justify-start'>
              {
                reservasiPesanan?.map(rp => {
                  return (
                    <MejaButton 
                        key={rp.id}
                        respesModal={respesModal} 
                        setRespesModal={setRespesModal}
                        properti={rp}
                    /> 
                  )
                })
              }
            </div>
            
        </div>
        
        <ReservasiPesanModal
            respesModal={respesModal}
            setRespesModal={setRespesModal}
        />

    </div>
  )
}

export default ReservasiPelayan