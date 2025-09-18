'use client'

import { useContext, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { Training } from "./TrainingProvider"
import Editor from "@/app/ui/WYSIWYG/Editor";
import { postData, getData } from "@/app/lib/data";

export default function Page(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    let {Title,TWG, Description} = useContext(Training);
    let [title, setTitle] = Title;
    let [description, setDescription] = Description;
    let [twg, setTWG] = TWG;
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    useEffect(()=>{
        if(id){
            getData(
                (response)=>{
                    if(response.success){
                        setTitle(response.data.title);
                        setDescription(response.data.description);
                        setTWG(JSON.parse(response.data.category) ?? []);
                        setStart(response.data.start_date);
                        setEnd(response.data.end_date);
                    }
                },
                `/training/${id}`,
                {},
                null,
                process.env.NEXT_PUBLIC_TRAININGS_URL
            )
        }
    },[])

    // let []
    const twgs = ['Environmental Educators','Watershed Catchment Management (Blue economy)','Sustainable Waste Management','Climate Science','Biodiversity / Natural Sciences','Built Environment & Construction','Clean Energy and Renewables','Environmental Policy & Governance','Environmental Advocacty'];

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(
            (response)=>{
                if(response.success){
                    postData(
                        (r)=>{
                            if(r.success){
                                router.push(`/trainings/create/Pricing?id=${r.data.id}`);
                            }
                        },
                        {
                            reference_id: response.data.id,
                            title: title,
                            description: description,
                            category: JSON.stringify(twg),
                            start: start,
                            end: end
                        },
                        '/training',
                        null,
                        process.env.NEXT_PUBLIC_TRAININGS_URL
                    )
                }
            },
            {
                title: title,
                description: description,
                start: start,
                end: end
            },
            '/training/create'
        )
    }

    return(
        <div className="max-w-3xl mx-auto p-6">
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h5 className="text-2xl font-semibold mb-6 text-gray-800">Basic Information</h5>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Training Title
                        </label>
                        <input 
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500" 
                            name="title" 
                            placeholder="Enter training title" 
                            type="text" 
                            value={title} 
                            onChange={e=>setTitle(e.target.value)} 
                        />
                    </div>

                    <div>
                        <div className="flex gap-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="start">
                                    Start Date
                                </label>
                                <input 
                                    type="date" 
                                    value={start} 
                                    onChange={e=>setStart(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="end">
                                    End Date
                                </label>
                                <input 
                                    type="date" 
                                    value={end} 
                                    onChange={e=>setEnd(e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="TWG">
                            Member Groups
                        </label>
                        <div className="mb-3 flex flex-wrap gap-2">
                            {twg.length>0 && twg.map((group,i)=>(
                                <span key={i} className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                    {group}
                                    <button 
                                        onClick={()=>setTWG(twg.filter((g,j)=>j!==i))} 
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <select 
                            className="w-full bg-white border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" 
                            name="TWG"
                        >
                            <option value="">Select TWG</option>
                            {twgs.map((group,i)=>(
                                <option key={i} value={group} onClick={()=>setTWG([...twg,group])}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Class Description
                        </label>
                        <Editor 
                            className="min-h-72 border-2 border-gray-200 rounded-md" 
                            content={description} 
                            setContent={setDescription} 
                            placeholder="Training Info"
                        />
                    </div>
                </div>
            </section>

            <section className="flex justify-end my-5">
                <button 
                className="bg-secondary text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
                >
                    Save Draft
                </button>
            </section>
        </div>
    )
}