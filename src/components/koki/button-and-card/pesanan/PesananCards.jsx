import React from 'react'


function PesananCards({pesanan, supabase, setPesanan}) {
    const handleClickUpdateStatus = async (id, newStatus) => {
        const {data, error} = await supabase
            .from('pesanan')
            .update({status: newStatus})
            .eq('id', id)

        if(error){
            console.log(error)
        }else{
            console.log(data)
        }
    }


  return (
    <div className='p-2'>
            {pesanan.map(psn => {
                return (
                    <div key={psn.id} className='border border-black rounded-md p-2 mb-3 flex'>

                            <div className='p-10 border border-black rounded-md mr-2 text-5xl'>{psn.nomor_meja}</div>

                            <div className='flex flex-col justify-start w-full'>
                                <div className='border border-black rounded-md px-2 mb-2 w-44'>
                                    <span className='block text-sm'>Pemesan: </span>
                                    {psn.nama_pemesan}
                                </div>

                                <div className='border border-black rounded-md p-2 '>
                                    <span className='block text-sm'>Pesanan: </span>

                                    <div className='flex flex-wrap'>
                                        {psn.pesanan.map(ps => {
                                            return (
                                                <div key={Math.random()} className='border border-black rounded-md px-2 mr-2'>
                                                    <span className='mr-2'>{ps.nama}</span>

                                                    {ps.opsi != false &&
                                                        <span className='mr-2 text-sm'>{ps.opsi}</span>
                                                    }

                                                    <span className=''>{ps.jumlah}</span> 
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>

                                {psn.status == 'dipesan' 
                                    &&
                                    <button className='border border-black rounded-md w-fit px-2 mt-2 self-end bg-green-600' onClick={() => handleClickUpdateStatus(psn.id,'dimasak')}>Masak</button>
                                }

                                {psn.status == 'dimasak'
                                    &&
                                    <button className='border border-black rounded-md w-fit px-2 mt-2 self-end bg-orange-600' onClick={() => handleClickUpdateStatus(psn.id,'diantar')}>Siap Diantar</button>
                                }

                            </div>

                    </div>
                )
            })}
        </div>
  )
}

export default PesananCards