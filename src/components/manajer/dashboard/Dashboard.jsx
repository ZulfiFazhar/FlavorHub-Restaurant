"use client"

import React, { useEffect, useState, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Icon } from "@iconify/react";

import { hitungTotalPendapatanTahunIni, hitungTotalPendapatanBulanIni, hitungTotalPelangganTahunIni, hitungTotalPelangganBulanIni, getPendapatanPerBulan, generateChart } from './lib';

function Dashboard() {
  const [pembayaran, setPembayaran] = useState([]);
  const supabase = createClientComponentClient();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchDataPembayaran = async () => {
      const {data, error} = await supabase
        .from("pembayaran")
        .select("*");

      if(error){
        return alert("Error fetching data pembayaran");
      }else{
        setPembayaran(p => data);
      };
    }

    fetchDataPembayaran();
  }, [])

  const pendapatanTahunIni = hitungTotalPendapatanTahunIni(pembayaran);
  const pendapatanBulanIni = hitungTotalPendapatanBulanIni(pembayaran);
  const pelangganTahunIni = hitungTotalPelangganTahunIni(pembayaran);
  const pelangganBulanIni = hitungTotalPelangganBulanIni(pembayaran);

  useEffect(() => {
    // Menyiapkan data pembayaran
    const monthlyPendapatan = getPendapatanPerBulan(pembayaran);

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Buat chart
    generateChart(chartRef, chartInstanceRef, monthlyPendapatan);

  }, [pembayaran]);

  return (
    <div className='min-h-screen px-10 py-10'>
      <h1 className='text-4xl text-green-custom font-bold'>Dashboard</h1>

      <div className='flex mt-10 flex-wrap *:mb-5'>
        <div className='flex items-center shadow-[0_3px_13px_rgba(0,0,0,0.25)] px-3 py-5 rounded-md max-w-56 mr-4'>
          <div className='rounded-full bg-slate-100 p-2 mr-3'>
            <Icon icon={'mdi:chart-finance'} fontSize={24} className='text-green-custom text-lg' />
          </div>

          <div className='flex flex-col'>
            <p className='text-[0.5rem] mb-[-2px] text-slate-600'>Pendapatan tahun 2024</p>
            <p className='text-md font-semibold'>Rp. {pendapatanTahunIni}</p>
          </div>
        </div>

        <div className='flex items-center shadow-[0_3px_13px_rgba(0,0,0,0.25)] px-3 py-5 rounded-md max-w-56 mr-4'>
          <div className='rounded-full bg-slate-100 p-2 mr-3'>
            <Icon icon={'mdi:money-100'} fontSize={24} className='text-green-custom text-lg' />
          </div>

          <div className='flex flex-col'>
            <p className='text-[0.5rem] mb-[-2px] text-slate-600'>Pendapatan bulan Agustus</p>
            <p className='text-md font-semibold'>Rp. {pendapatanBulanIni}</p>
          </div>
        </div>

        <div className='flex items-center shadow-[0_3px_13px_rgba(0,0,0,0.25)] px-3 py-5 rounded-md max-w-56 mr-4'>
          <div className='rounded-full bg-slate-100 p-2 mr-3'>
            <Icon icon={'mdi:chart-finance'} fontSize={24} className='text-green-custom text-lg' />
          </div>

          <div className='flex flex-col'>
            <p className='text-[0.5rem] mb-[-2px] text-slate-600'>Pelanggan tahun 2024</p>
            <p className='text-md font-semibold'>{pelangganTahunIni}</p>
          </div>
        </div>
        <div className='flex items-center shadow-[0_3px_13px_rgba(0,0,0,0.25)] px-3 py-5 rounded-md max-w-56 mr-4'>
          <div className='rounded-full bg-slate-100 p-2 mr-3'>
            <Icon icon={'mdi:chart-finance'} fontSize={24} className='text-green-custom text-lg' />
          </div>

          <div className='flex flex-col'>
            <p className='text-[0.5rem] mb-[-2px] text-slate-600'>Pelanggan bulan Agustus</p>
            <p className='text-md font-semibold'>{pelangganBulanIni}</p>
          </div>
        </div>
      </div>

      <div id='chart'>
          <canvas ref={chartRef} className="mt-5"></canvas>
      </div>
    </div>
  )
}

export default Dashboard