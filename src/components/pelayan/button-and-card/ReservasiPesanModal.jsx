import React from 'react'

// local components
import ReservasiPesanInput from './reservasi-pesan/ReservasiPesanInput'
import ReservasiPesanDetail from './reservasi-pesan/ReservasiPesanDetail';

function ReservasiPesanModal({respesModal, setRespesModal}) {


    if(!respesModal){
        return (
            <></>
        )
    }

    let content;
    if(respesModal?.status == "kosong"){
      content = <ReservasiPesanInput respesModal={respesModal} setRespesModal={setRespesModal} />
    }else if(respesModal?.status == "dipesan"){
      content = <ReservasiPesanDetail respesModal={respesModal} setRespesModal={setRespesModal} />
    }
    console.log(respesModal)
  return (
    <>
      {content}
    </>
  )
}

export default ReservasiPesanModal