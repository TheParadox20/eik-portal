import { useState, useEffect, useContext } from "react"
import { Context } from "@/app/lib/ContextProvider"
import { XMarkIcon } from "@heroicons/react/24/outline"
import File from "@/app/ui/File";
import { getData, postFile } from "@/app/lib/data";
import { popupE } from "@/app/lib/trigger";

export default function Attachments({control,id}){
    let {Profile} = useContext(Context);
    let [profile, setProfile] = Profile;
    let [files, setFiles] = useState([]);

    useEffect(()=>{
        console.log(profile)
    },[])
    
    let deleteFile = (e,url)=>{
        e.preventDefault();
        getData((_)=>{
            setProfile({...profile, requirements: profile.requirements.filter(requirement=>requirement.url!==url)})
        }, '/file/delete/requirements', {url})
    }

    let save = e=>{
        e.preventDefault();
        files.forEach(file => {
            postFile((_)=>{},file,{
                title:'Docs',
                id
            }, '/files/requirements')
        });
        popupE('ok', 'Success', 'Files uploaded')
    }

    return(
    <div className="bg-white w-[80%] md:min-w-[33vw] py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Attachments</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        {
            profile.requirements &&
            profile.requirements.map((requirement, i)=>(
                <div key={i} className="flex items-center justify-between my-2">
                    <div>{requirement.name}</div>
                    <button onClick={e=>deleteFile(e,requirement.url)} className=" text-warning text-sm">Remove</button>
                </div>
            ))
        }

        <div className='mx-2 my-5'>
            <File files={files} setFiles={setFiles} type={'all'}/>
        </div>

        <div className="flex md:float-right mt-4 md:mt-12 justify-between gap-4 my-4 text-sm">
            <button onClick={e=>save(e)} className={`py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white`}>Save</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}