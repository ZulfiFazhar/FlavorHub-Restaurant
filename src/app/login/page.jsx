"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const supabase = createClientComponentClient();

  // const createNewUser = async () => {
  //     const { data, error } = await supabase.auth.signUp({
  //         email: 'budi1@gmail.com',
  //         password: '1',
  //         options: {
  //           data: {
  //             nama:"Budi",
  //             umur: 23,
  //             pekerjaan:"koki"
  //           },
  //         },
  //       })

  //     if(data)console.log(data)
  //     if(error)console.log(error)
  // }

  const [isLoading, setIsLoading] = useState(false);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (data && data.user != null) {
        console.log(data);
        router.push("/resto");
        toast.success("Selamat Datang!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Email atau password salah.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen min-h-screen flex flex-row">
      <div className="w-1/2 bg-gradient-to-tr from-emerald-700 to-lime-700">
        <div className="w-full h-full flex justify-center items-center">
          <Image
            className="animate-in slide-in-from-top duration-800 "
            src={"Logo.svg"}
            width={300}
            height={100}
            alt="Logo"
          />
        </div>
      </div>
      <div className="w-1/2 bg-white text-black">
        <div className="animate-in slide-in-from-top duration-600 w-full h-full flex flex-col justify-center items-center">
          <div className="w-1/2 flex flex-col justify-start mb-8">
            <h1 className="animate-in slide-in-from-top duration-600 text-2xl font-bold">
              Login
            </h1>
            <h2 className="animate-in slide-in-from-top duration-600 text-xs">
              Masukkan Email dan Password anda untuk Login
            </h2>
          </div>
          <div className="w-1/2 flex flex-col gap-6">
            <Input
              className="animate-in slide-in-from-top duration-600 "
              isRequired
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
              onKeyPress={handleEnterKey}
            />
            <Input
              className="animate-in slide-in-from-top duration-600 "
              isRequired
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
              onKeyPress={handleEnterKey}
            />
            <Button
              radius="full"
              className={`animate-in slide-in-from-top duration-600 text-white bg-emerald-600 text-lg mt-4 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={login}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" color="white" /> : "Log In"}
            </Button>
            <ToastContainer
              icon={false}
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
