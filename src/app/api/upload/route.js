import { promises as fs } from "fs"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(request){
  const data = await request.formData()
  const file = data.get("file")
  const namaFile = data.get("fotoName")

  if(!file){
    return NextResponse.json({success:false})
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join(process.cwd(), 'public', 'menu', namaFile);
  await fs.writeFile(path, buffer)

  return NextResponse.json({success:true})

}

export async function DELETE(request) {
  try {
    const { fotoName } = await request.json(); 

    if (!fotoName) {
      return NextResponse.json({ success: false, message: 'File name not provided' });
    }

    const path = join(process.cwd(), 'public', 'menu', fotoName);

    try {
      await fs.unlink(path); 
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'File not found or could not be deleted' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid request' });
  }
}