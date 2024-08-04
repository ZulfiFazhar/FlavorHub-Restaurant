import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { tambahKaryawan, ubahKaryawan } from './lib'

function TambahUbahKaryawan({karyawan, setSelectedKaryawan, setRefetch}) {
    const [karyawanForm, setKaryawanForm] = useState(
            {nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", foto:"", password:"", passwordConfirm:""}
        )
    const [preview, setPreview] = useState(null)
    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        if(karyawan.action == "ubah"){
            setKaryawanForm(kf => {
                let newKaryawan = {...karyawan}
                delete newKaryawan.action
                return newKaryawan
            })
            if(karyawan.foto){
                setPreview(p => ({status:'old', foto:`/karyawan/${karyawan.foto}`}))
            }else{
                setPreview(p => null)
            }
        }else{
            setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", foto:"", password:"", passwordConfirm:""}))
            setPreview(p => null)
        }
    }, [karyawan])

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
        setKaryawanForm(kf => ({...kf, foto:selectedFile}))

        // Set preview
        const previewUrl = URL.createObjectURL(selectedFile)
        setPreview(p => ({status:'new', foto:previewUrl}))
    }

    const handleClickSubmitTambahKaryawan = async () => {
        // tambahUbahKaryawan(supabase, karyawanForm, karyawan, preview, setPreview, setKaryawanForm, setSelectedKaryawan)
        if(karyawan.action == "tambah"){
            tambahKaryawan(supabase, karyawanForm, setPreview, setKaryawanForm, setSelectedKaryawan, setRefetch)
        }else if(karyawan.action == "ubah"){
            ubahKaryawan(supabase, karyawanForm, preview, setPreview, setKaryawanForm, setSelectedKaryawan, setRefetch, karyawan.id, karyawan.foto)
        }
    }

    return (
        <div className='w-1/3 h-full px-4 py-3 grey-custom rounded-md overflow-y-auto overflow-x-hidden'>
            <div 
                className='flex items-center text-xl w-fit hover:cursor-pointer'
                onClick={() => setSelectedKaryawan(false)}
            >
                <span className=''>&larr;</span> 
                <span className='ml-3 mt-[0.2rem]'>
                    {karyawan.action == "ubah"
                        ? "Ubah"
                        : "Tambah"
                    }
                </span>
            </div>

            <div className='mt-3 w-full'>
                <label htmlFor="foto" className=''>Foto</label>

                <input 
                    className='mt-1 w-full' 
                    type='file'
                    id='foto'
                    onChange={handleFileChange}
                >
                </input>

                {preview &&
                    <div className='mt-2 '>
                        <Image
                            src={preview.foto}
                            height={300}
                            width={300}
                            alt='foto karyawan'
                            className='overflow-hidden'
                        />
                    </div>
                }
            </div>

            <div>
                <div className='mt-3'>
                    <label htmlFor='nama'>Nama</label>
                    <input 
                        id='nama' 
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.nama}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, nama:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-2'>
                    <label htmlFor='jenis_kelamin'>Jenis Kelamin</label>
                    <input 
                        id='jenis_kelamin' 
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.jenis_kelamin}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, jenis_kelamin:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-2'>
                    <label htmlFor='tanggal_lahir' className='block'>Tanggal Lahir</label>
                    <input 
                        id='tanggal_lahir' 
                        type='date'
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.tanggal_lahir}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, tanggal_lahir:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-2'>
                    <label htmlFor='umur'>Umur</label>
                    <input 
                        id='umur' 
                        type='number'
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.umur}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, umur:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-2'>
                    <label htmlFor='jabatan'>Jabatan</label>
                    <input 
                        id='jabatan' 
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.jabatan}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, jabatan:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-2'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        id='email' 
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.email}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, email:e.target.value}))}
                    ></input>
                </div>

                {
                    karyawan.action == "tambah" &&
                    <div>
                    <div className='mt-2'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            id='password' 
                            type='password'
                            className='border border-gray-400 px-2 rounded-md'
                            value={karyawanForm.password}
                            autoComplete='off'
                            onChange={(e) => setKaryawanForm(kf => ({...kf, password:e.target.value}))}
                        ></input>
                    </div>

                    <div className='mt-2'>
                        <label htmlFor='passwordConfirm'>Konfirmasi Password</label>
                        <input 
                            id='passwordConfirm' 
                            type='password'
                            className='border border-gray-400 px-2 rounded-md'
                            value={karyawanForm.passwordConfirm}
                            autoComplete='off'
                            onChange={(e) => setKaryawanForm(kf => ({...kf, passwordConfirm:e.target.value}))}
                        ></input>
                    </div>
                    </div>
                }

                <div className='mt-2'>
                    <label htmlFor='no_telepon'>No Telp</label>
                    <input 
                        id='no_telepon' 
                        className='border border-gray-400 px-2 rounded-md'
                        value={karyawanForm.no_telepon}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, no_telepon:e.target.value}))}
                    ></input>
                </div>

            </div>

            <div className='mt-7 mb-3 mx-auto w-5/6 px-3 flex justify-between'>
                <button 
                    className='px-2 rounded-md bg-red-500 text-white'
                    onClick={() => setSelectedKaryawan(sk => false)}
                >Cancel</button>

                <button 
                    className='px-2 rounded-md bg-green-500 text-white'
                    onClick={handleClickSubmitTambahKaryawan}
                >Submit</button>
            </div>

        </div>
    )
}

export default TambahUbahKaryawan