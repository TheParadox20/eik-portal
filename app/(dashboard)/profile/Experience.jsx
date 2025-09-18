import { useState, useEffect, useContext } from "react"
import useSWR from "swr";
import Spinner from "@/app/ui/Spinner";
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Organizations } from '@/app/ui/Input'
import { fetcher, postData } from "@/app/lib/data";

export default function Experience({control,id}){
    let [organizations, setOrganizations] = useState([{id}]);
    const { data, isError, isLoading } = useSWR(['/profile/get/profession',{id}], fetcher, {revalidateIfStale: false})
    let submit = e=>{
        e.preventDefault();
        postData((_)=>{},{profession:organizations,id},'/profile/edit/profession')
    }
    useEffect(()=>{
        if(!isError && !isLoading && data) setOrganizations(data.profession)
    },[isLoading, isError])
    
    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[80vh] -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Work Experience</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        {isLoading && <Spinner internal={true}/>}
        {isError && <p>Error fetching work experience </p>}
        <Organizations data={organizations} setData={setOrganizations}/>

        <div className="flex w-full justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}