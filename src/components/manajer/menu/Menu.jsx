"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import TambahMenu from './TambahMenu'
import DetailMenu from './DetailMenu'

export const getServerSideProps = async () => {
  return {
    props: {},
    headers: {
      'Cache-Control': 'no-store',
    },
  };
};

function selectedMenu() {
  const [menu, setMenu] = useState()
  const [cariMenu, setCariMenu] = useState("")
  // Detam = detail atau tambah
  const [bukaDetam, setBukaDetam] = useState("tambah")
  const [selectedMenu, setSelectedMenu] = useState()
  const [refetch, setRefetch] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter();

  useEffect(() => {
    const fetchDataMenu = async () => {
        const {data, error} = await supabase
            .from("menu")    
            .select("*")

        if(error){
            return alert("Error fetch data : ",error)
        }else{
            setMenu(k => data)
        }
    }

    fetchDataMenu()
}, [refetch])

  const handleClickMenuCard = (menu) => {
    setSelectedMenu(sm => menu)
    setBukaDetam(bd => 'detail')
  }

  const handleClickEdit = (menu) => {
    setSelectedMenu(sm => menu)
    setBukaDetam(bd => 'edit')
  }

  let filteredMenu = menu?.filter(mn => {
    return mn.nama_masakan.toLowerCase().includes(cariMenu.toLowerCase());
  }) || []; 
  
  // Sort by created_at
  filteredMenu.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA - dateB;
  });

  return (
    <div className='min-h-screen flex'>
      <div className='w-2/3 p-10'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl text-green-custom font-bold mb-1'>Menu</h1>
          
          <div className='flex items-stretch ml-6'>
            <input 
              className='bg-slate-200 rounded-md px-2 text-sm p-1' 
              placeholder='Search' 
              autoComplete='off'
              value={cariMenu}
              onChange={() => setCariMenu(event.target.value)} />  

              <button className={`ml-1 rounded-xl bg-red-400 text-white px-2 hover:bg-red-600 pb-[0.1rem] ${cariMenu == "" && 'bg-white hover:bg-white cursor-default'}`}
                onClick={() => setCariMenu(cm => "")}>
                x
              </button>
          </div>

          <button className='text-center py-1 px-2 w-40 bg-orange-400 hover:bg-orange-500  transition ease-out rounded-md text-white' onClick={() => setBukaDetam(bd => "tambah")}>+ Tambah Menu</button>
        </div>

        <div className='mt-5 overflow-y-auto max-h-[38rem] flex flex-wrap justify-between *:mb-5 bg-slate-100 p-5 rounded-md h-5/6'>
          {filteredMenu?.map(mn => {
            return (
              <div key={mn.id} className='flex flex-col bg-slate-200 rounded-md p-2 w-32 h-72 mr-2' >
                <div className="relative w-full min-h-20 h-20">
                  <img
                    src={`/menu/${mn.foto ? mn.foto : 'placeholder/menu-foto-placeholder.jpg'}`}
                    alt="Foto menu"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h1 className='text-md'>{mn.nama_masakan}</h1>

                <p className='text-[0.6rem] mb-1 h-full overflow-y-hidden'>{mn.deskripsi} daging sapi denak sekali dengan tambahan warna yang enak</p>

                <div className='flex justify-between mb-2'>
                  <p className='text-xs'><span className='text-orange-custom'>Rp. </span> {mn.harga}</p>
                </div>

                <button className='mb-2 px-2 py-1 text-xs text-white rounded-md bg-green-600 hover:bg-green-800 transition-all ease-out' onClick={() => handleClickMenuCard(mn)}>detail</button>

                <button className='px-2 py-1 text-xs text-white rounded-md bg-orange-400 hover:bg-orange-600 transition-all ease-out' onClick={() => handleClickEdit(mn)}>edit</button>
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
        <TambahMenu 
          key={Math.random()}
          supabase={supabase} 
          setBukaDetam={setBukaDetam}
          menu={{action:"tambah"}}
          setRefetch={setRefetch} />
      }
      {
        bukaDetam == "edit" && 
        <TambahMenu 
          key={Math.random()}
          supabase={supabase} 
          setBukaDetam={setBukaDetam}
          menu={{...selectedMenu, action:"edit"}}
          setRefetch={setRefetch} />
      }
      {
        bukaDetam == "detail" && 
        <DetailMenu 
          selectedMenu={selectedMenu} 
          setBukaDetam={setBukaDetam} 
          supabase={supabase}
          setRefetch={setRefetch} /> 
      }
        
    </div>
  )
}

export default selectedMenu