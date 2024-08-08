export async function tambahKaryawan(supabase, karyawanForm, setPreview, setKaryawanForm, setSelectedKaryawan, setRefetch){
    // Ambil data form
    const {nama, foto, jabatan, jenis_kelamin, email, no_telepon, tanggal_lahir, umur, password,passwordConfirm} = karyawanForm;

    // Validasi form
    const adaFieldKosong = nama == "" || jabatan == "" || jenis_kelamin == "" || email == "" || no_telepon == "" || tanggal_lahir == "" || umur == "" || password == "" || passwordConfirm == ""

    if(adaFieldKosong){
        return alert("Semua field harus diisi")
    }
    if(password != passwordConfirm){
        return alert("Konfirmasi password tidak valid")
    }

    // Konfirmasi
    let yakinSumbit = confirm("Yakin untuk menambahkan data karyawan?")
    if(!yakinSumbit){
        return;
    }

    // Preproses foto
    let fotoBlob;
    let fotoString;
    if(foto != ""){
        fotoBlob = foto
        fotoString = `${nama}-${Date.now().toString()}.${fotoBlob.type.split("/")[1]}`
    }else{
        fotoString = null
    }

    // Object data karyawan baru
    const newKaryawan = {
        nama,
        email,
        no_telepon,
        lama_kerja:0,
        tanggal_lahir,
        umur,
        jenis_kelamin,
        jabatan,
        foto:fotoString
    }

    // Tambah data ke tabel karyawan
    const {dataTambah, errorTambah} = await supabase
        .from('karyawan')
        .insert([newKaryawan])

    if(errorTambah){
        return alert("Gagal tambah data karyawan")
    }

    // Jika tambah foto
    if(fotoString != null){
        const formData = new FormData();
        formData.append('file', fotoBlob);
        formData.append('fotoName', fotoString)
        formData.append('directory', "karyawan")

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            return alert("Tambah karyawan gagal")
        }
    }    

    // Reset state
    setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", foto:"", password:"", passwordConfirm:""}))
    setPreview(p => null)
    setSelectedKaryawan(sk => false)
    setRefetch(r => !r)
    return alert("Tambah karyawan berhasil")

}

export async function ubahKaryawan(supabase, karyawanForm, preview, setPreview, setKaryawanForm, setSelectedKaryawan, setRefetch, id, fotoLama){
    // Ambil data form
    const {nama, foto, jabatan, jenis_kelamin, email, no_telepon, tanggal_lahir, umur} = karyawanForm;

    // Validasi form
    const adaFieldKosong = nama == "" || jabatan == "" || jenis_kelamin == "" || email == "" || no_telepon == "" || tanggal_lahir == "" || umur == ""

    if(adaFieldKosong){
        return alert("Semua field harus diisi")
    }

    // Konfirmasi
    let yakinSumbit = confirm("Yakin untuk mengedit data karyawan?")
    if(!yakinSumbit){
        return;
    }

    // Object data karyawan yang sudah terupdate
    const newKaryawan = {
        nama,
        email,
        no_telepon,
        tanggal_lahir,
        umur,
        jenis_kelamin,
        jabatan,
    }

    // Preproses foto
    let fotoBlob;
    let fotoString;
    if(preview.status == "new"){
        fotoBlob = foto
        fotoString = `${nama}-${Date.now().toString()}.${fotoBlob.type.split("/")[1]}`
        newKaryawan.foto = fotoString
    }else{
        fotoString = null
    }

    // Ubah data
    const {dataEdit, errorEdit} = await supabase
        .from('karyawan')
        .update(newKaryawan)
        .eq('id', id)

    if(errorEdit){
        return alert("Gagal mengedit data karyawan")
    }

    // Jika gambar baru maka gambar lama dihapus
    if(preview.status == "new"){
        let fotoName = fotoLama;
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

    // Jika ubah foto
    if(fotoString != null){
        const formData = new FormData();
        formData.append('file', fotoBlob);
        formData.append('fotoName', fotoString)
        formData.append('directory', "karyawan")

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            return alert("Edit karyawan gagal")
        }
    }    

    // Reset state
    setKaryawanForm(kf => ({nama:"", jabatan:"", jenis_kelamin:"", email:"", no_telepon:"", tanggal_lahir:"", umur:"", foto:"", password:"", passwordConfirm:""}))
    setPreview(p => null)
    setSelectedKaryawan(sk => false)
    setRefetch(r => !r)
    return alert("Edit karyawan berhasil")

}


export async function hapusKaryawan(supabase, id, setSelectedKaryawan, setRefetch){
    // Konfirmasi
    let yakinHapus = confirm("Yakin untuk menghapus data karyawan?")
    if(!yakinHapus){
        return;
    }

    // Hapus data
    const {dataHapus, errorHapus} = await supabase
        .from("karyawan")
        .delete()
        .eq("id", id)

    if(errorHapus){
        return alert("Gagal menghapus data karyawan")
    }

    // Refetch and reset state
    setRefetch(r => !r)
    setSelectedKaryawan(sk => false)

    return alert("Hapus karyawan berhasil")
}