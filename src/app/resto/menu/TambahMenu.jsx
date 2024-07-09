"use client"

import React, {useState} from 'react'

function TambahMenu({supabase}) {
  const [formTambahMenu, setFormTambahMenu] = useState({nama_masakan:'',kategori:'',deskripsi:'',harga:''})

  const handleClickSubmit = async () => {   
    const {nama_masakan, kategori, deskripsi, harga} = formTambahMenu
    if(nama_masakan == '' || kategori == '' || deskripsi == '' || harga == ''){
        return alert("Semua input harus diisi.")
    }

    const newMenu = {
        nama_masakan,
        kategori,
        opsi:null,
        harga,
        deskripsi
    }

    const {data, error} = await supabase
        .from('menu')
        .insert([newMenu])

    if(error){
        return alert("Error insert new menu: ",error)
    }else{
        console.log(data)
        setFormTambahMenu(tb => ({nama_masakan:'',kategori:'',deskripsi:'',harga:''}))
    }

  }

  return (
    <div className='w-1/3 p-5 flex flex-col bg-slate-200'>
        <h1 className='text-3xl'>Tambah Menu</h1>
        
        <div className='mt-5 *:mb-2'>
            <div className=''>
                <label htmlFor="nama" className='block'>Nama Masakan</label>
                <input 
                    className='bg-white px-2 rounded-md ' 
                    id='nama' 
                    autoComplete='off'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, nama_masakan:event.target.value}))}
                    value={formTambahMenu.nama_masakan}
                >
                </input>
            </div>

            <div className=''>
                <label htmlFor="kategori" className='block'>Kategori</label>
                <input 
                    className='bg-white px-2 rounded-md' 
                    id='kategori' 
                    autoComplete='off'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, kategori:event.target.value}))}
                    value={formTambahMenu.kategori}
                >
                </input>
            </div>

            <div className=''>
                <label htmlFor="deskripsi" className='block'>Deskripsi</label>
                <textarea 
                    className='bg-white px-2 rounded-md h-20 w-[14rem]' 
                    id='deskripsi' 
                    autoComplete='off'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, deskripsi:event.target.value}))}
                    value={formTambahMenu.deskripsi}
                >
                </textarea>
            </div>

            <div className=''>
                <label htmlFor="harga" className='block'>Harga</label>
                <input 
                    type="number" 
                    className='bg-white px-2 rounded-md ' 
                    id='harga'  
                    autoComplete='off'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, harga:event.target.value}))}
                    value={formTambahMenu.harga}
                > 
                </input>
            </div>
        </div>

        <div className='flex-none mt-auto px-7 flex justify-between'>
            <button className='px-2 bg-red-500 rounded-md text-white hover:bg-red-600'>Cancel</button>
            
            <button 
                className='px-2 bg-green-500 rounded-md text-white hover:bg-green-600'
                onClick={handleClickSubmit}
            >
            Submit
            </button>
        </div>

    </div>
  )
}

export default TambahMenu