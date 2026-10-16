'use client'
import { useState } from "react"
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input"
import { postData } from "@/app/lib/data"
import { popupE } from "@/app/lib/trigger";

export default function Role({control, training}){
    let [role, setRole] = useState('')
    const [roles, setRoles] = useState([])

    let addRole = (e)=>{
        e.preventDefault();
        if(role.trim()=='' || roles.includes(role.trim())) return
        setRoles([...roles,role.trim()])
        setRole('')
    }

    let submit = (e)=>{
        e.preventDefault();
        if(roles.length==0){
            popupE('error','Error','Add at least one role')
            return
        }
        postData((_)=>{
            control('');
        },{roles},`/training/roles/${training}`)
    }
    return(
        <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
            <button className="flex w-full mx-2 mb-4 justify-between items-center border-b-2 py-3">
                <span className="font-semibold">Add New Roles</span>
                <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
            </button>

            <div className="gap-2 flex flex-wrap">
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

            <div className="flex gap-5 flex-col my-4" onKeyDown={e=>{if(e.key==='Enter') addRole(e)}}>
                <Input required={true} value={role} setValue={setRole} placeholder={'Facilitator'} type={'text'} name={'Role'}/>
            </div>

            <button
                className="bg-primary text-white px-5 py-2 rounded-lg hover:scale-105"
                onClick={e=>addRole(e)}
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
