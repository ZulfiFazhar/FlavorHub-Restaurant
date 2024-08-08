import React from 'react'
import Image from 'next/image'

function KaryawanCard({karyawan, setSelectedKaryawan}) {

    const handleClickDetail = (karyawan) => {
        setSelectedKaryawan(kyn => ({...karyawan, action:'detail'}))
    }

    const handleClickUbah = (karyawan) => {
        setSelectedKaryawan(kyn => ({...karyawan, action:'ubah'}))
    }
    
    return (
        <div className='p-4 w-full flex justify-between items-center grey-custom mb-5 rounded-md'>
            <div className='flex items-center'>
                <div className='mr-4 overflow-hidden relative h-24 w-32 bg-slate-300'>
                    <Image
                        src={`/karyawan/${karyawan.foto ? karyawan.foto : 'placeholder/profileplaceholder.jpg'}`}
                        alt="Foto karyawan"
                        layout="fill"
                        objectFit="cover"
                        className="w-full"
                    />

                </div>
                <div className='flex flex-col w-[17rem]'>
                    <p>Nama : {karyawan.nama}</p>
                    <p>Jabatan : {karyawan.jabatan}</p>
                    <p>Lama kerja : {karyawan.lama_kerja} tahun</p>
                    <p>Email : {karyawan.email}</p>
                </div>
            </div>
            

            <div className='flex flex-col'>
                <button 
                    className='py-1 text-center w-40 rounded-md text-white bg-green-600 hover:bg-green-800 transition ease-out'
                    onClick={() => handleClickDetail(karyawan)}
                >Detail</button>

                <button 
                    className='py-1 mt-3 text-center w-40 rounded-md text-white bg-orange-400 hover:bg-orange-600 transition ease-out'
                    onClick={() => handleClickUbah(karyawan)}
                >Ubah</button>
            </div>
        </div>  
    )
}

export default KaryawanCard