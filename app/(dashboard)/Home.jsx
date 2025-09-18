'use client'
import Link from "next/link"
import { Suspense, useState } from "react"
import useSWR from "swr";
import { fetcher, getData, postData } from "@/app/lib/data";
import Spinner from "@/app/ui/Spinner";
import useUser from "@/app/lib/hooks/useUser";
import useProfile from "@/app/lib/hooks/useProfile"
import Overlay from "@/app/ui/overlay"
import Pay from "@/app/ui/Pay"
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { popupE } from "../lib/trigger";
import dynamic from 'next/dynamic'
const DotLottieReact = dynamic(() =>import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),{ssr: false,})

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
        case 'Corporate':
            return 7500;
        default:
            break;
    }
}

function Trainings(){
    let { data, error, isLoading } = useSWR(['/trainings',{filter:'upcoming'},null, process.env.NEXT_PUBLIC_TRAININGS_URL], fetcher,{
        revalidateOnFocus: true,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
        errorRetryInterval: 300000
    });  

    let getSuffix = (day) => {
        if (day === 1 || day === 21 || day === 31) return 'st';
        if (day === 2 || day === 22) return 'nd';
        if (day === 3 || day === 23) return 'rd';
        return 'th';
    }

    if(error || isLoading) return <div className="flex w-full h-[30vh] items-center justify-center">Loading Trainings...</div>
    return(
        <>
        <div>
            <h3 className="text-2xl 2xl:text-3xl text-right md:text-left font-bold">Upcoming <span className="text-primary">Trainings</span></h3>
        </div>
        {
            data?.data?.length>0?
            <div className="flex flex-col md:flex-row gap-12 bg-gradient-to-r from-white from-70% to-primary/70 to-95% py-12">
                <div>
                    <img className="md:w-3/4 max-h-96 rounded-lg" src={data.data[0].media[0].url} alt="" />
                </div>
                <div className="md:w-2/5">
                    <h3 className="text-secondary text-xl 2xl:text-2xl font-bold">{data.data[0].title}</h3>
                    <p className="mt-4 text-right text-lg font-semibold">
                        {new Date(data.data[0].start_date).getDate()}<span className="align-super text-xs">{getSuffix(new Date(data.data[0].start_date).getDate())}</span> - 
                        {new Date(data.data[0].end_date).getDate()}<span className="align-super text-xs">{getSuffix(new Date(data.data[0].end_date).getDate())}</span> {' '}
                        {new Date(data.data[0].end_date).toLocaleString('default', { month: 'long' })} {new Date(data.data[0].end_date).getFullYear()}
                    </p>
                    <p className="mt-2">
                     <div dangerouslySetInnerHTML={{ __html: data.data[0].description }} className="whitespace-pre-wrap"></div>
                    </p>
                    <a href={`https://elearning.eik.co.ke/course/${data.data[0].title}`} target="_blank" rel="noopener noreferrer">
                        <button className="bg-secondary text-white py-2 px-4 font-semibold mt-6 rounded-lg hover:scale-105">Register Now</button>
                    </a>
                </div>
            </div>
            :
            <div className="text-center text-lg">No upcoming trainings</div>
        }
        </>
    )
}

