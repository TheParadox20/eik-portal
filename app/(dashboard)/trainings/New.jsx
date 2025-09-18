import { useState } from "react"
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input";
import { postData } from "@/app/lib/data";

export default function New({control}){
    let [name, setName] = useState('');
    let [info, setInfo] = useState('');
    let [start, setStartDate] = useState('');
    let [end, setEndDate] = useState('');

    let submit = e=>{
        e.preventDefault();
        console.log('submitting')
        postData((_)=>{},{name, info, start, end}, '/training/create')
        control('');
    }

    return(
        <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
            <button className="flex w-full mx-2 mb-4 justify-between items-center border-b-2 py-3">
                <span className="font-semibold">Add New Training</span>
                <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
            </button>

            <div className="flex gap-5 flex-col">
                <Input required={true} value={name} setValue={setName} placeholder={'Training XYZ'} type={'text'} name={'Name'}/>
                <Input required={true} value={start} setValue={setStartDate} placeholder={''} type={'date'} name={'Start date'}/>
                <Input required={true} value={end} setValue={setEndDate} placeholder={''} type={'date'} name={'End date'}/>
                <Input required={true} value={info} setValue={setInfo} placeholder={''} type={'textarea'} name={'Info'}/>
            </div>

            <button className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto w-full items-center justify-center my-6" onClick={e=>submit(e)}>
                <PlusIcon className="w-6 h-6 mr-2"/>
                <span className="font-semibold">Add Training</span>
            </button>
        </div>
    )
}