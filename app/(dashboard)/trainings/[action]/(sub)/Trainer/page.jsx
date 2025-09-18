'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from 'swr'
import { postData, postFile, fetcher } from "@/app/lib/data"

export default function Page(){
    const router = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [selectedTrainers, setSelectedTrainers] = useState([])
    const [trainer, setTrainer] = useState(null)

    const { data: trainers, isLoading, error } = useSWR(['/trainers', {}, null, process.env.NEXT_PUBLIC_TRAININGS_URL], fetcher)

    const handleSubmit = (e) => {
        e.preventDefault()
        postData(
            (response)=>{
                if(response.success){
                    router.push(`/trainings/create/Sessions?id=${id}`);
                }
            },
            {
                training_id: id,
                trainers: selectedTrainers
            },
            '/trainers',
            null,
            process.env.NEXT_PUBLIC_TRAININGS_URL
        )
    }

    return(
        <div>
            <section className="bg-white rounded-lg shadow-sm p-6">
                <h5 className="text-2xl font-semibold mb-6 text-gray-800">Trainer(s) Information</h5>

                <div>
                    <div className="flex flex-wrap gap-3 pb-5">
                        {
                            selectedTrainers.map((trainer, index) => (
                                <button 
                                    key={index} 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex"
                                    onClick={() => setSelectedTrainers(selectedTrainers.filter((_, i) => i !== index))}
                                >
                                    <span>{trainer.name}</span>
                                    <span className='icon-[mdi--close] w-4 h-4'/>
                                </button>
                            ))
                        }
                    </div>
                    <label className="block text-sm font-medium text-gray-700 my-1">
                        Trainers
                    </label>
                    <select
                        onChange={(e) => setSelectedTrainers([...selectedTrainers, trainers.find(trainer => trainer.name === e.target.value)])}
                        className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value={null}>Select Trainer</option>
                        {trainers?.map((trainer) => (
                            <option key={trainer.id} value={trainer.name}>{trainer.name}</option>
                        ))}
                    </select>
                    <div className="flex items-center gap-10 w-3/4">
                        <input 
                            type="text" 
                            value={trainer} 
                            onChange={(e) => setTrainer(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mt-3"
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    setSelectedTrainers([...selectedTrainers, {name: trainer}])
                                    setTrainer('')
                                }
                            }}
                        />
                        <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            onClick={() => {
                                setSelectedTrainers([...selectedTrainers, {name: trainer}])
                                setTrainer('')
                            }}
                        >
                            Add
                        </button>
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