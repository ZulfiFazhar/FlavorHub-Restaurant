import React, {useEffect, useState} from 'react'
import Image from 'next/image'

function TambahUbahKaryawan({karyawan, setSelectedKaryawan}) {
    const [karyawanForm, setKaryawanForm] = useState(
            {nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", lama_kerja:""}
        )

    useEffect(() => {
        if(karyawan.action == "ubah"){
            setKaryawanForm(kf => ({...karyawan}))
        }else{
            setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", lama_kerja:""}))
        }
    }, [karyawan])

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
                    onClick={() => setSelectedKaryawan(sk => false)}
                >Submit</button>
            </div>

        </div>
    )
}

export default TambahUbahKaryawan