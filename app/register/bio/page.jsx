'use client'

import { useState, useContext } from 'react'
import { SignupContext } from '@/app/lib/SignupProvider';
import Link from 'next/link';
import File from '@/app/ui/File'
import Quill from '@/app/ui/Quill'

export default function ProfilePage(){
    let {Image, Note, Paths} = useContext(SignupContext);
    let [image, setImage] = Image;
    let [note, setNote] = Note;
    let [paths, _] = Paths;

    return(
        <div className='min-h-[60vh] p-10'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Profile Bio</h3>

            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Upload Profile Photo</h1>
            <div className='md:w-1/3 mx-2'>
                <File type='image' files={image} setFiles={setImage} />
            </div>

            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Bio</h1>
            <div className='flex flex-col md:flex-row justify-center gap-y-7 gap-x-7 my-12'>
                <div className='flex-grow md:h-96'>
                    <Quill placeholder={'Bio'} value={note} setValue={setNote}/>
                </div>
                <div className='flex-grow'>
                    <p className='font-bold mb-5'>*Bio Preview</p>
                    <div 
                    className="" 
                    dangerouslySetInnerHTML={{ __html: note }} 
                    />
                </div>
            </div>

            <div className="flex justify-between pt-8">
                <Link href={'/register/profile'} className='flex items-center gap-1'>
                    <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                    Previous
                </Link>
                {
                    paths.indexOf('/register/bio')==paths.length-1?
                    <Link href={'/register/payment'} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                        Payment
                        <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                    </Link>
                    :
                    <Link href={paths[paths.indexOf('/register/bio')+1]} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                        Next
                        <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                    </Link>
                }
            </div>
        </div>
    )
}