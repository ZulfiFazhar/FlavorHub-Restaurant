import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState, useRef } from 'react'

// Local library
import { resetInterfaceState, handleClickPesan } from '../../library/reservasiPesan'

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
        resetInterfaceState(setMenuDipesan,setMenuHasilPencarian,searchInputRef,namaInputRef)
    }, [respesModal])

    useEffect(() => {
        const fetchMenu = async () => {
            const {data, error} = await supabase.from('menu').select("*")

            if(error)console.log(error)
            if(data)setMenu(data)
        }

        fetchMenu()
    }, [])

    const handleClickPsn = () => {
        handleClickPesan(namaInputRef, searchInputRef, menuDipesan, setMenuDipesan, setMenuHasilPencarian, respesModal, supabase)
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

        <button className=' flex-none mt-auto border border-black rounded-md' onClick={handleClickPsn}>Pesan</button>
    </div>
  )
}

export default ReservasiPesanInput