import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input";
import { postData, getData } from "@/app/lib/data";

export default function Edit({control, id}){
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [data, setData] = useState({});

    useEffect(()=>{
        getData(setData, '/admin/read', {id})
    },[])
    useEffect(()=>{
        console.log(data)
        setFullName(data.name)
        setEmail(data.email)
        setUsername(data.username)
    },[data])

    let submit = e=>{
        e.preventDefault();
        console.log('submitting')
        postData((_)=>{},{fullName, email, username, id}, '/admin/modify')
    }

    return(
    <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
        <div className="flex mx-2 mb-4 justify-between items-center border-b-2 py-3">
            <span className="font-semibold">Edit Admin Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col gap-6">
            <Input value={fullName} setValue={setFullName} placeholder={'Jane Doe'} type={'text'} name={'Full name'}/>
            <Input value={email} setValue={setEmail} placeholder={'janedoe@gmail.com'} type={'email'} name={'Email'}/>
            <Input value={username} setValue={setUsername} placeholder={''} type={'text'} name={'Username'}/>
        </div>


        <div className="flex w-full justify-between gap-4 my-6 text-sm">
            <button className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white" onClick={e=>submit(e)}>Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}