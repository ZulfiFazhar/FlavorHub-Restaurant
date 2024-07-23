"use client"

import React, {useState} from 'react'

function PembayaranCard({curPelanggan, setCurPelanggan, supabase}) {
    const [metodePembayaran, setMetodePembayaran] = useState('qris')

    const handleClickBayar = async () => {
        // Konfirmasi bayar
        const yakinBayar = confirm(`Konfirmasi bayar untuk pelanggan atas nama : ${curPelanggan.nama_pemesan}`)

        if(!yakinBayar){
            return
        }

        // Update data pesanan
        const {dataPesanan, errorPesanan} = await supabase
            .from('pesanan')
            .update({status:'sudah dibayar'})
            .eq('id', curPelanggan.id)

        if(errorPesanan){
            return console.log(errorPesanan)
        }else{
            console.log(dataPesanan)
        }

        // Insert data pembayaran
        const randomUang = Math.floor(Math.random() * ((70000 - 5000) / 1000 + 1)) * 1000 + 5000;

        const newPembayaran = {
            total_tagihan: curPelanggan.total_harga,
            total_bayar: curPelanggan.total_harga + randomUang,
            jenis_pembayaran: metodePembayaran,
            pesanan: curPelanggan.id
        }

        const {dataPembayaran, errorPembayaran} = await supabase
            .from("pembayaran")
            .insert([newPembayaran])

        if(errorPembayaran){
            return console.log(errorPembayaran)
        }else{
            console.log(dataPembayaran)
        }

        setCurPelanggan(cp => false)
        return alert("Pembayaran berhasil")
    }

  return (
    <div className='border border-black rounded-md px-4 py-2 mt-3 flex flex-col'>
        <div className='flex justify-between items-start'>
            <div>
                <div>
                    Nama : {curPelanggan.nama_pemesan}
                </div>

                <div>
                    No meja : {curPelanggan.nomor_meja}
                </div>
            </div>

            <div className='flex items-center'>
                <h3 className='mr-4'>Metode Pembayaran : </h3>
                <div className='flex'>
                    <div className='flex items-center mr-3'>
                        <input
                            type="radio"
                            id='qris'
                            name="metodePembayaran"
                            className='mr-1 hover:cursor-pointer'
                            checked={metodePembayaran == "qris"}
                            onChange={() => setMetodePembayaran(mp => 'qris')}
                        />
                        <label htmlFor='qris' className='hover:cursor-pointer'>qris</label>
                    </div>

                    <div className='flex items-center'>
                        <input
                            type="radio"
                            id='cash'
                            name="metodePembayaran"
                            className='mr-1 hover:cursor-pointer'
                            checked={metodePembayaran == "cash"}
                            onChange={() => setMetodePembayaran(mp => 'cash')}
                        />
                        <label htmlFor='cash' className='hover:cursor-pointer'>cash</label>
                    </div>
                </div>
            </div>
        </div>

        <div className='border-b border-black rounded-md mt-3'>
            <div className='flex justify-between' >
                <div>
                    <span className='mr-5'>Jumlah</span>
                    <span className=''>Item</span>
                </div>
                <div className='mr-1'>
                    Harga (Rp)
                </div>
            </div>
            {curPelanggan.pesanan.map(psn => {
                return (
                    <div key={Math.random()} className='border-t border-x border-black px-2 rounded-md flex justify-between' >
                        <div>
                            <span className='mr-14'>{psn.jumlah}</span>
                            <span className=''>{psn.nama_masakan}</span>
                        </div>
                        <div>
                            {psn.harga}
                        </div>
                    </div>
                )
            })}
        </div>

        <div className='self-end mr-1'>Total tagihan : {curPelanggan.total_harga}</div>

        
        
        <button className='border border-black px-2 rounded-md self-end green-custom mt-7 hover:bg-green-600' onClick={handleClickBayar}>Bayar</button>
        
    </div>
  )
}

export default PembayaranCard