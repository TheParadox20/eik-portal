'use client'
import { useRouter } from "next/navigation"
import { PrinterIcon, EllipsisVerticalIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Overlay from "@/app/ui/overlay"
import Pay from "@/app/ui/Pay"
import MemberDetails from "@/app/ui/MemberDetails"
import Attachments from "./Attachments"
import Qualifications from "./Qualifications"
import Experience from "./Experience"
import Introductory from "./Introductory"
import Spinner from "@/app/ui/Spinner"
import { useState, useEffect } from "react"
import useProfile from "@/app/lib/hooks/useProfile"
import { getData, getFile } from "@/app/lib/data"
import { popupE } from "@/app/lib/trigger"
import useUser from "@/app/lib/hooks/useUser";
import History from "@/app/ui/History"

let getAmount = (role) => {
    switch (role) {
        case 'Student':
            return 500;
        case 'Affiliate':
            return 7500;
        case 'Honorary':
            return 0;
        case 'Associate':
            return 3000;
        case 'Lead':
            return 5000;
        case 'Fellow':
            return 0;
        default:
            break;
    }
}

function SectionHead({section, id}){
    let [showEdit, setShowEdit] = useState(false);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');

    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])
    
    const { user, isLoading, isError } = useUser()
    if (isLoading) return <></>
    if (isError) return <></>
    
    return(
        <>
        <div onClick={e=>{showEdit?setShowEdit(false):null}} className="flex justify-between border-b-2 py-4 my-4 mx-2 relative">
            <h3 className="font-bold text-lg">{section}</h3>
            {
                (section!='Trainings') &&
                <button onClick={e=>setShowEdit(!showEdit)}>
                    <EllipsisVerticalIcon className="h-6 w-6" />
                </button>
            }
            {
                showEdit &&
                <div onClick={e=>setShowEdit(false)} className={`flex shadow-lg p-4 absolute z-50 right-4 top-10 md:right-0 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`}>
                    <button className="flex gap-x-2" onClick={e=>setOverlay(section)}>
                        <PencilSquareIcon className="w-6 h-6"/>
                        Edit details
                    </button>
                </div>
            }
        </div>
        <Overlay control={setOverlay} className={`${showOverlay?'flex items-center justify-center':'hidden'}`} >
            {overlay=='Basic Information'?<MemberDetails id={id} control={setOverlay} />:null}
            {overlay=='Introductory Statement'?<Introductory id={id} control={setOverlay} />:null}
            {overlay=='Professional Qualification'?<Qualifications id={id} control={setOverlay} />:null}
            {overlay=='Work Experience'?<Experience id={id} control={setOverlay} />:null}
            {overlay=='Attachments'?<Attachments id={id} control={setOverlay} />:null}
        </Overlay>
        </>
    )
}

const currentYear = new Date().getFullYear();

