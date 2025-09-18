import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function ChangePassword({control}){
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');

    let submit = e=>{
        e.preventDefault();
        console.log('submitting')
    }

    return(
    <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
        <div className="flex mx-2 mb-4 justify-between items-center border-b-2 py-3">
            <span className="font-semibold">Change Password</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <input className="px-4 py-2 border-2 rounded-md w-full mb-6 focus:border-black" type="password" placeholder="Current Password" value={fullName} onChange={e=>setFullName(e.target.value)} />
        <input className="px-4 py-2 border-2 rounded-md w-full mb-6 focus:border-black" type="password" placeholder="New Password" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="px-4 py-2 border-2 rounded-md w-full mb-6 focus:border-black" type="password" placeholder="Confirm New Password" value={username} onChange={e=>setUsername(e.target.value)} />

        <div className="flex w-full justify-between gap-4 my-4">
            <button className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}