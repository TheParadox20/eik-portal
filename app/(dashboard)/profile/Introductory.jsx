import { useState, useEffect } from "react"
import useSWR from "swr";
import Spinner from "@/app/ui/Spinner";
import { XMarkIcon } from "@heroicons/react/24/outline"
import Quill from "@/app/ui/Quill";
import { postData, fetcher } from "@/app/lib/data";

export default function Introductory({control, id}){
    const { data, isError, isLoading } = useSWR(['/profile/get/bio',{id}], fetcher, {revalidateIfStale: false})
    let [note, setNote] = useState('');
    useEffect(()=>{
        if(!isError && !isLoading) setNote(data.bio)
    },[isLoading, isError])
    let submit = e=>{
        e.preventDefault();
        postData((_)=>{},{bio:note,id},'/profile/edit/bio')
    }

    return(
    <div className="bg-white w-[80%] md:min-w-[75vw] py-1 px-4 rounded-lg max-h-[80vh] -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Introductory Statement</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        {isLoading && <Spinner internal={true}/>}
        {isError && <p>Error fetching bio </p>}
        {
            (!isLoading && !isError) &&
            <div className='flex flex-col md:flex-row justify-center gap-y-7 gap-x-7 mb-12 max-h-96 overflow-y-scroll'>
                <div className='flex-grow md:h-96'>
                    <Quill placeholder={'Bio'} value={note} setValue={setNote}/>
                </div>
                <div className='flex-grow max-h-96 overflow-y-scroll'>
                    <p className='font-bold mb-5'>*Bio Preview</p>
                    <div 
                    className="" 
                    dangerouslySetInnerHTML={{ __html: note }} 
                    />
                </div>
            </div>
            }

        <div className="flex lg:w-1/2 lg:float-right justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}