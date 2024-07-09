"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState, useEffect } from 'react'
import TambahMenu from './TambahMenu'
import DetailMenu from './DetailMenu'

function page() {
  const [menu, setMenu] = useState()
  // Detam = detail atau tambah
  const [bukaDetam, setBukaDetam] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchMenu = async () => {
      const {data, error} = await supabase
        .from('menu')
        .select('*')

      if(error){
        return alert('Error fetch data : ',error)
      }else{
        setMenu(m => data)
        setSelectedMenu(m => data[3])
      }
    }

    fetchMenu()
  }, [])

  const handleClickMenuCard = (menu) => {
    setSelectedMenu(sm => menu)
    setBukaDetam(bd => 'detail')
  }

  return (
    <div className='min-h-screen flex'>
      <div className='w-2/3 p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl'>Menu</h1>
          
          <input className='bg-slate-200 rounded-md px-2 text-sm p-1' placeholder='Search' autoComplete='off'></input>

          <button className='orange-custom rounded-md text-white text-sm px-2 py-1' onClick={() => setBukaDetam(bd => "tambah")}>+ Tambah Menu</button>
        </div>

        <div className='mt-5 flex flex-wrap justify-start *:mr-2 *:mb-2'>
          {menu?.map(mn => {
            return (
              <div key={mn.id} className='bg-slate-200 rounded-md p-2 w-32' >
                <h1 className='text-md'>{mn.nama_masakan}</h1>
                <p className='text-[0.5rem]'>{mn.deskripsi}</p>
                <div className='flex justify-between mt-1'>
                  <p className='text-xs'><span className='text-orange-custom'>Rp. </span> {mn.harga}</p>
                  <button className='px-2 text-xs orange-custom text-white rounded-full' onClick={() => handleClickMenuCard(mn)}>detail</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {
        bukaDetam == "none" && 
        <div className='w-1/3'></div> 
      }
      {
        bukaDetam == "tambah" && 
        <TambahMenu supabase={supabase} />
      }
      {
        bukaDetam == "detail" && 
        <DetailMenu selectedMenu={selectedMenu} setBukaDetam={setBukaDetam}  /> 
      }
        
    </div>
  )
}

export default page