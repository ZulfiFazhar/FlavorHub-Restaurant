import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'


function ReservasiPesanInput({respesModal, setRespesModal}) {
    const [menu, setMenu] = useState(null)

    useEffect(() => {
        const fetchMenu = async () => {
            const supabase = createClientComponentClient()
            const {data, error} = await supabase.from('menu').select("*")

            if(error)console.log(error)
            if(data){
                setMenu(data)
            }
        }

        fetchMenu()
    }, [])

    console.log(menu)

  return (
    <div className='w-1/2 bg-blue-100 min-h-screen'>
        <h2>Reservasi dan Pesan</h2>
        <h2>Meja : {respesModal.nomor_meja}</h2>
        
        <label htmlFor='pemesan'>Pemesan : </label>
        <input id='pemesan' className='px-2 rounded-md border border-black'></input>
        
        <div className=' w-60 flex justify-between border border-black p-2 rounded-md'>
            <h4>Burger</h4>
            <div className=' w-20 flex justify-between border border-black rounded-full'>
                <button className='px-2 border-r border-black rounded-full'>-</button>
                <span>2</span>
                <button className='px-2 border-l border-black rounded-full'>+</button>
            </div>
        </div>

    </div>
  )
}

export default ReservasiPesanInput