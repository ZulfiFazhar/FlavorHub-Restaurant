import React from 'react'

function TambahMenu({supabase}) {
  return (
    <div className='w-1/3 p-5 flex flex-col bg-slate-200'>
        <h1 className='text-3xl'>Tambah Menu</h1>
        
        <div className='mt-5 *:mb-2'>
            <div className=''>
                <label htmlFor="nama" className='block'>Nama Masakan</label>
                <input 
                    className='bg-white px-2 rounded-md ' 
                    id='nama' 
                    autoComplete='off'>
                </input>
            </div>
            <div className=''>
                <label htmlFor="jenis" className='block'>Jenis</label>
                <input className='bg-white px-2 rounded-md' id='jenis' autoComplete='off'></input>
            </div>
            <div className=''>
                <label htmlFor="kategori" className='block'>Kategori</label>
                <input className='bg-white px-2 rounded-md' id='kategori' autoComplete='off'></input>
            </div>
            <div className=''>
                <label htmlFor="deskripsi" className='block'>Deskripsi</label>
                <textarea className='bg-white px-2 rounded-md h-20 w-[14rem]' id='deskripsi' autoComplete='off'></textarea>
            </div>
            <div className=''>
                <label htmlFor="harga" className='block'>Harga</label>
                <input type="number" className='bg-white px-2 rounded-md ' id='harga'  autoComplete='off'></input>
            </div>
        </div>

        <div className='flex-none mt-auto px-7 flex justify-between'>
            <button className='px-2 bg-red-500 rounded-md text-white hover:bg-red-600'>Cancel</button>
            <button className='px-2 bg-green-500 rounded-md text-white hover:bg-green-600'>Submit</button>
        </div>

    </div>
  )
}

export default TambahMenu