export default function Individual({id,role}){
    let router = useRouter();
    let [overlay, setOverlay] = useState('');

    let print = e => {
        e.preventDefault();
        if(profile['certificate'] && profile['certificate']?.year==currentYear){
            if(profile['certificate'].verified){
                router.push(`/download/certificate?id=${profile['certificate'].number}`)
            } else{
                popupE('error','Error' ,'Certificate request has not been approved')
            }
        }else setOverlay('Pay')
    }

    let { data:profile, isLoading, isError } = useProfile(id, role)

    if (isLoading) return <Spinner />
    if (isError) return <>xxx</>

    console.log(profile)
    
    return(
        <>
        <header className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between ml-2 my-4">
            <h1 className="my-2 ml-2 md:ml-0 text-primary font-bold text-4xl">Profile</h1>
            <button className={`flex items-center h-fit bg-secondary w-fit text-white font-semibold px-4 py-2 rounded-md justify-between text-sm`} onClick={e=>print(e)}>
                <PrinterIcon className="h-6 w-6 mr-2" />
                {(profile['certificate'] && profile['certificate']?.year==currentYear)?'Print Certificate':'Print Certificate Request'}
            </button>
        </header>
        <div className="mx-2 lg:text-sm 2xl:text-base">
            <section>
                <SectionHead id={id} section={'Basic Information'}/>
                <div className="flex flex-col gap-x-3 md:flex-row w-full">
                    <div className="w-32 md:w-64 h-fit relative mr-4 mb-4">
                        {
                            <img src={profile?.photo?.[0]?.url ?? "/profile.svg"} className="w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg" alt="" />
                        }
                    </div>
                    {
                        profile.profile != undefined &&
                        <div className="grid gap-x-5 gap-y-3 md:grid-cols-2 text-sm w-full">
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Name of Expert:</span>
                                <span className="w-1/2">{profile.profile.name}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Category:</span>
                                <span className="w-1/2">{profile.profile.category}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Identification Number:</span>
                                <span className="w-1/2">{profile.profile.nationalID}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Postal Address:</span>
                                <span className="w-1/2">{profile.profile.postal}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap md:whitespace-pre-wrap w-1/2">NEMA Registration Number:</span>
                                <span className="w-1/2">{profile.profile.nema}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Town:</span>
                                <span className="w-1/2">{profile.profile.town}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Certificate Number:</span>
                                <span className="w-1/2">{profile['certificate'] && profile['certificate'].number}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">County:</span>
                                <span className="w-1/2">{profile.profile.county}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Firm of Experts:</span>
                                <span className="w-1/2">{profile.profile.firm}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Phone Number:</span>
                                <span className="w-1/2">{profile.profile.phone}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">KRA PIN:</span>
                                <span className="w-1/2">{profile.profile.kra}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Email:</span>
                                <span className="w-1/2">{profile.profile.email}</span>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <span className="font-bold whitespace-nowrap w-1/2">Nationality:</span>
                                <span className="w-1/2">{profile.profile.nationality}</span>
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
                <SectionHead id={id} section={'Introductory Statement'}/>
                <p className="max-h-96 overflow-y-scroll large-scroll">
                    {
                        profile.profile != undefined && 
                        <div 
                        className="" 
                        dangerouslySetInnerHTML={{ __html: profile.profile.bio }} 
                        />
                    }
                </p>
            </section>
            <section>
                <SectionHead section={'Trainings'}/>
                {
                    (profile.trainings != undefined && profile.trainings.length>0)?
                    profile.trainings.map((training, index) => {
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1">
                                <span className="font-bold w-fit">Title:</span>
                                <span className="md:whitespace-nowrap">{training.Name}</span>
                                <span className="font-bold w-fit">Start & Finish Date:</span>
                                <span className="md:whitespace-nowrap">{training.Start} - {training.End}</span>
                                <span className="font-bold w-fit">Info</span>
                                <div dangerouslySetInnerHTML={{ __html: training.Info }} />
                                <button className="text-secondary text-sm mt-2" onClick={e=>getFile(`${training.Name}.pdf`,'/training/download',{number:training.Number,training:training.id})}>Download certificate</button>
                            </div>
                        )
                    })
                    :
                    <p className="text-center my-8">You {"haven't"} participated in a training yet <a href="https://elearning.eik.co.ke/" target="blank" className="text-secondary">Sign up now</a></p>
                }
            </section>
            <section>
                <SectionHead section={'Conferences'}/>
                {
                    (profile.conferences != undefined && profile.conferences.length>0)?
                    profile.conferences.map((conference, index) => {
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 my-2">
                                <span className="font-bold w-fit">Title:</span>
                                <span className="md:whitespace-nowrap">{conference.conference.Name}</span>
                                <span className="font-bold w-fit">CPD points:</span>
                                <span className="md:whitespace-nowrap">{conference.conference.CPD}</span>
                                <span className="font-bold w-fit">Start & Finish Date:</span>
                                <span className="md:whitespace-nowrap">{conference.conference.StartDate} - {conference.conference.EndDate}</span>
                                <button className="text-secondary text-sm mt-2" onClick={e=>getFile(`${conference.conference.Name}.pdf`,`/conference/download/${conference.id}`,{})}>Download certificate</button>
                            </div>
                        )
                    })
                    :
                    <p className="text-center my-8">You {"haven't"} participated in a conference yet <a href="https://conference.eik.co.ke/" target="blank" className="text-secondary">Sign up now</a></p>
                }
            </section>
            <section>
                <SectionHead id={id} section={'Professional Qualification'}/>
                {
                    profile.education != undefined &&
                    profile.education.map((item, index) => {
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 mb-4">
                                <span className="font-bold w-fit">Institution:</span>
                                <span className="md:whitespace-nowrap">{item.institution}</span>
                                <span className="font-bold w-fit">Title:</span>
                                <span className="md:whitespace-nowrap">{item.Title}</span>
                                <span className="font-bold w-fit">Certification</span>
                                <span className="md:whitespace-nowrap">{item.Certification}</span>
                                <span className="font-bold w-fit">Start & Finish Date:</span>
                                <span className="md:whitespace-nowrap">{item.start} - {item.end}</span>
                            </div>
                        )
                    })
                }
            </section>
            <section>
                <SectionHead id={id} section={'Work Experience'}/>
                {
                    profile.profession != undefined &&
                    profile.profession.map((item, index) => {
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 mb-4">
                                <span className="font-bold w-fit">Company:</span>
                                <span className="md:whitespace-nowrap">{item.Organization}</span>
                                <span className="font-bold w-fit">Company Email:</span>
                                <span className="md:whitespace-nowrap">{item.Email}</span>
                                <span className="font-bold w-fit">Company Telephone:</span>
                                <span className="md:whitespace-nowrap">{item.Phone}</span>
                                <span className="font-bold w-fit">Location</span>
                                <span className="md:whitespace-nowrap">{item.Location}</span>
                                <span className="font-bold w-fit">Job title</span>
                                <span className="md:whitespace-nowrap">{item.Position}</span>
                                <span className="font-bold w-fit">Duties</span>
                                <span className="md:whitespace-nowrap">{item.Duties}</span>
                                <span className="font-bold w-fit">Start & Finish Date:</span>
                                <span className="md:whitespace-nowrap">{item.start} - {item.end}</span>
                            </div>
                        )
                    })
                }
            </section>
            <section>
                <SectionHead id={id} section={'Attachments'}/>
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
            {
                id &&
                <section>
                    <SectionHead id={id} section={'Payment History'}/>
                    <History id={id} />
                </section>
            }
        </div>
        <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
            {
            overlay=='Pay' &&
            <div className="bg-white px-8 py-6 rounded-md">
                <div className="flex mb-8 justify-end items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
                    <XMarkIcon className="w-8 h-8" onClick={e=>setOverlay('')} />
                </div>
                <Pay title={'Annual Fees'} description={'Annual subscription fee'} amount={getAmount(profile.profile.category)} email={profile.profile.email} phone={profile.profile.phone} name={profile.profile.name} />
                <div className="flex justify-end">
                    <button className="text-white bg-primary p-3 rounded-lg mt-5 font-semibold text-sm cursor-pointer hover:scale-105" onClick={e=>{
                        getData((response)=>{
                            setOverlay('')
                        }, '/request', {id})
                    }}>
                        Already paid? Proceed
                    </button>
                </div>
            </div>
            }
        </Overlay>
        </>
    )
}