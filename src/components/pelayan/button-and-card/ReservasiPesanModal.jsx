import React from 'react'

// local components
import ReservasiPesanInput from './reservasi-pesan/ReservasiPesanInput'
import ReservasiPesanDetail from './reservasi-pesan/ReservasiPesanDetail';

function ReservasiPesanModal({respesModal, setRespesModal}) {


    if(!respesModal){
        return (
            <div className='w-1/2 mx-4'>
            </div>
        )
    }

    let content;
    if(respesModal?.status == "kosong"){
      content = <ReservasiPesanInput respesModal={respesModal} setRespesModal={setRespesModal} />
    }else{
      content = <ReservasiPesanDetail respesModal={respesModal} setRespesModal={setRespesModal} />
    }
  return (
    <>
      {content}
    </>
  )
}

export default ReservasiPesanModal