'use client'
import { useState } from "react"
import useSWR from 'swr';
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input"
import { fetcher, postData } from "@/app/lib/data"

export default function Add({control, training, mutate}){
    let [fullName, setFullName] = useState('')
    let [email, setEmail] = useState('')
    let [role, setRole] = useState('')

    const { data:roles } = useSWR([`/training/roles/${training}`,{}], fetcher)

    let submit = (e)=>{
        e.preventDefault();
        postData((_)=>{
            mutate();
            control('');
        },{fullName,email, training, role},'/training/member/add')
    }
    return(
        <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
            <button className="flex w-full mx-2 mb-4 justify-between items-center border-b-2 py-3">
                <span className="font-semibold">Add New User</span>
                <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
            </button>
            <div className="flex gap-5 flex-col">
                <Input required={true} value={fullName} setValue={setFullName} placeholder={'Jane Doe'} type={'text'} name={'Full name'}/>
                <Input required={true} value={email} setValue={setEmail} placeholder={'janedoe@eik.co.ke'} type={'email'} name={'Email'}/>
                {
                    roles?.data?.length > 0 &&
                    <select
                      className="py-2 px-4 rounded-md"
                      value={role}
                      onChange={e=>setRole(e.target.value)}
                    >
                        <option value="">No role</option>
                        {
                            roles.data.map((role,i)=>(
                                <option value={role?.id} key={i}>{role?.Name}</option>
                            ))
                        }
                    </select>
                }
            </div>

            <button className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto w-full items-center justify-center my-6" onClick={e=>submit(e)}>
                <UserPlusIcon className="w-6 h-6 mr-2"/>
                <span className="font-semibold">Add User</span>
            </button>
        </div>
    )
}
