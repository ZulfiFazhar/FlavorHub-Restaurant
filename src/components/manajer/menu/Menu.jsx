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
  const [bukaDetam, setBukaDetam] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState()
  const supabase = createClientComponentClient()
  const router = useRouter();

  // Fetch data menu saat pertama kali load
  useEffect(() => {
    const fetchMenu = async () => {
      const {data, error} = await supabase
        .from('menu')
        .select('*')

      if(error){
        return alert('Error fetch data : ',error)
      }else{
        setMenu(m => data)
      }
    }

    fetchMenu()
  }, [])


  // Subcribe realtime ke menu
  useEffect(() => {
    const subscribeToMenu = supabase
    .channel('menu-subscribe')
    .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'menu'
    }, (payload) => {
        if(payload.eventType == "INSERT"){
          setMenu(m => [...m, payload.new]);
        }else if(payload.eventType == "UPDATE"){
          setMenu(m => m.map(mn => mn.id == payload.new.id ? payload.new : mn))          
          router.push("/resto/manajer/menu");
        }else if(payload.eventType == "DELETE"){
          setMenu(m => m.filter(mn => mn.id != payload.old.id));
        }
    })
    .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscribeToMenu.unsubscribe();
    };
  }, [supabase]);

  const handleClickMenuCard = (menu) => {
    setSelectedMenu(sm => menu)
    setBukaDetam(bd => 'detail')
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
      <div className='w-2/3 p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl'>Menu</h1>
          
          <div className='flex items-stretch ml-6'>
            <input 
              className='bg-slate-200 rounded-md px-2 text-sm p-1' 
              placeholder='Search' 
              autoComplete='off'
              value={cariMenu}
              onChange={() => setCariMenu(event.target.value)} />  

              <button className={`ml-1 rounded-xl bg-red-500 text-white px-2 hover:bg-red-600 ${cariMenu == "" && 'bg-white hover:bg-white'}`}
                onClick={() => setCariMenu(cm => "")}>
                x
              </button>
          </div>

          <button className='orange-custom rounded-md text-white text-sm px-2 py-1' onClick={() => setBukaDetam(bd => "tambah")}>+ Tambah Menu</button>
        </div>

        <div className='mt-5 overflow-y-auto max-h-[32rem] flex flex-wrap justify-center *:mr-8 *:mb-5'>
          {filteredMenu?.map(mn => {
            return (
              <div key={mn.id} className='flex flex-col bg-slate-200 rounded-md p-2 w-32' >
                <div className="relative w-full h-20 overflow-hidden">
                  <img
                    src={`/menu/${mn.foto ? mn.foto : 'placeholder/menu-foto-placeholder.jpg'}`}
                    alt="Foto menu"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h1 className='text-md'>{mn.nama_masakan}</h1>
                <p className='text-[0.5rem] mb-2'>{mn.deskripsi}</p>
                <div className='mt-auto flex justify-between '>
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
        <TambahMenu 
          key={Math.random()}
          supabase={supabase} 
          setBukaDetam={setBukaDetam}
          menu={{action:"tambah"}} />
      }
      {
        bukaDetam == "edit" && 
        <TambahMenu 
          key={Math.random()}
          supabase={supabase} 
          setBukaDetam={setBukaDetam}
          menu={{...selectedMenu, action:"edit"}} />
      }
      {
        bukaDetam == "detail" && 
        <DetailMenu 
          selectedMenu={selectedMenu} 
          setBukaDetam={setBukaDetam} 
          supabase={supabase}  /> 
      }
        
    </div>
  )
}

export default selectedMenu