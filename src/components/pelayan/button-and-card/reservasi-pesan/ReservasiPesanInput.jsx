import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState, useRef } from 'react'

// Local components
import MenuDipilihCards from './reservasi-pesan-input-bc/MenuDipilihCards'
import PencarianMenu from './reservasi-pesan-input-bc/PencarianMenu'


function ReservasiPesanInput({respesModal, setRespesModal}) {
    const [menu, setMenu] = useState(null)
    const [menuDipesan, setMenuDipesan] = useState([])
    const [menuHasilPencarian, setMenuHasilPencarian] = useState([])
    const searchInputRef = useRef(null)
    const namaInputRef = useRef(null)
    const supabase = createClientComponentClient()

    useEffect(() => {
        resetInterfaceState()
    }, [respesModal])

    const resetInterfaceState = () => {
        setMenuDipesan(md => [])
        setMenuHasilPencarian(mhp => [])
        if(searchInputRef.current)searchInputRef.current.value = ''
        if(namaInputRef.current)namaInputRef.current.value = ''
    }

    useEffect(() => {
        const fetchMenu = async () => {
            const {data, error} = await supabase.from('menu').select("*")

            if(error)console.log(error)
            if(data)setMenu(data)
        }

        fetchMenu()
    }, [])

    const handleClickPesan = async () => {
        let nama_pemesan = ''
        if(namaInputRef.current && namaInputRef.current.value == ""){
            return alert("Nama pemesan harus diisi")
        }else{
            nama_pemesan = namaInputRef.current.value
        }

        let invalid = false
        const formattedPesanan = menuDipesan.map(md => {
            if(md.opsi != null && md.opsiDipilih == ""){
                invalid = true
            }
            let formattedmd = {
                nama_masakan : md.nama_masakan,
                opsi : md.opsiDiplih,
                jumlah : md.jumlah
            }
            return formattedmd
        })
        
        if(invalid)return alert("Opsi harus diisi")
        
        const newPesanan = {
            nama_pemesan : nama_pemesan,
            nomor_meja : respesModal.nomor_meja,
            pesanan : formattedPesanan,
            status : 'dipesan'
        }

        // insert new pesanan data
        const {data, error} = await supabase
            .from("pesanan")
            .insert([newPesanan])
        
        if(error){
            return console.log(error)
        }else{
            console.log(data)
        }

        // Reset interface state
        resetInterfaceState()
    } 

  return (
    <div className='w-1/2 flex flex-col bg-blue-100 min-h-screen py-2 px-4'>
        <h2>Reservasi dan Pesan</h2>
        <h2>Meja : {respesModal.nomor_meja}</h2>
        
        <div>
            <label htmlFor='pemesan'>Pemesan : </label>
            <input ref={namaInputRef} id='pemesan' className='px-2 rounded-md border border-black mb-2'></input>
        </div>
        
        <PencarianMenu
            menu={menu}
            setMenuDipesan={setMenuDipesan}
            menuHasilPencarian={menuHasilPencarian}
            setMenuHasilPencarian={setMenuHasilPencarian}
            searchInputRef={searchInputRef}
        />

        <MenuDipilihCards 
            menuDipesan={menuDipesan} 
            setMenuDipesan={setMenuDipesan}
        />

        <button className=' flex-none mt-auto border border-black rounded-md' onClick={handleClickPesan}>Pesan</button>
    </div>
  )
}

export default ReservasiPesanInput