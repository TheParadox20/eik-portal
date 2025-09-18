'use client'
import { useState } from "react"
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input"
import { postData } from "@/app/lib/data"

export default function Edit({control, data, mutate}){
    console.log(data)
    let [fullName, setFullName] = useState(data.Name)
    let [email, setEmail] = useState(data.Email)
    let submit = (e)=>{
        e.preventDefault();
        postData((_)=>{
            mutate();
            control('');
        },{number:data.Number,fullName,email},'/training/member/edit')
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
            </div>

            <button className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto w-full items-center justify-center my-6" onClick={e=>submit(e)}>
                <UserPlusIcon className="w-6 h-6 mr-2"/>
                <span className="font-semibold">Edit User</span>
            </button>
        </div>
    )
}