import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { tambahKaryawan, ubahKaryawan, hapusKaryawan } from './lib'

function TambahUbahKaryawan({karyawan, setSelectedKaryawan, setRefetch}) {
    const [karyawanForm, setKaryawanForm] = useState(
            {nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", foto:"", password:"", passwordConfirm:""}
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
            setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", foto:"", password:"", passwordConfirm:""}))
            setPreview(p => null)
        }
    }, [karyawan])
    console.log(karyawanForm)
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

    const handleCancel = async () => {
        setSelectedKaryawan(sk => false)
    }

    const handleClickSubmitTambahKaryawan = async () => {
        // tambahUbahKaryawan(supabase, karyawanForm, karyawan, preview, setPreview, setKaryawanForm, setSelectedKaryawan)
        if(karyawan.action == "tambah"){
            tambahKaryawan(supabase, karyawanForm, setPreview, setKaryawanForm, setSelectedKaryawan, setRefetch)
        }else if(karyawan.action == "ubah"){
            ubahKaryawan(supabase, karyawanForm, preview, setPreview, setKaryawanForm, setSelectedKaryawan, setRefetch, karyawan.id, karyawan.foto)
        }
    }

    const handleClickHapusKaryawan = async () => {
        hapusKaryawan(supabase, karyawan.id, setSelectedKaryawan, setRefetch)
    }

    return (
        <div className='w-1/3 h-full px-4 py-3 grey-custom rounded-md overflow-y-auto overflow-x-hidden'>
            <span className='mt-[0.2rem] text-3xl'>
                {karyawan.action == "ubah"
                    ? "Ubah Karyawan"
                    : "Tambah Karyawan"
                }
            </span>

            <div className='mt-5 w-full ml-1'>
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
                <div className='mt-6'>
                    <label htmlFor='nama' className='ml-1'>Nama Karyawan</label>
                    <input 
                        id='nama' 
                        className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full'
                        placeholder='Nama karyawan'
                        value={karyawanForm.nama}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, nama:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-6'>
                    <label htmlFor='jenis_kelamin' className='ml-1 mb-2'>Jenis Kelamin</label>
    
                    <div className='flex w-full bg-gray-100 py-2 px-3 rounded-md'>
                        <div className='flex items-center mr-5'>
                            <input 
                                type='radio'
                                id='lakiLaki'
                                name='jenisKelamin'
                                className='cursor-pointer mr-1'
                                checked={karyawanForm.jenis_kelamin == "Laki-laki"}
                                onClick={(e) => setKaryawanForm(kf => ({...kf, jenis_kelamin:"Laki-laki"}))}
                            ></input>
                            <label htmlFor='lakiLaki' className='cursor-pointer'>Laki-laki</label>
                        </div>
                        <div className='flex items-center'>
                            <input 
                                type='radio'
                                id='perempuan'
                                name='jenisKelamin'
                                className='cursor-pointer mr-1'
                                checked={karyawanForm.jenis_kelamin == "Perempuan"}
                                onClick={(e) => setKaryawanForm(kf => ({...kf, jenis_kelamin:"Perempuan"}))}
                            ></input>
                            <label htmlFor='perempuan' className='cursor-pointer'>Perempuan</label>
                        </div>
                    </div>
                </div>

                <div className='mt-6'>
                    <label htmlFor='tanggal_lahir' className='ml-1'>Tanggal Lahir</label>
                    <input 
                        id='tanggal_lahir' 
                        type='date'
                        className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full'
                        placeholder='Tanggal lahir'
                        value={karyawanForm.tanggal_lahir}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, tanggal_lahir:e.target.value}))}
                    ></input>
                </div>

                <div className='mt-6'>
                    <label htmlFor='jabatan' className='ml-1'>Jabatan</label>
                    <div className='flex w-full bg-gray-100 py-2 px-3 rounded-md *:mr-5'>
                        <div className='flex items-center'>
                            <input 
                                type='radio'
                                id='pelayan'
                                name='jabatan'
                                className='cursor-pointer mr-1'
                                checked={karyawanForm.jabatan == "Pelayan"}
                                onClick={(e) => setKaryawanForm(kf => ({...kf, jabatan:"Pelayan"}))}
                            ></input>
                            <label htmlFor='pelayan' className='cursor-pointer'>Pelayan</label>
                        </div>
                        <div className='flex items-center'>
                            <input 
                                type='radio'
                                id='Koki'
                                name='jabatan'
                                className='cursor-pointer mr-1'
                                checked={karyawanForm.jabatan == "Koki"}
                                onClick={(e) => setKaryawanForm(kf => ({...kf, jabatan:"Koki"}))}
                            ></input>
                            <label htmlFor='Koki' className='cursor-pointer'>Koki</label>
                        </div>
                        <div className='flex items-center'>
                            <input 
                                type='radio'
                                id='Kasir'
                                name='jabatan'
                                className='cursor-pointer mr-1'
                                checked={karyawanForm.jabatan == "Kasir"}
                                onClick={(e) => setKaryawanForm(kf => ({...kf, jabatan:"Kasir"}))}
                            ></input>
                            <label htmlFor='Kasir' className='cursor-pointer'>Kasir</label>
                        </div>
                    </div>
                </div>

                <div className='mt-6'>
                    <label htmlFor='email' className='ml-1'>Email</label>
                    <input 
                        id='email' 
                        type='email'
                        className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full'
                        placeholder='email'
                        value={karyawanForm.email}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, email:e.target.value}))}
                    ></input>
                </div>

                {
                    karyawan.action == "tambah" &&
                    <div>
                    <div className='mt-6'>
                        <label htmlFor='password' className='ml-1'>Password</label>
                        <input 
                            id='password' 
                            type='password'
                            className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full'
                            placeholder='Password'
                            value={karyawanForm.password}
                            autoComplete='off'
                            onChange={(e) => setKaryawanForm(kf => ({...kf, password:e.target.value}))}
                        ></input>
                    </div>

                    <div className='mt-6'>
                        <label htmlFor='passwordConfirm' className='ml-1'>Konfirmasi Password</label>
                        <input 
                            id='passwordConfirm' 
                            type='password'
                            className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full'
                            placeholder='Konfirmasi password'
                            value={karyawanForm.passwordConfirm}
                            autoComplete='off'
                            onChange={(e) => setKaryawanForm(kf => ({...kf, passwordConfirm:e.target.value}))}
                        ></input>
                    </div>
                    </div>
                }

                <div className='mt-6 mb-14'>
                    <label htmlFor='no_telepon' className='ml-1'>No Telp</label>
                    <input 
                        id='no_telepon' 
                        className='bg-white px-3 mt-1 py-2 rounded-lg border-2 border-gray-300 w-full'
                        placeholder='No Telepon'
                        value={karyawanForm.no_telepon}
                        autoComplete='off'
                        onChange={(e) => setKaryawanForm(kf => ({...kf, no_telepon:e.target.value}))}
                    ></input>
                </div>
            </div>

            <div className='mt-auto mx-auto w-full'>
                <button 
                    className='py-2 text-center w-full rounded-md text-white mb-4 bg-green-600 hover:bg-green-800 transition ease-out'
                    onClick={handleClickSubmitTambahKaryawan}
                >Submit</button>

                <button 
                    className='py-2 text-center w-full rounded-md bg-orange-500 text-white mb-4 hover:bg-orange-700 transition ease-out'
                    onClick={handleCancel}
                >Cancel</button>
                
                {   
                    karyawan.action == "ubah" &&
                    <button 
                        className='py-2 text-center w-full rounded-md text-white mb-2 bg-red-500 hover:bg-red-700 transition ease-out'
                        onClick={handleClickHapusKaryawan}
                    >Hapus</button>
                }
            </div>

        </div>
    )
}

export default TambahUbahKaryawan