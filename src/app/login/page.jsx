"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function Login() {
    const [loginForm, setLoginForm] = useState({email:'',password:''})

    const router = useRouter()
    
    useEffect(() => {
        router.refresh()
    },[])

    const supabase = createClientComponentClient()

    // const createNewUser = async () => {
    //     const { data, error } = await supabase.auth.signUp({
    //         email: 'koki1@gmail.com',
    //         password: '123456',
    //         options: {
    //           data: {
    //             nama:"Asep",
    //             umur: 23,
    //             pekerjaan:"koki"
    //           },
    //         },
    //       })

    //     if(data)console.log(data)
    //     if(error)console.log(error)
    // }

    const login = async () => {
        try {
            const supabase = createClientComponentClient()
            const {data, error} = await supabase
                .auth
                .signInWithPassword({
                    email : loginForm.email,
                    password : loginForm.password
                })

            if(data && data.user != null){
                console.log(data)
                router.push('/resto')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='bg-white h-screen min-h-screen'>
        <div className=' flex h-full justify-center items-center w-fit'>
        <div className=' h-85p main-gradient ml-12 w-[28rem] rounded-3xl flex flex-col py-10 justify-around items-center text-white'>
            <Image src={'Logo.svg'} width={75} height={75} />

            <h1 className='text-2xl mb-3'><span className='text-orange-300'>Flavor</span>Hub</h1>
            
            <div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        id='email'
                        name='email' 
                        onChange={(e) => setLoginForm(sd => ({...sd, email: e.target.value }))} 
                        value={loginForm.email} 
                        className='mb-4 block px-3 py-1 bg-white rounded-md mt-1 text-black'
                        placeholder='pelayan@example.com' 
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password : </label>
                    <input 
                        type='password' 
                        id='password'
                        name='password' 
                        onChange={(e) => setLoginForm(sd => ({...sd, password: e.target.value }))} 
                        value={loginForm.password}
                        className='mb-5 px-3 py-1 block bg-white rounded-md mt-1 text-black'
                        placeholder='*********' 
                    />
                </div>
            </div>


            <button className='rounded-md px-9 py-1 bg-white text-black' onClick={login}>Login</button>

        </div>
        </div>

        <Image src={'/decoration/burger2.png'} width={200} height={200} className='absolute top-1 left-96' />
        <Image src={'/decoration/fries 1.png'} width={200} height={200} className='absolute top-24 left-[40rem]' />
        <Image src={'/decoration/coffe 1.png'} width={200} height={200} className='absolute top-52 left-[25rem]' />
        <Image src={'/decoration/cookies 1.png'} width={200} height={200} className='absolute top-72 left-[38rem]' />
        <Image src={'/decoration/pizza 1.png'} width={200} height={200} className='absolute top-96 left-[29rem]' />
    </div>
  )
}

export default Login