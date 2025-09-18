'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export default function Navigation(){
    let path = usePathname().replaceAll('%20',' ');
    let pathArray = path.split('/')
    let sub = pathArray[pathArray.length-1];
    let pages = ['Basic Information', 'Pricing','Media', 'Trainer', 'Sessions','Certificate','Publish']
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const getPageState = (index, currentPage) => {
        // Get index of current page
        const currentIndex = pages.findIndex(p => path.includes(p)) || 0;
        
        if (index < currentIndex) {
            return "text-primary"; // Completed pages
        } else if (index === currentIndex) {
            return "text-primary font-semibold"; // Current page
        }
        return "text-gray-400"; // Upcoming pages
    }

    return (
        <nav>
            {
                pages.map((page,index)=>{
                    return(
                        <Link key={index} href={`/trainings/create/${index==0?'':page}${id && `?id=${id}`}`} className={`flex items-center my-5 ${getPageState(index, page)}`}>
                            <div className="mr-1">
                                {index < pages.findIndex(p => path.includes(p)) && 
                                    <span className="w-6 h-6 icon-[teenyicons--tick-circle-outline] text-primary"/>
                                }
                                {index === pages.findIndex(p => path.includes(p)) && 
                                    <span className="w-6 h-6 icon-[fluent--radio-button-16-filled] text-primary"/>
                                }
                                {index > pages.findIndex(p => path.includes(p)) && 
                                    <span className="w-6 h-6 icon-[fluent--radio-button-16-regular] text-gray-400"/>
                                }
                            </div>
                            {page}
                        </Link>
                    )
                })
            }
        </nav>
    )
}