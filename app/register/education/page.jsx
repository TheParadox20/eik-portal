'use client'

import { useState, useContext } from 'react'
import { SignupContext } from '@/app/lib/SignupProvider';
import Link from 'next/link';
import File from '@/app/ui/File'
import { Institutions } from '@/app/ui/Input'

export default function EducationPage(){
    let {Requirements, Education, Paths} = useContext(SignupContext);
    let [requirements, setRequirements] = Requirements;
    let [institutions, setInstitutions] = Education;
    let [paths, _] = Paths;

    return(
        <div className='min-h-[60vh] p-10'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Education</h3>
            <Institutions data={institutions} setData={setInstitutions}/>

            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Upload Related Documents</h1>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File files={requirements} setFiles={setRequirements} type={'all'}/>
            </div>
            
            <div className="flex justify-between mt-8">
                <Link href={'/register/bio'} className='flex items-center gap-1'>
                    <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                    Previous
                </Link>
                {
                    paths.indexOf('/register/education')==paths.length-1?
                    <Link href={'/register/payment'} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                        Payment
                        <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                    </Link>
                    :
                    <Link href={paths[paths.indexOf('/register/education')+1]} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                        Next
                        <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                    </Link>
                }
            </div>
        </div>
    )
}