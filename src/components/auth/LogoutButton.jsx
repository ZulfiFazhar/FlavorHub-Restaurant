"use client"

import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


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

  return <button className="btn btn-solid-error" onClick={logOut}>Logout</button>
}

export default LogoutButton