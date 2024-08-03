export async function tambahEditMenu(supabase, action, formTambahMenu, setFormTambahMenu, preview, setPreview, setBukaDetam, id = null, oldFotoName = null) {
    const {nama_masakan, kategori, deskripsi, harga, foto} = formTambahMenu
    if(nama_masakan == '' || kategori == '' || deskripsi == '' || harga == ''){
        return alert("Semua input harus diisi.")
    }

    let fotoString;
    if(foto != "" && foto != null){
        fotoString = `${nama_masakan}-${Date.now().toString()}.${foto.type.split("/")[1]}`
    }else{
        fotoString = null
    }

    let newMenu = {
        nama_masakan,
        kategori,
        opsi:null,
        harga,
        deskripsi,
        foto : fotoString
    }

    if(action == 'tambah'){
        const {data, error} = await supabase
            .from('menu')
            .insert([newMenu], { returning: 'representation' })
    
        if(error){
            return alert("Error insert new menu: ",error)
        }else{
            console.log(data)
        }
    }else if(action == 'edit'){
        let updatedMenu = {...newMenu};
        if(preview.status != 'new'){
            delete updatedMenu.foto;
        }

        const {dataUpdate, errorUpdate} = await supabase
            .from('menu')
            .update(updatedMenu)
            .eq("id", id)

        if(errorUpdate){
            return alert("Error update menu: ",errorUpdate)
        }else{
            console.log(dataUpdate)
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
        }else{
            setFormTambahMenu(tb => ({nama_masakan:'',kategori:'',deskripsi:'',harga:'',foto:''}))
            setPreview(p => null)
            setBukaDetam(bd => false)
            return alert("Ubah menu berhasil")
        }
    }

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
        if(action == "Tambah"){
            return alert("Tambah menu berhasil")
        }else{
            return alert("Edit menu berhasil")
        }
    } else {
        if(action == "Tambah"){
            return alert("Tambah menu gagal")
        }else{
            return alert("Edit menu gagal")
        }
    }
}