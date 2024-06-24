"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Login() {
    const [loginForm, setLoginForm] = useState({email:'',password:''})

    const router = useRouter()

    const login = async () => {
        console.log("tes")
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
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className=' bg-white min-h-screen flex justify-center items-center text-black'>
        <div className='mb-10'>
            <h1 className='text-2xl mb-3'>Login</h1>
            <label htmlFor='email'>Email : </label>
            <input 
                id='email'
                name='email' 
                onChange={(e) => setLoginForm(sd => ({...sd, email: e.target.value }))} 
                value={loginForm.email} 
                className=' outline-1 border-black border mb-3 block px-2' 
            />

        
            <label htmlFor='password'>Password : </label>
            <input 
                type='password' 
                id='password'
                name='password' 
                onChange={(e) => setLoginForm(sd => ({...sd, password: e.target.value }))} 
                value={loginForm.password}
                className=' outline-1 border-black border mb-5 block px-2' 
            />

            <button className='border border-black rounded-md px-2' onClick={login}>Login</button>

        </div>
    </div>
  )
}

export default Login