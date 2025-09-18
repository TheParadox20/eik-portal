'use client'
import { useState } from "react"
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input"
import { postData } from "@/app/lib/data"

export default function Role({control, conference}){
    let [role, setRole] = useState('')
    const [roles, setRoles] = useState([])

    let submit = (e)=>{
        e.preventDefault();
        postData((_)=>{
            control('');
        },{roles },`/conference/roles/${conference}`)
    }
    return(
        <div className="bg-white max-w-[60vw] py-1 px-4 rounded-lg">
            <button className="flex w-full mx-2 mb-4 justify-between items-center border-b-2 py-3">
                <span className="font-semibold">Add New Roles</span>
                <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
            </button>

            <div className="gap-x-2 flex flex-wrap">
                {
                    roles.map((role,i)=>(
                        <button
                          key={i}
                          className="bg-secondary text-white text-xs flex items-center justify-center gap-1 p-2 rounded-xl"
                          onClick={e=>{
                            let r = roles.filter((rol)=>rol!=role)
                            setRoles(r)
                          }}
                        >
                            {role}
                            <span className="icon-[ion--close-outline] w-2 h-2"/>
                        </button>
                    ))
                }
            </div>

            <div className="flex gap-5 flex-col my-4">
                <Input required={true} value={role} setValue={setRole} placeholder={'Planner'} type={'text'} name={'Role'}/>
            </div>

            <button 
                className="bg-primary text-white px-5 py-2 rounded-lg hover:scale-105"
                onClick={e=>{
                    setRoles([...roles,role])
                    setRole('')
                }}
            >
                Add Role
            </button>

            <button className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto w-full items-center justify-center my-6" onClick={e=>submit(e)}>
                <UserPlusIcon className="w-6 h-6 mr-2"/>
                <span className="font-semibold">Submit Roles</span>
            </button>
        </div>
    )
}