"use client"

import React from 'react'

function PembayaranCard({curPelanggan, setCurPelanggan, supabase}) {
    const handleClickBayar = async () => {
        const {data, error} = await supabase
            .from('pesanan')
            .update({status:'sudah dibayar'})
            .eq('id', curPelanggan.id)

        if(error){
            return console.log(error)
        }else{
            console.log(data)
        }

        setCurPelanggan(cp => false)
    }

  return (
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

        <button className='border border-black px-2 rounded-md self-end bg-green-600 mt-2' onClick={handleClickBayar}>Bayar</button>
        
    </div>
  )
}

export default PembayaranCard