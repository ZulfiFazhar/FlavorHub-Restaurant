// Pelayan memesan menu setelah mengisi form pemesanan
// Fungsi: validasi form, insert data pesanan, update data meja (reservasi_pesanan), reset interface state
export const handleClickPesan = async (menuDipesan, setMenuDipesan, setMenuHasilPencarian, respesModal, setRespesModal, input, setInput, supabase) => {
    // validasi nama pemesan
    let nama_pemesan = ''
    // if(namaInputRef.current && namaInputRef.current.value == ""){
    //     return alert("Nama pemesan harus diisi")
    // }else{
    //     nama_pemesan = namaInputRef.current.value
    // }
    if(input.nama == ""){
        return alert("Nama pemesan harus diisi")
    }else{
        nama_pemesan = input.nama
    }

    // buat pesanan dengan format mengikuti tabel pesanan kolom pesanan
    let invalid = false
    let totalHarga = 0
    const formattedPesanan = menuDipesan.map(md => {
        if(md.opsi != null && md.opsiDipilih == ""){
            invalid = true
        }
        let formattedmd = {
            id: md.id,
            nama_masakan : md.nama_masakan,
            opsi : md.opsiDipilih,
            jumlah : md.jumlah,
            harga : md.harga * md.jumlah
        }
        totalHarga += formattedmd.harga
        return formattedmd
    })
    
    // validasi opsi yang kosong
    if(invalid)return alert("Opsi harus diisi")

    // buat objek pesanan baru mengikuti tabel pesanan
    const newPesanan = {
        nama_pemesan : nama_pemesan,
        nomor_meja : respesModal.nomor_meja,
        pesanan : formattedPesanan,
        status : 'dipesan',
        total_harga : totalHarga
    }
    // insert new pesanan data
    const {dataPes, errorPes} = await supabase
        .from("pesanan")
        .insert([newPesanan])
    
    if(errorPes){
        return console.log(errorPes)
    }else{
        console.log(dataPes)
    }

    // Reset interface state
    resetInterfaceState(setMenuDipesan, setMenuHasilPencarian, setInput)

    // Update status meja dalam tabel reservasi_pesanan
    const {dataRespes, errorRespes} = await supabase
        .from('reservasi_pesanan')
        .update({status:'dipesan', nama_pemesan:nama_pemesan, pesanan:formattedPesanan})
        .eq('id', respesModal.id)

    if(errorRespes){
        return console.log(errorRespes)
    }else{
        console.log(dataRespes)
    }

    setRespesModal(rm => false)
} 

// Reset state yang berfungsi untuk interface
export const resetInterfaceState = (setMenuDipesan, setMenuHasilPencarian, setInput) => {
    setMenuDipesan(md => [])
    setMenuHasilPencarian(mhp => [])
    // if(searchInputRef.current)searchInputRef.current.value = ''
    // if(namaInputRef.current)namaInputRef.current.value = ''
    setInput(i => ({nama:"", pencarian:""}))
}