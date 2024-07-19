"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const supabase = createClientComponentClient();

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

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const login = async () => {
    try {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (data && data.user != null) {
        console.log(data);
        router.push("/resto");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen min-h-screen flex flex-row">
      <div className="w-1/2 bg-gradient-to-tr from-emerald-700 to-lime-700">
        <div className="w-full h-full flex justify-center items-center">
          <Image src={"Logo.svg"} width={300} height={100} alt="Logo" />
        </div>
      </div>
      <div className="w-1/2 bg-white text-black">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-1/2 flex flex-col justify-start mb-8">
            <h1 className="text-2xl font-bold">Login</h1>
            <h2 className="text-xs">
              Masukkan Email dan Password anda untuk Login
            </h2>
          </div>
          <div className="w-1/2 flex flex-col gap-6">
            <Input
              isClearable
              type="email"
              label="Email"
              placeholder="you@example.com"
              labelPlacement="outside"
              variant="bordered"
              radius="full"
              size="lg"
              onChange={(e) =>
                setLoginForm((sd) => ({ ...sd, email: e.target.value }))
              }
              value={loginForm.email}
            />
            <Input
              isClearable
              type="password"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              labelPlacement="outside"
              radius="full"
              size="lg"
              onChange={(e) =>
                setLoginForm((sd) => ({ ...sd, password: e.target.value }))
              }
              value={loginForm.password}
            />
            <Button
              radius="full"
              className="text-white bg-emerald-600 text-lg mt-4"
              onClick={login}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
