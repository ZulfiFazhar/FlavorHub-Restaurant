"use client"

import React, {useEffect, useState} from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Local components
import PesananCards from './button-and-card/pesanan/PesananCards'

function PesananKoki() {
    const [pesanan, setPesanan] = useState([])
    const supabase = createClientComponentClient()

    // Fetch pesanan data
    useEffect(() => {
        const fetchPesananData = async () => {
            const {data, error} = await supabase
                .from('pesanan')
                .select('*')
            
            if(error)console.log(error)
            if(data){
                const undonePesanan = data.filter(psn => psn.status != 'selesai' && psn.status != 'sudah dibayar')
                setPesanan(p => undonePesanan)
            }
        }

        fetchPesananData()
    }, [])

    useEffect(() => {
        const subscribeToPesanan = supabase
        .channel('pesanan-subscribe')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'pesanan'
        }, (payload) => {
            // Update the state with new data depending on action
            if(payload.eventType == 'INSERT'){
                setPesanan((p) => [payload.new, ...p]);
            }else if(payload.eventType == 'UPDATE'){
                // Jika update-nya berupa status menjadi 'selesai'
                if(payload.new.status == 'selesai'){
                    setPesanan(prevPesanan => {
                        return prevPesanan.filter(psn => psn.id != payload.new.id)
                    })
                }else{
                    setPesanan((prevPesanan) => {
                        return prevPesanan.map(psn => (psn.id === payload.new.id ? payload.new : psn))
                    })
                }
            }
        })
        .subscribe();

        // Cleanup subscription on component unmount
        return () => {
        subscribeToPesanan.unsubscribe();
        };
    }, [supabase]);
  
    return (
        <PesananCards pesanan={pesanan} supabase={supabase} setPesanan={setPesanan} />
    )

}

export default PesananKoki