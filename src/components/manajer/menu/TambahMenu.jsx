"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { tambahEditMenu } from './lib'

function TambahMenu({supabase, setBukaDetam, menu}) {
  const [formTambahMenu, setFormTambahMenu] = useState({nama_masakan:'',kategori:'',deskripsi:'',harga:'', foto:''})
  const [preview, setPreview] = useState(null)

    // Untuk edit menu
    useEffect(() => {
        if(menu.action == "edit"){
            setFormTambahMenu(ftm => {
                let newMenu = {...menu};
                delete newMenu.action;
                return newMenu
            })
            if(menu.foto != null){
                setPreview(p => ({status:'old', foto:`/menu/${menu.foto}`}))
            }else{
                setPreview(p => ({status:'old-default', foto:`/menu/placeholder/menu-foto-placeholder.jpg`}))
            }
        }
    }, [])

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
        setPreview(p => ({status:'new', foto:previewUrl}))
    }

    const handleClickSubmit = async () => {   
        tambahEditMenu(supabase, menu.action, formTambahMenu, setFormTambahMenu, preview, setPreview, setBukaDetam, menu.id, menu.foto)
    };


  return (
    <div className='w-1/3 p-5 flex flex-col bg-slate-200 overflow-x-hidden max-h-screen overflow-y-auto'>
        <h1 className='text-3xl'>{menu.action == "tambah" ? "Tambah Menu" : "Edit Menu"}</h1>
        
        <div className='mt-5 *:mb-2 mb-8'>
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
                            src={preview.foto}
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

        <div className='mt-auto flex justify-between mb-1'>
            <button 
                className='px-3 py-1 w-28 bg-orange-500 rounded-md hover:bg-orange-600'
                onClick={() => setBukaDetam(d => "none")}
            >
            Cancel
            </button>
            
            <button 
                className='px-3 py-1 w-28 bg-green-500 rounded-md hover:bg-green-600'
                onClick={handleClickSubmit}
            >
            Submit
            </button>
        </div>

    </div>
  )
}

export default TambahMenu