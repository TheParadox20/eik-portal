'use client'
import { useRouter } from "next/navigation"
import { PrinterIcon, EllipsisVerticalIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Overlay from "@/app/ui/overlay"
import Pay from "@/app/ui/Pay"
import FirmDetails from "@/app/ui/FirmDetails"
import { useState, useEffect } from "react"
import { getData } from "@/app/lib/data"
import { popupE } from "@/app/lib/trigger"
import useProfile from "@/app/lib/hooks/useProfile"
import Spinner from "@/app/ui/Spinner"

function SectionHead({section, id}){
    let [showEdit, setShowEdit] = useState(false);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');

    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])
    return(
        <>
        <div onClick={e=>{showEdit?setShowEdit(false):null}} className="flex justify-between border-b-2 py-4 my-4 mx-2 relative">
            <h3 className="font-bold text-lg">{section}</h3>
            <button onClick={e=>setShowEdit(!showEdit)}>
                <EllipsisVerticalIcon className="h-6 w-6" />
            </button>
            {
                showEdit &&
                <div onClick={e=>setShowEdit(false)} className={`flex absolute z-50 right-4 top-10 md:right-0 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`}>
                    <div className="flex gap-x-2" onClick={e=>setOverlay(section)}>
                        <PencilSquareIcon className="w-6 h-6"/>
                        Edit details
                    </div>
                </div>
            }
        </div>
        <Overlay control={setOverlay} className={`${showOverlay?'flex items-center justify-center':'hidden'}`} >
            {overlay=='Basic Information'?<FirmDetails control={setOverlay} id={id} />:null}
        </Overlay>
        </>
    )
}
export default function Firm({id, role}){
    let [overlay, setOverlay] = useState('');

    let router = useRouter()

    let { data:profile, isLoading, isError } = useProfile(id, role)

    if (isLoading) return <Spinner />
    if (isError) return <>xxx</>

    let print = e => {
        e.preventDefault();
        if(profile['certificate']){
            if(profile['certificate'].verified){
                router.push(`/download/certificate?id=${profile['certificate'].number}`)
            } else{
                popupE('error','Error' ,'Certificate request has not been approved')
            }
        }else  setOverlay('Pay')
    }
    
    return(
        <>
        <header className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between ml-2 my-4">
            <h1 className="my-2 ml-2 md:ml-0 text-primary font-bold text-4xl">Profile</h1>
            <button className="flex items-center h-fit bg-secondary w-fit text-white font-semibold px-4 py-2 rounded-md justify-between text-sm" onClick={e=>print(e)}>
                <PrinterIcon className="h-6 w-6 mr-2" />
                {profile['certificate']?'Print Certificate':'Print Certificate Request'}
            </button>
        </header>
        <div className="mx-2">
            <section>
                <SectionHead section={'Basic Information'} id={id}/>
                <div className="flex flex-col gap-x-3 md:flex-row w-full">
                    <div className="w-32 md:w-64 h-fit relative mr-4 mb-4">
                    {
                            <img src={profile?.photo?.[0]?.url ?? "/profile_firm.png"} className="w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg" alt="" />
                        }
                    </div>
                    {
                        profile.profile &&
                        <div className="grid gap-x-5 gap-y-4 text-sm w-full lg:w-1/2 2xl:w-1/3">
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Firm of Expert</span>
                                <span className="w-1/2">{profile.profile.name}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold md:whitespace-pre-wrap w-1/2 whitespace-pre-wrap">NEMA Registration Number:</span>
                                <span className="w-1/2">{profile.profile.nema}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Certificate Number:</span>
                                <span className="w-1/2">{profile?.certificate?.number}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Firm PIN Number:</span>
                                <span className="w-1/2">{profile.profile.kra}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Postal Address:</span>
                                <span className="w-1/2">{profile.profile.postal}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Town:</span>
                                <span className="w-1/2">{profile.profile.town}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">County:</span>
                                <span className="w-1/2">{profile.profile.county}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Phone Number:</span>
                                <span className="w-1/2">{profile.profile.phone}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Email Address:</span>
                                <span className="w-1/2">{profile.profile.email}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Alternative Email Address:</span>
                                <span className="w-1/2">{profile.profile.alternate}</span>
                            </div>
                        </div>
                    }
                </div>
            </section>
            <section>
                <SectionHead section={'Attachments'}/>
                {
                    profile.requirements != undefined &&
                    profile.requirements.map((file, index) => (
                        <div className="flex gap-5" key={index}>
                            <span>{file.title}</span>
                            <a className="text-secondary underline mb-2 block" href={`${file.url}`} target='blank' download>{file.name}</a>
                        </div>
                    ))
                }
            </section>
        </div>
        <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
            {
            overlay=='Pay' &&
            <div className="bg-white px-8 py-6 rounded-md">
                <div className="flex mb-8 justify-end items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
                    <XMarkIcon className="w-8 h-8" onClick={e=>setOverlay('')} />
                </div>
                <Pay title={'Annual Fees'} description={'Annual subscription fee'} amount={7500} email={profile.profile.email} phone={profile.profile.phone} name={profile.profile.name} />
                <button className="text-primary mt-2 font-semibold text-right cursor-pointer text-lg hover:scale-105" onClick={e=>{
                    getData((response)=>{
                        setOverlay('')
                    }, '/request', {id})
                }}>
                    Already paid? Proceed
                </button>
            </div>
            }
        </Overlay>
        </>
    )
}