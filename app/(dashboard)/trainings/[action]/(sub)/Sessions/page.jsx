'use client'

import { useState } from 'react'
import Editor from "@/app/ui/WYSIWYG/Editor"
import useSWR from 'swr'
import { postData, postFileFetcher, fetcher } from "@/app/lib/data"
import File from "@/app/ui/File"
import { useRouter, useSearchParams } from 'next/navigation'
import { popupE } from "@/app/lib/trigger";

let checks = [];

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [sessions, setSessions] = useState([])
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [description, setDescription] = useState('')
    const [files, setFiles] = useState([])

    const [selectedTrainer, setSelectedTrainer] = useState(null)
    const { data: trainers, isLoading, error } = useSWR(['/trainers', {}, null, process.env.NEXT_PUBLIC_TRAININGS_URL], fetcher,{
        revalidateOnFocus: false,
    })

    const handleAddSession = (e) => {
        e.preventDefault()
        const newSession = {
            title,
            date,
            youtubeUrl,
            description,
            resources: files,
            trainerId: selectedTrainer
        }
        setSessions([...sessions, newSession])
        
        // Reset form
        setTitle('')
        setDate('')
        setYoutubeUrl('')
        setDescription('')
        setFiles([])
    }

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        sessions.forEach(session => {
            checks.push(false);
            session.resources.forEach(() => {
                checks.push(false);
            });
        });
        sessions.forEach(session => {
            postData(
                (response)=>{
                    if(response.success){
                        console.log(checks)
                        checks.pop();
                        if(checks.length === 0){
                            router.push(`/trainings/create/Certificate?id=${id}`);
                        }
                        session.resources.forEach(async (resource, index) => {
                            await postFileFetcher(
                                [
                                    resource,
                                    {
                                        training_id: id,
                                        module_id: response.data.id,
                                    },
                                    '/training/module-media',
                                    null,
                                    process.env.NEXT_PUBLIC_TRAININGS_URL
                                ]
                            ).then((res) => {
                                if(res.success){
                                    checks.pop();
                                    if(checks.length === 0){
                                        router.push(`/trainings/create/Certificate?id=${id}`);
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                popupE('error', 'Error', 'File upload Error In response')
                            });
                        })
                    }
                },
                {
                    training_id: id,
                    trainer_id: selectedTrainer,
                    title: session.title,
                    time: session.date,
                    url: session.youtubeUrl,
                    description: session.description,
                    type: 'online',
                    status: 'completed'
                },
                '/training/modules',
                null,
                process.env.NEXT_PUBLIC_TRAININGS_URL
            )
        })
    }

    return (
        <div className="space-y-8">
            <h5 className="text-lg font-semibold mb-4">Modules</h5>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h6 className="text-lg font-medium mb-4">Add New Module</h6>
                
                <form onSubmit={handleAddSession} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Module Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter module title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700 my-1">
                            Trainer
                        </label>
                        <select
                            onChange={(e) => setSelectedTrainer(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value={null}>Select Trainer</option>
                            {trainers?.map((trainer) => (
                                <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            YouTube URL
                        </label>
                        <input
                            type="url"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter YouTube video URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <Editor content={description} setContent={setDescription} placeholder={'Enter module description'} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resources & Documents
                        </label>
                        <File files={files} setFiles={setFiles} />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add Session
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                {sessions.map((session, index) => (
                    <div key={index} className="flex flex-col p-5 bg-gray-100 rounded-lg">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex gap-3 items-end mb-3">
                                <h6 className="text-lg font-medium">{session.title}</h6>
                                <p className="text-black/70 text-sm">By: {trainers.find(trainer => trainer.id == session.trainerId)?.name}</p>
                            </div>
                            <p className="text-gray-600">{new Date(session.date).toLocaleString()}</p>
                            
                            {session.youtubeUrl && (
                                <div className="my-4 aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={`https://www.youtube.com/embed/${getYouTubeId(session.youtubeUrl)}`}
                                        title={session.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                            
                            <div className="mt-2" dangerouslySetInnerHTML={{ __html: session.description }}></div>
                            
                            {session.resources && session.resources.length > 0 && (
                                <div className="mt-4">
                                    <h6 className="text-sm font-medium text-gray-700 mb-2">Resources:</h6>
                                    <div className="flex flex-wrap gap-2">
                                        {session.resources.map((file, fileIndex) => (
                                            <a
                                                key={fileIndex}
                                                href={file.url}
                                                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span>{file.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end mt-5 gap-2">
                                <button
                                    className="bg-primary/30 text-primary px-4 py-2 rounded-md"
                                    onClick={() => {
                                        setTitle(session.title)
                                        setDate(session.date)
                                        setYoutubeUrl(session.youtubeUrl)
                                        setDescription(session.description)
                                        setFiles(session.resources)
                                        setSelectedTrainer(session.trainerId)
                                        setSessions(sessions.filter((_, i) => i !== index))
                                    }}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-warning/30 text-warning px-4 py-2 rounded-md"
                                    onClick={() => setSessions(sessions.filter((_, i) => i !== index))}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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