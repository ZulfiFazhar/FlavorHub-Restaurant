import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';

export function hitungTotalPendapatanTahunIni(pembayaran) {
    const totalPendapatan = pembayaran.reduce((acc, cur) => {
        return acc + parseInt(cur.total_tagihan);
    }, 0);
    return totalPendapatan
}

export function hitungTotalPendapatanBulanIni(pembayaran) {
    const date = new Date();
    const curMonth = (date.getMonth() + 1).toString().padStart(2, "0")

    const totalPendapatan = pembayaran.reduce((acc, cur) => {
        if(cur.created_at.split("-")[1] == curMonth){
        console.log(cur.created_at)
        return acc + parseInt(cur.total_tagihan);
        }
        return acc;
    }, 0);
    return totalPendapatan
}

export function hitungTotalPelangganTahunIni(pembayaran){
    const totalPelanggan = pembayaran.length;
    return totalPelanggan;
}

export function hitungTotalPelangganBulanIni(pembayaran){
    const date = new Date();
    const curMonth = (date.getMonth() + 1).toString().padStart(2, "0")

    let totalPelanggan = 0
    pembayaran.forEach(pb => {
        if(pb.created_at.split("-")[1] == curMonth){
        totalPelanggan += 1;
        }
    })
    return totalPelanggan;
}

export function getPendapatanPerBulan(pembayaran){
    const currentYear = new Date().getFullYear();
    const monthlyPendapatan = Array(12).fill(0);

    pembayaran.forEach(item => {
      const date = new Date(item.created_at);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (year === currentYear) {
        monthlyPendapatan[month] += parseInt(item.total_tagihan, 10);
      }
    });

    return monthlyPendapatan;
}

export function generateChart(chartRef, chartInstanceRef, monthlyPendapatan){
    Chart.register(ChartDataLabels);
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [{
            label: 'Pendapatan (Rp)',
            data: monthlyPendapatan,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.3,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            }
          },
          plugins: {
            datalabels: {
              align: 'end',         
              anchor: 'end',
              offset:-5,
              color: '#999',
              font: {
                size : 10,
                // weight: 'bold'
              },
              formatter: (value) => `Rp. ${value.toLocaleString()}`
            }
          }
        }
    });

    // Cleanup function to destroy chart instance on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
}