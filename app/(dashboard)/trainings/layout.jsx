'use client'
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TrainingsLayout({children}){
    let path = usePathname();

    return(
        <div>
            {
                path!=='/trainings' && <Link href={'/trainings'} className="flex hover:font-semibold items-center"><ChevronLeftIcon className="w-5 h-5"/> Back</Link>
            }
            {children}
        </div>
    )
}