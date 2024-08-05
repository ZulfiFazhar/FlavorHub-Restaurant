export async function tambahMenu(supabase, formTambahMenu, setFormTambahMenu, setPreview, setBukaDetam, setRefetch) {
    // Validasi form
    const {nama_masakan, kategori, deskripsi, harga, foto} = formTambahMenu
    if(nama_masakan == '' || kategori == '' || deskripsi == '' || harga == ''){
        return alert("Semua input harus diisi.")
    }

    // Preproses foto
    let fotoString;
    if(foto != "" && foto != null){
        fotoString = `${nama_masakan}-${Date.now().toString()}.${foto.type.split("/")[1]}`
    }else{
        fotoString = null
    }

    // Object data menu baru
    let newMenu = {
        nama_masakan,
        kategori,
        opsi:null,
        harga,
        deskripsi,
        foto : fotoString
    }

    // Tambah data ke tabel menu
    const {dataMenu, errorMenu} = await supabase
            .from('menu')
            .insert([newMenu], { returning: 'representation' })
    
        if(errorMenu){
            return alert("Error insert new menu: ",errorMenu)
        }


    // Upload gambar ke file system
    if(fotoString != null) {
        const formData = new FormData();
        formData.append('file', foto);
        formData.append('fotoName', fotoString)
        formData.append('directory', "menu")
    
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
    
        if (res.ok) {
            setFormTambahMenu(tb => ({nama_masakan:'',kategori:'',deskripsi:'',harga:'',foto:''}))
            setPreview(p => null)
            setBukaDetam(bd => false)
            setRefetch(r => !r)
            return alert("Tambah menu berhasil")
        } else {
            return alert("Tambah menu gagal")
        }
    }
}

export async function editMenu(supabase, formTambahMenu, setFormTambahMenu, preview, setPreview, setBukaDetam, setRefetch, id, oldFotoName) {
    // Validasi
    const {nama_masakan, kategori, deskripsi, harga, foto} = formTambahMenu
    if(nama_masakan == '' || kategori == '' || deskripsi == '' || harga == ''){
        return alert("Semua input harus diisi.")
    }

    // Preproses foto
    let fotoString;
    if(foto != "" && foto != null){
        fotoString = `${nama_masakan}-${Date.now().toString()}.${foto.type.split("/")[1]}`
    }else{
        fotoString = null
    }

    // Object data menu baru
    let updatedMenu = {
        nama_masakan,
        kategori,
        harga,
        deskripsi,
    }

    if(preview.status == 'new'){
        updatedMenu.foto = fotoString;
    }

    // Update data menu
    const {dataUpdate, errorUpdate} = await supabase
        .from('menu')
        .update(updatedMenu)
        .eq("id", id)

    if(errorUpdate){
        return alert("Error update menu: ",errorUpdate)
    }

    // Hapus gambar menu lama di file system jika gambar di update
    if(preview.status == 'new'){
        let fotoName = oldFotoName;
        let directory = "menu"
        const res = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fotoName, directory }), 
        });

        if(res.ok){
            console.log("berhasil")
        }
    }

    // Upload gambar ke file system
    if(fotoString != null) {
        const formData = new FormData();
        formData.append('file', foto);
        formData.append('fotoName', fotoString)
        formData.append('directory', "menu")
    
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
    
        if (!res.ok) {
            return alert("Edit menu gagal")
        }
    }

    // Reset state
    setFormTambahMenu(tb => ({nama_masakan:'',kategori:'',deskripsi:'',harga:'',foto:''}))
    setPreview(p => null)
    setBukaDetam(bd => false)
    setRefetch(r => !r)
    return alert("Tambah menu berhasil")
}

export async function hapusMenu(supabase, selectedMenu, setBukaDetam, setRefetch){
    if(!confirm("Apakah anda yakin ingin menghapus menu ini?")){
        return;
    }

    const {data, error} = await supabase
        .from("menu")
        .delete()
        .eq("id", selectedMenu.id);

    if(error){
        return alert("Hapus menu gagal")
    }

    if(selectedMenu.foto != null){
        let fotoName = selectedMenu.foto;
        const res = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fotoName }), 
        });

        if(!res.ok){
            alert("Gambar lama gagal dihapus")
        }
    }

    setBukaDetam(bd => false)
    setRefetch(r => !r)
    return alert("Menu berhasil dihapus")
}
