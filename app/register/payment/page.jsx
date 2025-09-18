'use client'

import { useState, useContext, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pay from '@/app/ui/Pay'
import { SignupContext } from "@/app/lib/SignupProvider";

export default function PaymentPage(){
    let {Category, Name, Last, Email, Phone, Practicing} = useContext(SignupContext);
    let [amount, setAmount] = useState(300);
    let [practicing, setPracticing] = Practicing;
    let [category, _] = Category;
    let [name, __] = Name;
    let [last, ___] = Last;
    let [email, ____] = Email;
    let [phone, _____] = Phone;

    const router = useRouter();

    useEffect(() => {
        switch (category) {
            case 'Student':
                setAmount(700)
                break;
            case 'Affiliate':
                setAmount(17500)
                break;
            case 'Honorary':
                setAmount(0)
                router.push('/register/preview')
                break;
            case 'Associate':
                setAmount(3000)
                break;
            case 'Lead':
                setAmount(7000)
                break;
            case 'Firm':
                setAmount(12500)
                break;
            case 'Fellow':
                setAmount(0)
                router.push('/register/preview')
                break;
            default:
                break;
        }
        if (category == 'Fellow' || category == 'Lead' || category == 'Associate' || category == 'Firms') setPracticing(1)
        else setPracticing(0)
    }, [])

    return(
        <div className='min-h-[60vh] p-10'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Payment</h3>
            <Pay title={'Registration fee'} description={'First time registration fee'} amount={amount} email={email} phone={phone} name={`${name} ${last}`} />

            <div className="flex justify-between mt-8">
                <Link href={'/register'} className='flex items-center gap-1'>
                    <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                    Previous
                </Link>
                <Link href={'/register/preview'} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-2 md:px-10 py-2 rounded-md hover:font-semibold'>
                    Preview & Submit
                    <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                </Link>
            </div>
        </div>
    )
}