"use client"

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function PembayaranKasir() {
    const [openPilihPelanggan, setOpenPilihPelanggan] = useState(false)
    const [pesanan, setPesanan] = useState([])
    const [curPelanggan, setCurPelanggan] = useState(false)
    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchPesananData = async () => {
            const {data,error} = await supabase
                .from('pesanan')
                .select('*')

            if(error){
                return console.log(error)
            }else{
                console.log(data)
                setPesanan(p => data)
            }
        }

        fetchPesananData()
    }, [])

    const handleClickPilihPelanggan = (selectedPesanan) => {
        setCurPelanggan(cp => selectedPesanan)
        setOpenPilihPelanggan(pp => false)
    }

    const date = new Date()
    const formattedDate = date.toLocaleDateString('id-ID')

  return (
    <div className='min-h-screen p-2'>
        <div className='border border-black px-2 rounded-md'>Tanggal : {formattedDate}</div>
        
        <div className='mt-2'>
            <div className='border border-black px-2 rounded-md flex justify-between max-w-60 hover:cursor-pointer' onClick={() => setOpenPilihPelanggan(pp => !pp)}>
                <span>Pilih nama pelanggan</span>
                <span>&darr;</span>
            </div>

            {openPilihPelanggan &&
                <div className={`absolute bg-white border border-black rounded-md px-2 max-w-60 mt-2 flex flex-col *:mb-2 pt-2`}>
                    {pesanan.map(psn => {
                        return (
                            <div key={psn.id} className='border border-black rounded-md px-2 hover:cursor-pointer' onClick={() => handleClickPilihPelanggan(psn)}>
                                {psn.nama_pemesan}
                            </div>
                        )
                    })}
                </div>
            }
        </div>

        {curPelanggan &&
            <div className='border border-black rounded-md p-2 mt-3 flex flex-col'>
                <div>
                    Nama : {curPelanggan.nama_pemesan}
                </div>

                <div>
                    No meja : {curPelanggan.nomor_meja}
                </div>

                <div className='border-b border-black rounded-md mt-3'>
                    <div className='flex justify-between' >
                        <div>
                            <span className='mr-2'>Jumlah</span>
                            <span className=''>Item</span>
                        </div>
                        <div>
                            Harga
                        </div>
                    </div>
                    {curPelanggan.pesanan.map(psn => {
                        return (
                            <div key={Math.random()} className='border-t border-x border-black px-2 rounded-md flex justify-between' >
                                <div>
                                    <span className='mr-11'>{psn.jumlah}</span>
                                    <span className=''>{psn.nama_masakan}</span>
                                </div>
                                <div>
                                    {psn.harga}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='self-end'>Total harga : {curPelanggan.total_harga}</div>

                <button className='border border-black px-2 rounded-md self-end bg-green-600 mt-2'>Bayar</button>
                
            </div>
        }

    </div>
  )
}

export default PembayaranKasir