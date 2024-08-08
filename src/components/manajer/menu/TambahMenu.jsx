"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { editMenu, hapusMenu, tambahMenu } from './lib'
import { Input, Button } from "@nextui-org/react";

function TambahMenu({supabase, setBukaDetam, menu, setRefetch}) {
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
        
        if(menu.action == "tambah"){
            tambahMenu(supabase, formTambahMenu, setFormTambahMenu, setPreview, setBukaDetam, setRefetch)
        }else if(menu.action == "edit"){
            editMenu(supabase, formTambahMenu, setFormTambahMenu, preview, setPreview, setBukaDetam, setRefetch, menu.id, menu.foto)
        }
    };

    const handleClickDelete = async () => {
        hapusMenu(supabase, menu, setBukaDetam, setRefetch)
    }


  return (
    <div className='w-1/3 py-5 px-6 flex flex-col bg-slate-200 overflow-x-hidden max-h-screen overflow-y-auto'>
        <h1 className='text-3xl'>{menu.action == "tambah" ? "Tambah Menu" : "Edit Menu"}</h1>
        
        <div className='mt-1 *:mb-2 mb-8'>
            <div className='mt-4'>
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

            <div className='mt-6'>
                <label htmlFor="nama" className='ml-2'>Nama Menu</label>
                <input 
                    className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full' 
                    id='nama' 
                    autoComplete='off'
                    placeholder='Nama menu'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, nama_masakan:event.target.value}))}
                    value={formTambahMenu.nama_masakan}
                >
                </input>
            </div>

            <div className='mt-5'>
                <label htmlFor="kategori" className='ml-2'>Kategori</label>
        
                <div className='flex w-full bg-gray-100 py-2 px-3 rounded-md'>
                        <div className='flex items-center mr-5'>
                            <input 
                                type='radio'
                                id='Makanan'
                                name='kategori'
                                className='cursor-pointer mr-1'
                                checked={formTambahMenu.kategori == "Makanan"}
                                onClick={(e) => setFormTambahMenu(ftm => ({...ftm, kategori:"Makanan"}))}
                            ></input>
                            <label htmlFor='Makanan' className='cursor-pointer'>Makanan</label>
                        </div>

                        <div className='flex items-center'>
                            <input 
                                type='radio'
                                id='Minuman'
                                name='kategori'
                                className='cursor-pointer mr-1'
                                checked={formTambahMenu.kategori == "Minuman"}
                                onClick={(e) => setFormTambahMenu(ftm => ({...ftm, kategori:"Minuman"}))}
                            ></input>
                            <label htmlFor='Minuman' className='cursor-pointer'>Minuman</label>
                        </div>
                    </div>
            </div>

            <div className='mt-5'>
                <label htmlFor="deskripsi" className='ml-2'>Deskripsi</label>
                <textarea 
                    className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full' 
                    autoComplete='off'
                    placeholder='Deskrisi menu'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, deskripsi:event.target.value}))}
                    value={formTambahMenu.deskripsi}
                >
                </textarea>
            </div>

            <div className='mt-5 mb-14'>
                <label htmlFor="harga" className='ml-2'>Harga</label>
                <input 
                    type="number" 
                    className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full' 
                    id='harga'  
                    autoComplete='off'
                    placeholder='Harga'
                    onChange={(event) => setFormTambahMenu(ft => ({...ft, harga:event.target.value}))}
                    value={formTambahMenu.harga}
                > 
                </input>
            </div>
        </div>

        <div className='mt-auto mx-auto w-full'>
                <button 
                    className='py-2 text-center w-full rounded-md text-white mb-4 bg-green-600 hover:bg-green-800 transition ease-out'
                    onClick={handleClickSubmit}
                >Submit</button>

                <button 
                    className='py-2 text-center w-full rounded-md bg-orange-500 text-white mb-4 hover:bg-orange-700 transition ease-out'
                    onClick={() => setBukaDetam(d => "none")}
                >Cancel</button>
                
                {   
                    menu.action == "edit" &&
                    <button 
                        className='py-2 text-center w-full rounded-md text-white mb-2 bg-red-500 hover:bg-red-700 transition ease-out'
                        onClick={handleClickDelete}
                    >Hapus</button>
                }
            </div>

    </div>
  )
}

export default TambahMenu