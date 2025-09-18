'use client'

import { useState, useContext } from 'react'
import { SignupContext } from '@/app/lib/SignupProvider';
import Link from 'next/link';
import { Organizations } from '@/app/ui/Input'

export default function ExperiencePage(){
    let {Requirements, Experience} = useContext(SignupContext);
    let [requirements, setRequirements] = Requirements;
    let [organizations, setOrganizations] = Experience;

    return(
        <div className='min-h-[60vh] p-10'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Work Experience</h3>
            <Organizations data={organizations} setData={setOrganizations}/>
            
            <div className="flex justify-between mt-8">
                <Link href={'/register/payment'} className='flex items-center gap-1'>
                    <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                    Payment
                </Link>
                <Link href={'/register/payment'} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                    Payment
                    <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                </Link>
            </div>
        </div>
    )
}