function TWG({joined, twg, key, mutate}){
    let [show, setShow] = useState(false);
    let [showDetails, setShowDetails] = useState(false);

    let join = (e, twg, action) => {
        e.preventDefault();
        if(action) getData(()=>{mutate()},'/twg/join',{twg})
        else getData(()=>{mutate()},'/twg/exit',{twg})
    }

    return(
        <div key={key} className="bg-white rounded-lg shadow-lg p-6 my-4 md:mx-2 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h6 className="font-bold text-xl text-gray-800">{twg.name}</h6>
                    {joined && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Member
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={e=>setShowDetails(!showDetails)} 
                        className="text-secondary hover:text-primary transition-colors duration-200"
                        title="View Details"
                    >
                        {showDetails ? <MinusIcon className="w-6 h-6"/> : <PlusIcon className="w-6 h-6"/>}
                    </button>
                    <button onClick={e=>setShow(!show)} className="block md:hidden">
                        {show ? <MinusIcon className="w-6 h-6"/> : <PlusIcon className="w-6 h-6"/>}
                    </button>
                </div>
            </div>
            
            <div className={`${!show?'hidden':'block'} md:block`}>
                <p className="text-gray-700 leading-relaxed mb-4">{twg.text}</p>
                
                {showDetails && (
                    <div className="border-t pt-4 mt-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h6 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Key Responsibilities
                                </h6>
                                <ul className="space-y-2">
                                    {twg.responsibility?.map((resp, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div>
                                <h6 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Ideal Membership
                                </h6>
                                <ul className="space-y-2">
                                    {twg.membership?.map((member, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{member}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <button 
                        onClick={e=>setShowDetails(!showDetails)} 
                        className="text-secondary hover:text-primary font-medium text-sm transition-colors duration-200"
                    >
                        {showDetails ? 'Hide Details' : 'View Details'}
                    </button>
                    <button 
                        onClick={e=>join(e,twg.name, !joined)} 
                        className={`${joined ? 'bg-warning hover:bg-warning/80' : 'bg-secondary hover:bg-secondary/80'} text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:scale-105`}
                    >
                        {joined ? 'Leave Group' : 'Join Group'}
                    </button>
                </div>
            </div>
        </div>
    )
}

function TWGs(){
    const { data:twgs, error, isLoading, mutate } = useSWR(['/twg/index',{}], fetcher)

    return(
        <section className="mb-12">
            <h3 className="text-2xl 2xl:text-3xl text-right md:text-left my-6 font-bold">Technical Working <span className="text-primary">Groups (TWGs)</span></h3>
            <div className="flex flex-col-reverse md:flex-row items-center mb-8">
                <div className="flex-grow">
                    <DotLottieReact
                        src="/animations/group.lottie"
                        loop
                        autoplay
                    />
                </div>
                <p className="md:w-1/2 text-justify leading-6">
                    The Environmental Institute of Kenya (EIK) offers specialized Technical Working Groups (Professional Chapters) that focus on key disciplines within the environmental field. These groups provide members with a platform to collaborate, share knowledge, and contribute to the advancement of environmental conservation and sustainability. By joining a chapter aligned with your expertise or interest, you can engage with like-minded professionals and actively shape the future of Kenya{"\'"}s environmental sector. <span className="font-semibold text-secondary">Select your preferred working group below to get started</span>.
                </p>
            </div>
            {
                (isLoading || error) ?
                <div className="w-full h-[10vh]"><Spinner internal={true} /></div>
                :
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {
                        twgs?.all?.map((twg, i) => {
                            return <TWG key={i} twg={twg} mutate={mutate} joined={Array.isArray(twgs.twgs) ? twgs.twgs.includes(twg.name) : false} />
                        })
                    }
                </div>
            }
        </section>
    )
}

function RSVP(){
    return(
        <div>
            <h3>RSVP</h3>
        </div>
    )
}

export default function Home(){
    let [overlay, setOverlay] = useState('');
    let [paymentMeta, setPaymentMeta] = useState({
        title: 'Annual Fees',
        description:'Annual subscription fee'
    })
    const { user, isLoading, isError, mutate } = useUser()
    let { data:profile, isProfileLoading, isProfileError } = useProfile()
    
    if (isLoading  || isProfileLoading) return <Spinner />
    if (isError || isProfileError) return <div>Server error</div>

    const name = user.name.split(' ');
    if(name.length==1) name.push('');
    let displayName = (`${name[0]}, ${name[1].charAt(0)}!`);

    const rsvp = (type)=>{
        popupE('processing','processing','Processing... please wait')
        postData(
            (response)=>{
                if(response.success){
                    mutate()
                }
            },{type},'/agm/rsvp'
        )
    }

    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return(
        <Suspense fallback={<div>Loading....</div>}>
        <div className="m-2">
            {
                !user?.active &&
                <div className="bg-warning text-white flex flex-col md:flex-row gap-3 px-4 py-5 rounded-md mb-10 items-center">
                    <p>Your membership with the EIK has expired. Please renew your membership to continue receiving member privileges.</p>
                    <button onClick={e=>setOverlay('Pay')} className="bg-secondary text-white font-semibold ml-5 py-3 rounded-md px-4 hover:scale-105">Renew Membership</button>
                </div>
            }
            {
                (user?.active && false) &&
                (
                    user?.RSVP ?
                    <div className="bg-gradient-to-r from-primary/70 to-primary/90 text-white flex flex-col md:flex-row gap-3 px-4 py-5 rounded-md mb-10 items-center">
                        <p className="text-center font-semibold w-full">
                            {
                                user?.RSVP?.type=='apologies'?
                                'Successfully Submitted Apologies for the AGM'
                                :
                                'Successfully Reserved a seat for the AGM'
                            }
                        </p>
                    </div>
                    :
                    <div className="bg-gradient-to-br from-primary/90 to-primary/70 text-white flex flex-col md:flex-row gap-3 px-4 py-5 rounded-md mb-10 items-center justify-between">
                        <p className="text-center md:text-left">The EIK is pleased to announce that the 2025 Annual General Meeting (AGM) will be held on 
                            <br /> 
                            <span className="font-semibold">30th May, 2025</span> at the <span className="font-semibold">Utalii Hotel</span> <span className="font-semibold">from 8a.m. to 1p.m.</span>. All valid members are cordially invited to attend.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <button
                            onClick={e=>rsvp('online')} 
                            className="bg-secondary text-white font-semibold ml-5 py-3 rounded-md px-8 hover:scale-105 text-sm flex flex-col gap-y-1"
                            >
                                RSVP
                                <span className="block text-xs">Virtual</span>
                            </button>
                            <button
                            onClick={e=>rsvp('physical')} 
                            className="bg-secondary text-white font-semibold ml-5 py-3 rounded-md px-8 hover:scale-105 text-sm flex flex-col gap-y-1"
                            >
                                RSVP
                                <span className="block text-xs">Physical</span>
                            </button>
                            <button
                            onClick={e=>rsvp('apologies')} 
                            className="bg-warning text-white font-semibold ml-5 py-3 rounded-md px-8 hover:scale-105 text-sm flex flex-col gap-y-1"
                            >
                                Apologies
                                <span className="block text-xs">I will not be able to attending</span>
                            </button>
                        </div>
                    </div>
                )
            }
            <div className="flex flex-col md:flex-row">
                <div>
                    <h2 className="text-3xl 2xl:text-4xl text-right md:text-left mb-6 font-bold">Hello, <span className="text-primary">{displayName}</span></h2>
                    <p className="w-2/3 hidden md:block text-base 2xl:text-base">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
                    <div className="my-5">
                        <div className="grid md:grid-cols-2 md:w-1/2 gap-1">
                            <div className="font-semibold whitespace-nowrap text-lg">Membership status:</div>
                            <div className={`${user?.active?'':'text-warning'}`}>{user?.active?'Active':'Expired'}</div>
                            <div className="font-semibold whitespace-nowrap text-lg">Membership type:</div>
                            <div>{profile?.profile?.category}</div>
                            <div className="font-semibold whitespace-nowrap text-lg">Expiry date:</div>
                            <div>{`31st December, ${user?.active?currentYear:previousYear}`}</div>
                            <div className="font-semibold whitespace-nowrap text-lg">CPD Points:</div>
                            <div>{user?.points} points.</div>
                            <div className="font-semibold whitespace-nowrap text-lg">Technical Working Groups:</div>
                            <div>
                                {
                                 profile?.twgs?.twgs.map((twg,i)=>(<span className="block my-1 md:whitespace-nowrap" key={i}>{twg}</span>))   
                                }
                            </div>
                        </div>
                        {
                            !user?.active &&
                            <div className="md:w-1/2 mt-4">
                                <p>
                                Your membership expired on <span className="font-semibold">31st December, {previousYear}.</span> Please make a payment to renew your subscription and continue enjoying the benefits of being an EIK member.
                                </p>
                                <div className="flex items-center gap-2">
                                    <button onClick={e=>setOverlay('Pay')} className="bg-secondary text-white font-semibold mt-5 py-3 rounded-md px-4 hover:scale-105">Make Payment</button>

                                    <button onClick={e=>postData(
                                        (response)=>{},
                                        {},
                                        '/actions/notify',
                                    )} className="bg-primary text-white font-semibold mt-5 py-3 rounded-md px-4 hover:scale-105 flex items-center gap-2 text-sm">
                                        <span className="w-6 h-6 icon-[basil--notification-outline]"/>
                                        <span>Ping Admin</span>
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <img src="/icons/Home.svg" className="" alt="" />
                </div>
                <p className="block md:hidden">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
            </div>

            <TWGs />

            <Trainings />

            <div className="w-4/5 2xl:w-2/3 mx-auto my-12">
                <h3 className="text-2xl 2xl:text-3xl mb-6 font-bold text-center">Our Latest <span className="text-primary">Newsletters</span></h3>
                <p className="text-center">
                Stay informed with the most recent updates on environmental initiatives, research insights, and community engagement efforts. Stay connected, stay informed, and join us as we strive towards a sustainable future for Kenya and beyond.
                </p>
            </div>
            <div className="flex flex-col md:flex-row my-4 gap-5 2xl:gap-8 justify-center">
                <div className="md:w-1/3 2xl:w-1/4 rounded-lg shadow-lg">
                    <img src="/home/transforming.png" alt="" />
                    <div className="p-4">
                        <h6 className="font-bold">Transforming Trash Into Treasure</h6>
                        <p className="py-4 whitespace-pre-wrap">
                        Explore how every piece of trash we collected brings us one step closer to a cleaner, healthier future for our community and the planet.
                        </p>
                        <Link href={'#'}><span className="text-secondary font-light hover:font-normal">Read More {">>"} </span></Link>
                    </div>
                </div>
                <div className="md:w-1/3 2xl:w-1/4 rounded-lg shadow-lg">
                    <img src="/home/oasis.png" alt="" />
                    <div className="p-4">
                        <h6 className="font-bold">An Oasis ofHope</h6>
                        <p className="py-4 whitespace-pre-wrap">
                        Explore how this vital resource is not just water, but the promise of a brighter, more sustainable future for generations to come.
                        </p>
                        <Link href={'#'}><span className="text-secondary font-light hover:font-normal">Read More {">>"} </span></Link>
                    </div>
                </div>
                <div className="md:w-1/3 2xl:w-1/4 rounded-lg shadow-lg">
                    <img src="/home/sustainability.png" alt="" />
                    <div className="p-4">
                        <h6 className="font-bold">Sowing seeds of sustainability</h6>
                        <p className="py-4 whitespace-pre-wrap">
                        Explore how each seedling planted symbolizes not just a tree, but a pledge to nurture nature and cultivate a sustainable future.
                        </p>
                        <Link href={'#'}><span className="text-secondary font-light hover:font-normal">Read More {">>"} </span></Link>
                    </div>
                </div>
            </div>
            <h3 className="text-2xl 2xl:text-3xl my-10 font-bold text-center">Frequently Asked <span className="text-primary">Questions (FAQs) </span></h3>
        </div>
        <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
            {
            overlay=='Pay' &&
            <div className="bg-white px-8 py-6 rounded-md md:w-1/3">
                <div className="flex justify-between mb-6">
                    <h6 className="font-semibold text-lg">Make Payment</h6>
                    <button onClick={e=>setOverlay('')}><XMarkIcon className="w-8 h-8"/></button>
                </div>
                <Pay title={paymentMeta.title} description={paymentMeta.description} amount={getAmount(profile?.profile?.category)} email={profile?.profile?.email} phone={profile?.profile?.phone} name={profile?.profile?.name} />
            </div>
            }
            {
                overlay=='RSVP' &&
                <div className="bg-white px-8 py-6 rounded-md md:w-1/3">
                    <h6 className="font-semibold text-lg">RSVP</h6>
                    <button onClick={e=>setOverlay('')}><XMarkIcon className="w-8 h-8"/></button>
                </div>
            }
        </Overlay>
        </Suspense>
    )
}