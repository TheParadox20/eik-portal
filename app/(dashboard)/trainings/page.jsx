'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher, postData, getData } from '@/app/lib/data';
import Spinner from '@/app/ui/Spinner';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon ,EllipsisVerticalIcon, DocumentIcon, UserIcon, PlusIcon,EyeIcon } from '@heroicons/react/24/outline';
import Overlay from '@/app/ui/overlay';
import Delete from './Delete';

export default function Page() {
    const router = useRouter();

    let [search, setSearch] = useState('')
    let [overlay, setOverlay] = useState('');
    let [active, setActive] = useState('');

    const { data:trainings, error, isLoading } = useSWR(['/training/all',{}], fetcher)
    if (isLoading) return <Spinner/>
    if (error) return <p>Error when fetching trainings</p>
    
    const handleModify = (id) => {
        getData((response)=>{
            if(response.success && response.data){
                router.push(`/trainings/modify?id=${response.data.id}`)
            }else{
                postData(
                    (r)=>{
                        if(r.success){
                            router.push(`/trainings/modify?id=${r.data.id}`);
                        }
                    },
                    {
                        reference_id: id,
                        title: trainings.data.find(t=>t.id == id).Name,
                        description: 'Please modify description',
                        category: '',
                        start: '',
                        end: ''
                    },
                    '/training',
                    null,
                    process.env.NEXT_PUBLIC_TRAININGS_URL
                )
            }
        },`/training/check`,{reference_id:id},null,process.env.NEXT_PUBLIC_TRAININGS_URL)
    }

    return (
    <main className="">
        <div className='flex flex-col md:flex-row justify-between md:mb-8'>
            <h1 className='text-primary text-xl md:text-2xl font-bold'>Trainings</h1>
            <div className='flex'>
                <div className="flex items-center rounded-full px-1 py-2 bg-tertiary bg-opacity-55 w-4/5 mx-auto md:w-4/12 md:mx-1">
                    <MagnifyingGlassIcon className="w-4 h-4 2xl:w-6 2xl:h-6 mx-2 mr-3"/>
                    <input className="bg-tertiary bg-opacity-5 active:bg-none active:border-none w-full text-xs 2xl:text-base" type="text" name="" id="" placeholder={'Search'} value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
                <Link href={'/trainings/create'} className='flex items-center bg-secondary text-white px-4 py-2 rounded-md font-semibold gap-2'> <PlusIcon className='w-5 h-5'/> New training</Link>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
        {
            trainings.data.map((training,i)=>{
                return(
                    <div key={i} className='shadow-md rounded-xl shadow-gray-400 relative my-9 p-3 flex md:w-4/5 mx-auto'>
                        <button className='absolute right-0' onClick={e=>{active==training.Name?setActive(''):setActive(training.Name)}}><EllipsisVerticalIcon className='w-7 h-7'/></button>
                        <div className=''>
                            <h3 className='font-bold text-xl mb-4 text-primary'>{training.Name}</h3>
                            <img src='/Training2.jpeg' className='mb-4'/>
                            <p className=''>{training.StartDate}</p>
                        </div>
                        {
                            active == training.Name &&
                            <div className="absolute bg-white border-t-2 shadow-lg right-3 top-10 px-5 p-2 rounded-b-lg">
                                <Link className='flex items-center my-2 hover:font-semibold gap-1' href={`/trainings/users?id=${training.id}`}><UserIcon className='w-5 h-5'/> Attendees</Link>
                                <button onClick={()=>handleModify(training.id)} className='flex items-center my-2 hover:font-semibold gap-1'><PencilSquareIcon className='w-5 h-5'/><span>Modify</span></button>
                                <a className='flex items-center my-2 hover:font-semibold gap-1' href={`https://elearning.eik.co.ke/course/${training.Name}`} target='blank'><EyeIcon className='w-5 h-5'/> Preview</a>
                                <button className='flex items-center my-2 hover:font-semibold gap-1 text-warning' onClick={e=>setOverlay('delete')}><TrashIcon className='w-5 h-5'/><span>Delete</span></button>
                            </div>
                        }
                    </div>
                )
            })
        }
        </div>
        <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
            {overlay === 'delete' && <Delete control={setOverlay} />}
        </Overlay>
    </main>
    );
}