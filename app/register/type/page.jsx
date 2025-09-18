'use client'
import { useState, useContext, useEffect } from 'react'
import { Context } from "@/app/lib/ContextProvider"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import {load, save} from "@/app/lib/storage"
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline'
export default function Page() {
    let {Signup} = useContext(Context)
    let [data, setData] = Signup
    let router = useRouter()

    useEffect(() => {
        console.log(data)
        if (load('data')){
            let saved = load('data')
            console.log(saved)
            setData({...data, ...saved})
        }
    }, [])

    let validate = () => {
        return true;
    }

    let next = e => {
        e.preventDefault();
        if (validate()) {
            save('data', data)
            router.push('/register/profile')
        }
    }

    return(
        <div className='md:w-2/3 mt-8 md:mx-auto'>
            <h1 className='text-xl md:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Membership Type</h1>
            <div className='flex flex-col md:flex-row gap-y-5 gap-x-10 justify-center items-center'>
                <div className={`w-56 h-56 flex items-center justify-center rounded-3xl hover:bg-primary flex-col ${data.type?data.type=='Individual'?'bg-primary':'bg-secondary':'bg-secondary'}`} onClick={e=>setData({...data, type:'Individual'})}>
                    <UserIcon className='w-12 h-12 text-white'/>
                    <span className='text-white font-semibold text-lg mt-8'>Individual</span>
                </div>
                <div className={`w-56 h-56 flex items-center justify-center rounded-3xl hover:bg-primary flex-col ${data.type?data.type=='Firm'?'bg-primary':'bg-secondary':'bg-secondary'}`} onClick={e=>setData({...data, type:'Firm'})}>
                    <UserGroupIcon className='w-12 h-12 text-white'/>
                    <span className='text-white font-semibold text-lg mt-8'>Firm</span>
                </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div></div>
                <div onClick={e=>next(e)} className='font-semibold leading-6 text-white bg-primary w-fit text-center mr-4 py-2 rounded-md md:text-xl'>
                    <span className="w-full h-full px-6">Next</span>
                </div>
            </div>
        </div>
    )
}