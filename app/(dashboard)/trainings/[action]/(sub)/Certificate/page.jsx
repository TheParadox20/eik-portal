'use client'
import { useState } from "react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import Modify from "./Modify";
import { PhotoIcon, QrCodeIcon, CalendarDaysIcon, UserIcon, IdentificationIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

export default function Certificate(){
    const router = useRouter();
    const {action: act} = useParams();
    let searchParams = useSearchParams();
    let id = searchParams.get('id');
    let [action, setAction] = useState('');
    let [showMenu, setShowMenu] = useState(false);
    return(
        <>
        <h5 className="text-lg font-semibold mb-4">Certificate Generator</h5>
        <div className='hidden md:flex justify-between bg-gray-200/70 py-8 px-4 mt-4 relative'>
            <button className="absolute left-96 top-5 rounded-md bg-secondary hover:bg-primary text-white hover:scale-105 py-2 px-4 flex items-center gap-1" onClick={e=>setShowMenu(!showMenu)}>Options <span className="icon-[mingcute--right-line] w-5 h-5"/> </button>
            <div className={`bg-white px-4 py-4 flex-col w-56 gap-5 rounded-lg mr-2 absolute ${showMenu?'flex':'hidden'}`} onClick={e=>setShowMenu(false)}>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Background'?'text-primary scale-105':''}`} onClick={e=>setAction('Background')}><PhotoIcon className='w-8 h-8'/> <span className=''>Background</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Name'?'text-primary scale-105':''}`} onClick={e=>setAction('Name')}><UserIcon className='w-8 h-8'/> <span className=''>Name</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Info'?'text-primary scale-105':''}`} onClick={e=>setAction('Info')}><ChatBubbleBottomCenterTextIcon className='w-8 h-8'/> <span className=''>Info</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Number'?'text-primary scale-105':''}`} onClick={e=>setAction('Number')}><IdentificationIcon className='w-8 h-8'/> <span className=''>Number</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='QRcode'?'text-primary scale-105':''}`} onClick={e=>setAction('QRcode')}><QrCodeIcon className='w-8 h-8'/> <span className=''>QRcode</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Date'?'text-primary scale-105':''}`} onClick={e=>setAction('Date')}><CalendarDaysIcon className='w-8 h-8'/> <span className=''>Date</span></button>
            </div>
            <iframe className='w-[1045px] h-[740px]' src={`${process.env.NEXT_PUBLIC_BASE_URL}/view/certificates/training/${id}`} frameborder="0"></iframe>
            {
                action!='' && <Modify control={setAction} action={action} />
            }
        </div>
        <section className="flex justify-end my-5">
            <button 
            className="bg-secondary text-white px-4 py-2 rounded-md"
            onClick={e=>router.push(`/trainings/${act}/Publish?id=${id}`)}
            >
                Publish
            </button>
        </section>
        </>
    )
}