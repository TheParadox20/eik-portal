'use client'
import { useSearchParams } from 'next/navigation';
import { fetcher, getFile } from "@/app/lib/data";
import useSWR from 'swr';
import Spinner from '@/app/ui/Spinner';
import { popupE } from '@/app/lib/trigger';

const currentYear = new Date().getFullYear();
export default function Page() {
    let params = useSearchParams();
    let id = params.get('id');

    let {data, isLoading, error} = useSWR(['/certificate/verify', {id:id}, ''], fetcher);

    if (isLoading) return <Spinner />

    if (error || data.error) return <div className='flex justify-center items-center h-[100vh] text-center text-warning font-bold text-2xl'>Invalid certificate</div>

    let download = (e)=>{
        e.preventDefault();
        popupE('ok', 'processing', 'Please wait...');
        getFile(`${data['user'].name}.pdf`,'/certificate/download',{id:id})
    }
    
    return (
        
        <div className=''>
            <h1 className='text-primary text-center text-xl md:text-2xl font-bold mt-8 md:mb-8'>Download Certificate</h1>
            <div className='flex items-center justify-center gap-12'>
                <div className=''>Valid upto: 31-12-{currentYear}</div>
                <button className=' px-5 py-2 bg-secondary hover:bg-primary text-white my-4 rounded-full' onClick={e=>download(e)}>Download</button>
            </div>

            <div className='scale-[20%] md:scale-100 md:flex md:justify-center'>
                <iframe className='w-[1045px] h-[740px]' src={`${process.env.NEXT_PUBLIC_BASE_URL}/view/certificates/member?id=${id}`} frameborder="0"></iframe>
            </div>
            <div className='md:hidden flex flex-col mx-2 justify-center'>
                <p>Issued to: {data.user.name.toUpperCase()}</p>
                <p>On: {data.verified}</p>
                <p>Member number: {data.number}</p>
            </div>
        </div>
    );
}