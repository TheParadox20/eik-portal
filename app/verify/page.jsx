'use client'
import { Scanner } from '@yudiel/react-qr-scanner';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from 'swr';
import { fetcher } from '@/app/lib/data';
import Spinner from '@/app/ui/Spinner';

export default function Page(){
    const params = useSearchParams();
    const id = params.get('id');
    const training = params.get('training');
    const conference = params.get('conference');
    const { data, error, isLoading } = useSWR(['/certificate/verify',{id,training,conference}], fetcher)

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    let verify = result=>{
        if (result.includes('https://portal.eik.co.ke/verify?'))
            window.location.href = result
        else
            alert('Invalid QR code')
    }

    if (isLoading) return <Spinner />
    if (error) return <p>Server Error</p>

    return(
        <Suspense>
            {
                id == null?
                <>
                <h3 className='my-4 text-center text-xl'>Scan QR Code</h3>
                <Scanner
                    onResult={(text, result) => verify(text)}
                    onError={(error) => console.log(error?.message)}
                    styles={{
                        container: {
                            height: '10%',
                            width: '100%'
                        },
                        finderBorder: 0,
                        video:{}
                    }}
                    options={{}}
                    components={{
                        audio: false,
                    }}
                />
                </>
                :
                (data && data?.user) ?
                <div className="mx-4 md:mx-auto md:w-2/3">
                    <span className="bg-primary text-white px-4 py-2 block my-4 text-center text-xl font-semibold lg:w-1/2">Certificate Valid</span>
                    {
                        training?
                        <>
                        <div className='my-2'>Issued to. {data['user']?.name}</div>
                        <div className='my-2'>For attending a one-month {data['training']?.Name}</div>
                        <div className='my-2'>
                            Date: {formatDate(data['training'].StartDate)} to {formatDate(data['training'].EndDate)}
                        </div>
                        </>
                        :
                        <>
                        <div className='my-2'>Issued to: {data['user'].name}</div>
                        <div className='my-2'>Member Number: {data['number']}</div>
                        {
                            data?.cert &&
                            <div className='my-2'>Certificate Number: {data?.cert?.Number}</div>
                        }
                        <div className='my-2'>Date issued: {data['created_at']}</div>
                        </>
                    }
                </div>
                :
                <div>
                    <p className='p-3'>Invalid Certificate</p>
                </div>
            }
        </Suspense>
    )
}