'use client'

import { useState, useContext, useEffect } from 'react'
import { SignupContext } from '@/app/lib/SignupProvider';
import Link from 'next/link';
import Input from "@/app/ui/Input"
import File from '@/app/ui/File'
import { Firms } from '@/app/lib/instructions'


export default function ProfilePage(){
    let {Requirements, Members} = useContext(SignupContext);
    let [instructions, setInstructions] = useState(Firms);
    let [requirements, setRequirements] = Requirements;
    let [members, setMembers] = Members;
    let [member1Number, setMember1Number] = useState('');
    let [member2Number, setMember2Number] = useState('');
    let [member1Name, setMember1Name] = useState('');
    let [member2Name, setMember2Name] = useState('');

    useEffect(()=>{
        setMember1Number(members[0].number)
        setMember2Number(members[1].number)
        setMember1Name(members[0].name)
        setMember2Name(members[1].name)
    },[])

    useEffect(()=>{
        setMembers([
            {
                number: member1Number,
                name: member1Name
            },
            {
                number: member2Number,
                name: member2Name
            }
        ])
    },[member1Number, member2Number, member1Name, member2Name])

    return(
        <div className='min-h-[60vh] p-10'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Requirements</h3>

            <div className='text-sm 2xl:text-base mx-2'>
                <p className=''>The following requirements must be satisfied for Firm Membership</p>
                {
                    instructions.map((value,index)=>{
                        return(
                            <div className='ml-4' key={index}>{`${index+1}.) `} {value}</div>
                        )
                    })
                }
            </div>

            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>EIK Members</h1>
            <div className='mx-2 md:w-3/4 md:mx-auto my-5 gap-5 grid grid-cols-2'>
                <Input type='text' placeholder='EIK/X/XXXX' value={member1Number} setValue={setMember1Number} name={'EIK Number'}/>
                <Input type='text' placeholder='Jane Doe' value={member1Name} setValue={setMember1Name} name={'Name'}/>
                <Input type='text' placeholder='EIK/X/XXXX' value={member2Number} setValue={setMember2Number} name={'EIK Number'}/>
                <Input type='text' placeholder='Jane Doe' value={member2Name} setValue={setMember2Name} name={'Name'}/>
            </div>

            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Upload Documents</h1>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File files={requirements} setFiles={setRequirements} type={'all'}/>
            </div>
            
            <div className="flex justify-between mt-8">
                <Link href={'/register/bio'} className='flex items-center gap-1'>
                    <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                    Previous
                </Link>
                <Link href={'/register/payment'} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                    Payment
                    <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                </Link>
            </div>
        </div>
    )
}