import React from 'react'
import Image from 'next/image'

function DetailKaryawan({karyawan, setSelectedKaryawan}) {
  return (
    <div className='w-1/3 h-full grey-custom rounded-md px-4 py-3 overflow-y-auto'>
        <div 
            className='flex items-center text-xl w-fit hover:cursor-pointer'
            onClick={() => setSelectedKaryawan(false)}
        >
            <span className=''>&larr;</span> 
            <span className='ml-3 mt-[0.2rem]'>Details</span>
        </div>

        <div className='mt-3 w-full relative h-56 bg-slate-300'>
            <Image
                src={`/karyawan/${karyawan.foto ? karyawan.foto : 'placeholder/profileplaceholder.jpg'}`}
                alt="Foto karyawan"
                layout="fill"
                objectFit="cover"
                className="w-full"
            />
        </div>

        <div className='mt-3'>
            <div className='flex justify-between items-center'>
                <span className='text-lg'>{karyawan.nama}</span>
                <span className='text-sm'>{karyawan.umur} Tahun</span>
            </div>

            <div className='mt-3 border-b border-gray-500 flex justify-between items-center'>
                <span>Jabatan</span>
                <span className='text-sm text-gray-700'>{karyawan.jabatan}</span>
            </div>
            
            <div className='mt-3 border-b border-gray-500 flex justify-between items-center'>
                <span>Lama Kerja</span>
                <span className='text-sm text-gray-700'>{karyawan.lama_kerja} tahun</span>
            </div>

            <div className='mt-3 border-b border-gray-700 flex justify-between items-center'>
                <span>Email</span>
                <span className='text-sm text-gray-700'>{karyawan.email}</span>
            </div>

            <div className='mt-3 border-b border-gray-700 flex justify-between items-center'>
                <span>No Telp</span>
                <span className='text-sm text-gray-700'>{karyawan.no_telepon}</span>
            </div>

            <div className='mt-3 border-b border-gray-700 flex justify-between items-center'>
                <span>Jenis Kelamin</span>
                <span className='text-sm text-gray-700'>{karyawan.jenis_kelamin}</span>
            </div>

            <div className='mt-3 border-b border-gray-700 flex justify-between items-center'>
                <span>Tanggal Lahir</span>
                <span className='text-sm text-gray-700'>{karyawan.tanggal_lahir}</span>
            </div>
        </div>

    </div>
  )
}

export default DetailKaryawan