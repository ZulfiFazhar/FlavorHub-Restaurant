import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function TambahUbahKaryawan({karyawan, setSelectedKaryawan, setRefetch}) {
    const [karyawanForm, setKaryawanForm] = useState(
            {nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:""}
        )
    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        if(karyawan.action == "ubah"){
            setKaryawanForm(kf => {
                let newKaryawan = {...karyawan}
                delete newKaryawan.action
                return newKaryawan
            })
        }else{
            setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:""}))
        }
    }, [karyawan])


    const handleClickSubmitTambahKaryawan = async () => {
        // Ambil data form
        const newKaryawan = {...karyawanForm}
        console.log(newKaryawan)
        // Validasi form
        const adaFieldKosong = newKaryawan.nama == "" || newKaryawan.jabatan == "" || newKaryawan.jenis_kelamin == "" || newKaryawan.email == "" || newKaryawan.no_telepon == "" || newKaryawan.tanggal_lahir == "" || newKaryawan.umur == ""

        if(adaFieldKosong){
            return alert("Semua field harus diisi")
        }

        // Konfirmasi
        let yakinSumbit;
        if(karyawan.action == "tambah"){
            yakinSumbit = confirm("Yakin untuk menambahkan data karyawan?")
        }else if(karyawan.action == "ubah"){
            yakinSumbit = confirm("Yakin untuk mengubah data karyawan?")
        }
        if(!yakinSumbit){
            return;
        }

        // Proses data
        if(karyawan.action == "tambah"){
            newKaryawan.lama_kerja = 0
        }

        // Tambah atau ubah data
        let data, error;
        if(karyawan.action == "ubah"){
            ({data, error} = await supabase
                .from('karyawan')
                .update(newKaryawan)
                .eq('id',karyawan.id))
        }else if(karyawan.action == "tambah"){
            ({data, error} = await supabase
                .from('karyawan')
                .insert([newKaryawan]))
        }
        
        // Proses setelah selesai (berhasil atau eror)
        if(error){
            return alert("Error : ",error)
        }else{
            if(karyawan.action == "ubah"){
                alert("Data karyawan berhasil diubah.")
            }else if(karyawan.action == "tambah"){
                alert("Karyawan baru berhasil ditambahkan.")
            }

            // Reset state
            setSelectedKaryawan(sk => false)

            // Refetch data karyawan
            setRefetch(r => Date.now())
        }
    }

    return (
        <div className='w-1/3 h-full px-4 py-3 grey-custom rounded-md overflow-y-auto'>
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

            <div className='mt-3 flex justify-center w-full bg-slate-300'>
                <Image src={'/profileplaceholder.jpg'} height={150} width={150} alt='foto profil' />
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
                    <label htmlFor='tanggal_lahir'>Tanggal Lahir</label>
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