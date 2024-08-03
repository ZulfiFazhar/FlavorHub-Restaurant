import { promises as fs } from "fs"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(request){
  const data = await request.formData()
  
  const file = data.get("file")
  const namaFile = data.get("fotoName")
  const directory = data.get("directory")

  if(!file){
    return NextResponse.json({success:false})
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join(process.cwd(), 'public', directory, namaFile);
  await fs.writeFile(path, buffer)

  return NextResponse.json({success:true})

}

export async function DELETE(request) {
  try {
    const { fotoName, directory } = await request.json(); 

    if (!fotoName || !directory) {
      return NextResponse.json({ success: false, message: 'File name or directory not provided' });
    }

    const path = join(process.cwd(), 'public', directory, fotoName);

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