import React from 'react'

function PencarianMenu({menu, setMenuDipesan, menuHasilPencarian, setMenuHasilPencarian, searchInputRef}) {
    function handleTypeSearchMenu(e){
        const input = e.target.value.toLowerCase()
        if(input == ""){
            setMenuHasilPencarian(mhp => [])
            return
        }

        const filteredMenu = menu?.filter(item => item.nama_masakan.toLowerCase().includes(input))
        setMenuHasilPencarian(mhp => filteredMenu)        
    }

    const handleClickDeleteSearchInput = () => {
        if(searchInputRef.current)searchInputRef.current.value = ''
        setMenuHasilPencarian(mhp => [])
    }

    const handleClickSelectMenu = (item) => {
        const itemFormatted = {...item, id: Math.random() ,opsiDipilih : '', catatan : '', jumlah:1}
        setMenuDipesan(md => [...md, itemFormatted])
        setMenuHasilPencarian(mhp => [])
        if(searchInputRef.current)searchInputRef.current.value = ''

    }
  return (
    <div className=''>
            <div className=''>
                <label htmlFor='carimenu'>Cari menu : </label>
                <input 
                    id='carimenu' 
                    className='px-2 rounded-md border border-black'
                    onChange={e => handleTypeSearchMenu(e)}
                    ref={searchInputRef}
                    >
                </input>
                <button className='text-red-700 text-md relative right-4' onClick={handleClickDeleteSearchInput}>x</button>
            </div>

            {menuHasilPencarian.length != 0 ?
                <div className='border border-black p-2 mt-2 absolute bg-blue-100'>
                    <h1 className='text-lg'>Menu hasil pencarian</h1>
                        {menuHasilPencarian.map(item => {
                            return (
                                <div 
                                    key={item.id} 
                                    className='border border-black px-2 w-36 hover:cursor-pointer'
                                    onClick={() => handleClickSelectMenu(item)}>
                                    {item.nama_masakan}
                                </div>
                            )
                        })}
                </div>
                : searchInputRef.current?.value != '' && 
                    <div className='text-red-700'>Menu tidak ditemukan</div>
            }

        </div>
  )
}

export default PencarianMenu