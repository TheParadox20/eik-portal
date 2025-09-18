import { useState, useEffect } from "react"
import useSWR from "swr";
import Spinner from "@/app/ui/Spinner";
import { fetcher, postData } from "@/app/lib/data";
import { Institutions } from '@/app/ui/Input'
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Qualifications({control,id}){
    let [education, setEducation] = useState([{}]);
    const { data, isError, isLoading } = useSWR(['/profile/get/education',{id}], fetcher, {revalidateIfStale: false})
    useEffect(()=>{
        if(!isError && !isLoading && data) setEducation(data.education)
    },[isLoading, isError])


    let submit = e=>{
        e.preventDefault();
        postData((_)=>{},{education,id},'/profile/edit/education')
    }

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Professional Qualifications</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        {isLoading && <Spinner internal={true}/>}
        {isError && <p>Error fetching education </p>}
        {(data && !isLoading && !isError) && <Institutions data={education} setData={setEducation}/>}

        <div className="flex w-full justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}