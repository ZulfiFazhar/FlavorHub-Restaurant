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
        handleClickPesan(namaInputRef, searchInputRef, menuDipesan, setMenuDipesan, setMenuHasilPencarian, respesModal, setRespesModal, supabase)
    }
    
    const handleClickCancel = () => {
        setRespesModal(rm => false)
    }

  return (
    <div className='w-1/2 flex flex-col items-center green-custom mx-4 rounded-md py-2 px-4'>
        <div className='self-start'>Reservasi</div>

        <h2 className=' text-7xl mb-5'>{respesModal.nomor_meja}</h2>
        
        <div className='flex flex-col w-full'>
            <label htmlFor='pemesan'>Pemesan</label>
            <input ref={namaInputRef} id='pemesan' className='px-2 rounded-md border border-black mb-2 w-full' autoComplete='off'></input>
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

        <div className='flex justify-between w-5/6 flex-none mt-auto'>
            <button className='border border-black rounded-md bg-red-400 px-2 hover:bg-red-500' onClick={handleClickCancel}>Cancel</button>

            <button className='border border-black rounded-md bg-green-400 px-2 hover:bg-green-500' onClick={handleClickPsn}>Pesan</button>
        </div>
    </div>
  )
}

export default ReservasiPesanInput