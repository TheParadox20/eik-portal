'use client'
import Quill from "../ui/Quill"
import { postData } from "../lib/data"
import { useState } from "react"

export default function Page(){
    let [value, setValue] = useState();
    let submit = (e)=>{
        e.preventDefault();
    }
    return(
        <div>
            <h2 className="font-semibold text-lg my-5">Workbench</h2>
            <div className="w-1/2 mx-auto">
            <Quill placeholder={'Enter bio'} value={value} setValue={setValue}/>
            </div>
            <h4>Preview:</h4>
            <div 
            className="" 
            dangerouslySetInnerHTML={{ __html: value }} 
            />
            <button className="bg-secondary hover:scale-105 py-2 px-4 ml-2 rounded-lg text-white">Submit</button>
        </div>
    )
}