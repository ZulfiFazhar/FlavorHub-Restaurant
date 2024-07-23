import React, {useState} from 'react'

function PilihPelanggan({pesanan, setCurPelanggan}) {
    const [openPilihPelanggan, setOpenPilihPelanggan] = useState(false)

    const handleClickPilihPelanggan = (selectedPesanan) => {
        setCurPelanggan(cp => selectedPesanan)
        setOpenPilihPelanggan(pp => false)
    }

  return (
    <div className='mt-2'>
        <div className='border border-black px-2 rounded-md flex justify-between max-w-60 hover:cursor-pointer' onClick={() => setOpenPilihPelanggan(pp => !pp)}>
            <span>Pilih nama pelanggan</span>
            <span>&darr;</span>
        </div>

        {openPilihPelanggan &&
            <div className={`absolute bg-white border border-black rounded-md max-w-60 mt-2 flex flex-col py-2`}>
                {pesanan.map(psn => {
                    return (
                        <div key={psn.id} className='border-b rounded-md px-4 py-1 hover:cursor-pointer hover:bg-slate-100 flex justify-between' onClick={() => handleClickPilihPelanggan(psn)}>
                            <span className='mr-10'>{psn.nama_pemesan}</span>
                            <span>{psn.nomor_meja}</span>
                        </div>
                    )
                })}
                {pesanan.length == 0 && <span className='text-red-500'>Tidak ada pelanggan</span>}
            </div>
            
        }
    </div>
  )
}

export default PilihPelanggan