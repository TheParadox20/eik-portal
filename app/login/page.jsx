'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Input from '@/app/ui/Input';
import { save, load } from '@/app/lib/storage';
import { popupE } from '@/app/lib/trigger';
import useUser from "@/app/lib/hooks/useUser";

export default function Login() {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let router = useRouter();

    const { user, isLoading, isError } = useUser()

    let login = (e) => {
        e.preventDefault()
        popupE('ok', 'Loading', 'Please wait...')
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error != null) {
                throw new Error(data.error)
            }
            if(!save('token', data.user.token)) alert('Error saving token');
            popupE('ok', 'Success', 'Login successful')
            setTimeout(()=>{
                router.push('/')
            }, 500)
        })
        .catch(err => {
            popupE('error', 'Error', err.message)
            console.log(err)
        })
    }

    useEffect(()=>{
        if (load('token') && !isLoading && !isError) router.push('/')
    },[])

    // if(Object.keys(user).length>0) router.push('/')
    
    return(
        <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="flex flex-col items-center justify-center">
                <img className="mx-auto h-24 w-auto" src="/transparent-logo.svg" alt="Your Company"/>
                <span className="text-primary font-bold text-xl md:text-4xl inline-block align-bottom ml-4 text-center">Environment Institute of Kenya</span>
            </div>

            <div className="mt-10 sm:mx-auto w-full max-w-sm">
            <form className="space-y-6">
                <Input value={email} setValue={setEmail} placeholder={'janedoe@gmail.com'} type={'email'} name={'Email'}/>
                <Input value={password} setValue={setPassword} placeholder={''} type={'password'} name={'Password'}/>
                <Link href={'/recover'} className="block text-sm text-right">
                    <span className="font-semibold text-secondary hover:text-blue-500">Forgot password?</span>
                </Link>
                <div>
                <button
                    onClick={e=>login(e)}
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign In
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                {'Don\'t have an account?'}
                <Link href={'/register'}>
                    <span className="font-semibold leading-6 text-secondary hover:text-blue-500">Sign Up</span>
                </Link>
            </p>
            </div>
        </div>
    )
}