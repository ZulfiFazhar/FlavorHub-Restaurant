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
            <Image src='/profileplaceholder.jpg' width={100} height={100} alt='foto profil' />
            
            <div className='flex flex-col w-[17rem]'>
                <p>Nama : {karyawan.nama}</p>
                <p>Jabatan : {karyawan.jabatan}</p>
                <p>Lama kerja : {karyawan.lama_kerja}</p>
                <p>Email : {karyawan.email}</p>
            </div>

            <div className='flex flex-col'>
                <button 
                    className='px-2 rounded-md orange-custom text-white'
                    onClick={() => handleClickDetail(karyawan)}
                >Detail</button>

                <button 
                    className='px-2 rounded-md orange-custom text-white mt-3'
                    onClick={() => handleClickUbah(karyawan)}
                >Ubah</button>
            </div>
        </div>  
    )
}

export default KaryawanCard