import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function MejaButton({respesModal, setRespesModal, properti}) {

    const handleClick = () => {
        setRespesModal(rm => properti)
    }
    
  return (
    <div className=' flex'>

        <div className={`flex flex-col justify-start items-center w-28 h-fit pb-1 rounded-md bg-white pt-3 hover:cursor-pointer border border-black`} onClick={handleClick}>
            <h3 className={`text-3xl w-5/6 flex justify-center py-3 mb-1 border border-black rounded-md ${properti.status == 'kosong' ? 'green-custom' : 'orange-custom'}`}>
                {properti.nomor_meja}
            </h3>

            <div className='w-5/6 text-xs'>
                <span className='block'>Status: {properti.status}</span>
                <span className=''>Pemesan: 
                {properti.nama_pemesan != null &&
                    <span className=''> {properti.nama_pemesan}</span>
                }
                </span>
            </div>
        </div>

    </div>
  )
}

export default MejaButton