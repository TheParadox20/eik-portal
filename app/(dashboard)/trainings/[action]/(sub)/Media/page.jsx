'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { postFileFetcher } from "@/app/lib/data";
import File from "@/app/ui/File";
import { popupE } from "@/app/lib/trigger";

let checks = [];

export default function Page(){
    const router = useRouter();
    const {action} = useParams();
    let [media, setMedia] = useState([]);
    let [files, setFiles] = useState([]);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(()=>{
        setMedia(files);
    },[files])

    const handleSubmit = (e)=>{
        e.preventDefault();
        checks = files.map(() => false);
        try {
            files.forEach(async (file) => {
                await postFileFetcher(
                    [
                        file,
                        {
                            training_id: id,
                            type: 'media'
                        },
                        '/training/media',
                        null,
                        process.env.NEXT_PUBLIC_TRAININGS_URL
                    ]
                ).then((res) => {
                    if(res.success){
                        checks.pop();
                        console.log(checks);
                        if(checks.length === 0){
                            router.push(`/trainings/${action}/Trainer?id=${id}`);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    popupE('error', 'Error', 'File upload Error In response')
                });
            })
        } catch (error) {
            console.log(error);
            popupE('error', 'Error', 'File upload Error In catch')
        }
    }
    return(
        <div>
            <h5 className="text-lg font-semibold mb-4">Media <span className="text-sm text-gray-500 ml-1">(Images, videos, or 3D models)</span></h5>
            <h5 className="text-lg font-semibold my-4">Carousel Media</h5>
            <section>
                <div className="flex gap-10 flex-wrap">
                    {
                        media.map((file, index) => {
                            return (
                                <div key={index} className="relative w-1/4">
                                    <img 
                                        src={URL.createObjectURL(file)} 
                                        alt="" 
                                        className="object-cover w-full h-40 rounded-lg"
                                    />
                                    <button className="absolute top-0 right-0 bg-white p-1 w-6 h-6 rounded-full text-red-500" onClick={() => setMedia(media.filter((_, i) => i !== index))}>X</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-1/2 mx-auto mt-7">
                    <File files={files} setFiles={setFiles} type={'image'}/>
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