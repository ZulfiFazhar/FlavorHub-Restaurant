import React from 'react'

function DetailMenu({selectedMenu, setBukaDetam}) {
  return (
    <div className='w-1/3 bg-slate-200 p-4'>
        <div className='flex'>
            <button className='mr-5 text-xl' onClick={() => setBukaDetam(m => false)}>&#8592;</button>
            <h1 className='text-2xl'>Detail</h1>
        </div>
        
        {selectedMenu 
            &&
            <div>
                <h1 className='mt-5 text-2xl'>{selectedMenu.nama_masakan}</h1>
            
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
    </div>
  )
}

export default DetailMenu