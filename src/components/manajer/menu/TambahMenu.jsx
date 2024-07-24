"use client"

import React, {useState} from 'react'
import Image from 'next/image'

function TambahMenu({supabase, setBukaDetam}) {
  const [formTambahMenu, setFormTambahMenu] = useState({nama_masakan:'',kategori:'',deskripsi:'',harga:'', foto:''})
  const [preview, setPreview] = useState(null)

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0]

        // Validasi
        if(!selectedFile){
            return
        }

        const acceptedFileType = ["image/jpeg","image/jpg","image/png"]
        if(!acceptedFileType.includes(selectedFile.type)){
            return alert("Hanya menerima tipe file jpeg, jpg, atau png")
        }

        // Set file state
        setFormTambahMenu(ftm => ({...ftm, foto:selectedFile}))

        // Set preview
        const previewUrl = URL.createObjectURL(selectedFile)
        setPreview(p => previewUrl)
    }

    const handleClickSubmit = async () => {   
        const {nama_masakan, kategori, deskripsi, harga, foto} = formTambahMenu
        if(nama_masakan == '' || kategori == '' || deskripsi == '' || harga == '' || foto == ''){
            return alert("Semua input harus diisi.")
        }

        const fotoString = `${nama_masakan}-${Date.now().toString()}.${foto.type.split("/")[1]}`

        const newMenu = {
            nama_masakan,
            kategori,
            opsi:null,
            harga,
            deskripsi,
            foto : fotoString
        }

        const {data, error} = await supabase
            .from('menu')
            .insert([newMenu], { returning: 'representation' })

        if(error){
            return alert("Error insert new menu: ",error)
        }else{
            console.log(data)
        }


        const formData = new FormData();
        formData.append('file', foto);
        formData.append('fotoName', fotoString)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            setFormTambahMenu(tb => ({nama_masakan:'',kategori:'',deskripsi:'',harga:'',foto:''}))
            setPreview(p => null)
            return alert("Menu berhasil ditambahkan")
        } else {
            return alert("Gagal menambahkan menu")
        }
    };


  return (
    <div className='w-1/3 p-5 flex flex-col bg-slate-200'>
        <h1 className='text-3xl'>Tambah Menu</h1>
        
        <div className='mt-5 *:mb-2'>
            <div className=''>
                <label htmlFor="foto" className=''>Foto</label>
                <input 
                    className='mt-1' 
                    type='file'
                    id='foto' 
                    onChange={handleFileChange}
                >
                </input>

                {preview &&
                    <div className='mt-2'>
                        <Image
                            src={preview}
                            height={300}
                            width={300}
                            alt='foto menu'
                        />
                    </div>
                }
            </div>

            <div className='mt-3'>
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
            <button 
                className='px-2 bg-red-500 rounded-md text-white hover:bg-red-600'
                onClick={() => setBukaDetam(d => "none")}
            >
            Cancel
            </button>
            
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