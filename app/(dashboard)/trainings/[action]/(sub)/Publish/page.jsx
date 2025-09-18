'use client'

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr"
import { fetcher } from "@/app/lib/data"
import Spinner from "@/app/ui/Spinner";
import Video from "./Video";
import { putData } from "@/app/lib/data";

export default function Page(){
    let searchParams = useSearchParams();
    let id = searchParams.get('id');
    const router = useRouter();

    const [activeModule, setActiveModule] = useState(0);
    
    let { data, isError, isLoading } = useSWR([`/training/${id}`,{},null,process.env.NEXT_PUBLIC_TRAININGS_URL], fetcher,{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
        errorRetryInterval: 300000
    });
    
    if(isError || isLoading) return <div className="flex w-full h-[70vh] items-center justify-center"><Spinner/></div>

    const handlePublish = () => {
        putData((response)=>{
            if(response.success){
                router.push(`/trainings`)
                window.open('https://elearning.eik.co.ke/', '_blank');
            }
        },{draft:0},`/training/${id}`,{},process.env.NEXT_PUBLIC_TRAININGS_URL)
    }

    return(
        <div>
            <h5 className="text-lg font-semibold mb-4">Publishing</h5>
            {
                (data.data.media && data.data?.media?.length>0) &&
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <img className="h-fit max-h-96 flex-grow" src={data.data.media[0].url} alt="" />
                    {
                        data.data?.media?.length>1 &&
                        <div className="space-y-2 space-x-3 flex flex-row md:flex-col overflow-x-hidden overflow-y-auto max-h-96">
                            {
                                data.data.media.slice(1).map((media,index)=>(
                                    <img className="h-32 md:h-96" src={media.url} alt="" key={index} />
                                ))
                            }
                        </div>
                    }
                </div>
            }
            <div className="bg-gray-100 px-10 py-9 mt-7">
                <div className="flex justify-between mb-3">
                    <p className="max-w-1/2 truncate font-semibold">{data.data.title}</p>
                </div>
                <div className="grid grid-cols-2 w-full gap-y-5">
                    <p className="">Course ({data.data.modules.length} modules)</p>
                    <div>
                        {
                            data.data.pricing.map((category,i)=>(
                                <p className="text-right" key={i}> 
                                    <span className="text-gray-600 text-xs">{category.type}</span> Ksh {(category.price).toLocaleString()}
                                </p>
                            ))
                        }
                    </div>
                    <p className="">Documents <span className="bg-secondary text-white py-1 text-xs rounded-full px-5">free</span></p>
                    <p className="text-right">0</p>
                </div>
            </div>
            <section className="mt-8">
                <div className="flex sticky top-0 md:top-[8vh] pt-4 bg-white gap-7 border-b-2 overflow-x-auto">
                    <a className={`pb-4 whitespace-nowrap ${true?'border-b-4 border-primary text-primary font-semibold':''}`} href="#description">Training Description</a>
                    <a className={`pb-4 whitespace-nowrap ${false?'border-b-4 border-primary text-primary font-semibold':''}`} href="#benefits">Sessions</a>
                    <a className={`pb-4 whitespace-nowrap ${false?'border-b-4 border-primary text-primary font-semibold':''}`} href="#reviews">Reviews (0)</a>
                </div>

                <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-1/2">
                        <section className="pt-8" id="description">
                            <p className="font-bold text-xl">Class description</p>
                            <p className="my-4">
                                {data.description}
                            </p>
                        </section>
                        <section className="pt-8" id="benefits">
                            <p className="font-bold text-xl">Benefits</p>
                            <div className="grid grid-cols-2 text-sm pt-4 gap-5">
                                <div className="flex items-center gap-2">
                                    <span className="icon-[ri--video-on-line] text-primary w-7 h-7"/>
                                    <p>14 hours on-demand video</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="icon-[mingcute--time-line] text-primary w-7 h-7"/>
                                    <p>Full lifetime access</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="icon-[clarity--world-line] text-primary w-7 h-7"/>
                                    <p>Native teacher</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="icon-[iconamoon--certificate-badge-light] text-primary w-7 h-7"/>
                                    <p>Certificate on completion</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="icon-[iconamoon--file-document-light] text-primary w-7 h-7"/>
                                    <p>100% free documents</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="icon-[mdi--tick-all] text-primary w-7 h-7"/>
                                    <p>24/7 support</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="md:w-1/3 pt-8">
                        <div className="flex justify-between">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-full bg-slate-400"/>
                                <div>
                                    <p className="mb-1">Jane Doe</p>
                                    <div className="flex text-sm items-center">
                                        <span className={`icon-[ri--star-s-fill] text-[#f3c63f] w-5 h-5`}></span>
                                        <span className="">{4.5}</span>
                                        <span className="text-gray-600">({38} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <button className="hover:scale-105 bg-secondary/20 w-28 rounded-lg text-secondary font-semibold">Contact</button>
                        </div>
                    </div>
                </div>

                <section className="pt-8" id="reviews">
                    <p className="font-bold text-xl">Reviews</p>
                    <p className="h-[20vh] flex w-full items-center justify-center">No Reviews</p>
                </section>

                <section className="flex flex-col-reverse gap-y-6">
                    <div className=" h-[50vh] rounded-2xl">
                        { activeModule && <Video src={data?.data.modules[activeModule].url}/>}
                    </div>
                    <div className="max-h-[45vh] overflow-y-scroll flex- md:w-1/3">
                        <div className="flex justify-between mb-5 md:mt-0 mt-5 px-2">
                            <p className="font-bold text-xl">Modules</p>
                        </div>
                        {
                            data.data.modules.map((module,i=i+1)=>(
                                <div key={i} className={`w-full md:w-10/12 flex justify-between`}>
                                    <button onClick={()=>setActiveModule(i)} className={`px-4 py-2 rounded-lg ${activeModule==i?'bg-secondary/10 text-secondary font-semibold':''}`}>
                                        <span>{i+1}. </span>
                                        <span className={`ml-1}`}>{module.title}</span>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </section>

            <section className="flex justify-end my-5">
                <button 
                className="bg-secondary text-white px-4 py-2 rounded-md"
                onClick={handlePublish}
                >
                    Publish
                </button>
            </section>
        </div>
    )
}