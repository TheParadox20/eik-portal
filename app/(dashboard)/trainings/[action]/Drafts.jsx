'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import {fetcher} from "@/app/lib/data"

export default function Drafts(){
    const {action} = useParams()

    const { data, error, isLoading } = useSWR(['/training/drafts',{},null, process.env.NEXT_PUBLIC_TRAININGS_URL], fetcher,{
        revalidateOnFocus: false,
        revalidateOnMount: true,
        errorRetryInterval: 3000
    })

    if(error) return <div>Error loading drafts</div>

    return(
        <div>
            <h5 className="text-lg font-semibold mt-8 mb-4">Drafts</h5>
            {
                isLoading?
                <p>Loading...</p>
                :
                data.data.map((draft)=>(
                    <Link className="text-secondary text-sm mb-2 block" key={draft.id} href={`/trainings/${action}?id=${draft.id}`}>
                        <p>{draft.title}</p>
                    </Link>
                ))
            }
        </div>
    )
}