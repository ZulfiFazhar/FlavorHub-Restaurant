import React from 'react'
import Image from 'next/image'
import { hapusMenu } from './lib'

function DetailMenu({selectedMenu, setBukaDetam, supabase, setRefetch}) {

    const handleClickHapus = async () => {
        hapusMenu(supabase, selectedMenu, setBukaDetam, setRefetch)
    }

    const handleClickEdit = async () => {
        // alert("Edit menu belum tersedia")
        setBukaDetam(bd => "edit");
    }

  return (
    <div className='flex flex-col w-1/3 max-h-screen bg-slate-200 p-4'>
        <div className='flex'>
            <button className='mr-5 text-xl' onClick={() => setBukaDetam(m => false)}>&#8592;</button>
            <h1 className='text-2xl'>Detail</h1>
        </div>
        
        {selectedMenu 
            &&
            <div>
                <h1 className='mt-5 text-2xl'>{selectedMenu.nama_masakan}</h1>
            
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={`/menu/${selectedMenu.foto ? selectedMenu.foto : 'placeholder/menu-foto-placeholder.jpg'}`}
                    alt="Foto menu"
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                  />
                </div>

                {selectedMenu.deskripsi &&
                    <p className='mt-2 mb-6 '>{selectedMenu.deskripsi}</p>
                }

                <p className='mt-4 border-b border-black flex justify-between'>
                    <span>Kategori</span>
                    <span>{selectedMenu.kategori}</span>
                </p>

                <p className='mt-4 border-b border-black flex justify-between'>
                    <span>Harga</span>
                    <span>Rp. {selectedMenu.harga}</span>
                </p>
            </div>
        }

        <div className='mt-auto flex justify-between mb-1'>
            <button 
                className='px-3 py-1 w-28 bg-orange-400 rounded-md hover:bg-orange-600'
                onClick={handleClickEdit}
                >
                Edit
            </button>

            <button 
                className='px-3 py-1 w-28 bg-red-500 rounded-md hover:bg-red-600'
                onClick={handleClickHapus}
                >
                Hapus
            </button>
        </div>
    </div>
  )
}

export default DetailMenu