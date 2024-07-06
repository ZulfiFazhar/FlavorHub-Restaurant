"use client"

import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Icon } from "@iconify/react"


const LogoutButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  // const updateUserMetadata = async () => {
  //   const { data: { user } } = await supabase.auth.getUser();
  
  //   if (user) {
  //     const { data, error } = await supabase.auth.updateUser({
  //       data: {
  //         nama: "fatih",
  //         umur: 21,
  //         pekerjaan: "manajer"
  //       },
  //     });
  
  //     if (data) console.log("User updated:", data);
  //     if (error) console.log("Error updating user:", error);
  //   } else {
  //     console.log("No user is signed in");
  //   }
  // };

  const logOut = async () => {
    const {error} = await supabase.auth.signOut()
    if(error)console.log(error)
    router.push('/login')
  }

  return ( 
    <div className="flex justify-center items-center self-center text-black bg-white border border-black rounded-full flex-none mt-auto hover:cursor-pointer hover:bg-slate-300 w-52" onClick={logOut}>
      <Icon icon={'mdi:logout'} className="mr-2" />
      Logout
    </div>
  )
}

export default LogoutButton