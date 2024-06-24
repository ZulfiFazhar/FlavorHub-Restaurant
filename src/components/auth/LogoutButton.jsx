"use client"

import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


const LogoutButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const logOut = async () => {
    const {error} = await supabase.auth.signOut()
    if(error)console.log(error)
    router.push('/login')
  }

  return <button className="btn btn-solid-error" onClick={logOut}>Logout</button>
}

export default LogoutButton