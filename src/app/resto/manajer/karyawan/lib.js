export async function tambahUbahKaryawan(supabase, karyawanForm, karyawan, preview, setPreview, setKaryawanForm, setSelectedKaryawan){
    // Ambil data form
    const newKaryawan = {...karyawanForm}

    // Validasi form
    const adaFieldKosong = newKaryawan.nama == "" || newKaryawan.jabatan == "" || newKaryawan.jenis_kelamin == "" || newKaryawan.email == "" || newKaryawan.no_telepon == "" || newKaryawan.tanggal_lahir == "" || newKaryawan.umur == ""

    if(adaFieldKosong){
        return alert("Semua field harus diisi")
    }

    // Konfirmasi
    let yakinSumbit;
    if(karyawan.action == "tambah"){
        yakinSumbit = confirm("Yakin untuk menambahkan data karyawan?")
    }else if(karyawan.action == "ubah"){
        yakinSumbit = confirm("Yakin untuk mengubah data karyawan?")
    }
    if(!yakinSumbit){
        return;
    }

    // Proses data
    if(karyawan.action == "tambah"){
        newKaryawan.lama_kerja = 0
    }

    let fotoBlob;
    let fotoString;
    if(newKaryawan.foto != ""){
        fotoBlob = newKaryawan.foto
        fotoString = `${newKaryawan.nama}-${Date.now().toString()}.${fotoBlob.type.split("/")[1]}`
        newKaryawan.foto = fotoString 
    }else{
        newKaryawan.foto = null
    }

    // Tambah atau ubah data
    let data, error;
    if(karyawan.action == "ubah"){
        ({data, error} = await supabase
            .from('karyawan')
            .update(newKaryawan)
            .eq('id',karyawan.id))

        // Jika gambar baru maka gambar lama dihapus
        if(preview.status == "new"){
            let fotoName = karyawan.foto;
            let directory = "karyawan"
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

    }else if(karyawan.action == "tambah"){
        ({data, error} = await supabase
            .from('karyawan')
            .insert([newKaryawan]))

        if(error){
            return alert("Gagal tambah data karyawan")
        }

    }

    // Jika tambah foto
    if(preview && preview.status == "new"){
        const formData = new FormData();
        formData.append('file', fotoBlob);
        formData.append('fotoName', fotoString)
        formData.append('directory', "karyawan")
    
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
    
        if (res.ok) {
            setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", foto:""}))
            setPreview(p => null)
            setSelectedKaryawan(sk => false)
            if(karyawan.action == "tambah"){
                return alert("Tambah karyawan berhasil")
            }else{
                return alert("Edit karyawan berhasil")
            }
        } else {
            if(karyawan.action == "tambah"){
                return alert("Tambah karyawan gagal")
            }else{
                return alert("Edit karyawan gagal")
            }
        }

    }else{
        if(karyawan.action == "tambah"){
            return alert("Tambah karyawan berhasil")
        }else{
            return alert("Edit karyawan berhasil")
        }
    }
}