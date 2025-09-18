'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { postData } from "@/app/lib/data"

export default function Page(){
    const [membersPrice, setMembersPrice] = useState(null)
    const [nonMembersPrice, setNonMembersPrice] = useState(null)
    const [studentPrice, setStudentPrice] = useState(null)
    const router = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const handleSubmit = (e) => {
        e.preventDefault()
        postData(
            (response)=>{
                if(response.success){
                    router.push(`/trainings/create/Media?id=${id}`);
                }
            },
            {
                membersPrice,
                nonMembersPrice,
                studentPrice,
                training_id: id
            },
            '/training/pricing',
            null,
            process.env.NEXT_PUBLIC_TRAININGS_URL
        )
    }

    return(
        <div>
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h5 className="text-2xl font-semibold mb-6 text-gray-800">Pricing Information</h5>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Members Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2">Ksh.</span>
                            <input 
                                type="number" 
                                className="w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder="0.00"
                                value={membersPrice}
                                onChange={e=>setMembersPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Non-Members Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2">Ksh.</span>
                            <input 
                                type="number" 
                                className="w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder="0.00"
                                value={nonMembersPrice}
                                onChange={e=>setNonMembersPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2">Ksh.</span>
                            <input 
                                type="number" 
                                className="w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder="0.00"
                                value={studentPrice}
                                onChange={e=>setStudentPrice(e.target.value)}
                            />
                        </div>
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