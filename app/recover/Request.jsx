'use client'
import { useState } from 'react'
import Link from 'next/link';
import { popupE } from '@/app/lib/trigger';
import Input from "@/app/ui/Input";

export default function Request() {
    let [email, setEmail] = useState('')

    let send = (e) => {
        e.preventDefault()
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recover?email=${email}`).then(res => res.json()).then(data => {
            console.log(data)
            if(data.success) popupE('ok', 'Success', data.success)
            if(data.error){
                popupE('error', 'Error', data.error)
            }
        }).catch(err => popupE('error', 'Error', "Server error"))
    }
    
    return(
        <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="flex flex-col items-center justify-center">
                <img className="mx-auto h-24 w-auto" src="/transparent-logo.svg" alt="Your Company"/>
            </div>

            <div className="mt-10 sm:mx-auto w-full max-w-sm">
            <form className="space-y-6">
                <Input value={email} setValue={setEmail} placeholder={'Enter your email'} type={'email'} name={'Email'} />
                <button
                    onClick={e=>send(e)}
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Recover
                </button>
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