import { useState } from "react"
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input";
import { postData } from "@/app/lib/data";

function Background({content, setContent}){
    return(
        <>
        <h3>Background Settings</h3>
        </>
    )
}

function Name({content, setContent}){
    return(
        <>
        <h3>Name Settings</h3>
        </>
    )
}

function Info({content, setContent}){
    let [info, setInfo] = useState('')

    return(
        <>
        <h3 className="mb-2">Info Settings</h3>
        <Input required={true} value={info} setValue={setInfo} placeholder={'Training XYZ'} type={'textarea'} name={'Info'}/>
        </>
    )
}

function Number({content, setContent}){
    return(
        <>
        <h3>Number Settings</h3>
        </>
    )
}

function QRcode({content, setContent}){
    return(
        <>
        <h3>QRcode Settings</h3>
        </>
    )
}

function Date({content, setContent}){
    return(
        <>
        <h3>Date Settings</h3>
        </>
    )
}

export default function Modify({control, action, data}){
    let [content, setContent] = useState({});
    let update = e=>{
        e.preventDefault();
        console.log('submitting')
        postData((_)=>{},{}, `/training/update/${data.id}`)
    }

    return(
        <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg relative">
            <button className="flex w-full mx-2 mb-4 justify-between items-center border-b-2 py-3">
                <span className="font-semibold">Update {action}</span>
                <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
            </button>

            {action=='Background' && <Background content={content} setContent={setContent} />}
            {action=='Name' && <Name content={content} setContent={setContent} />}
            {action=='Info' && <Info content={content} setContent={setContent} />}
            {action=='Number' && <Number content={content} setContent={setContent} />}
            {action=='QRcode' && <QRcode content={content} setContent={setContent} />}
            {action=='Date' && <Date content={content} setContent={setContent} />}

            <button className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto items-center justify-center my-6 absolute bottom-0 right-5 hover:scale-105" onClick={e=>update(e)}>
                <ArrowPathIcon className="w-6 h-6 mr-2"/>
                <span className="font-semibold">Update</span>
            </button>
        </div>
    )
}