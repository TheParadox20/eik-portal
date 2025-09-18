'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Head from '@/app/ui/head';
import Overlay from "@/app/ui/overlay";
import MemberDetails from "@/app/ui/MemberDetails";
import Delete from "./Delete";
import { EllipsisVerticalIcon, UserCircleIcon, TrashIcon, CheckIcon, XMarkIcon, DocumentIcon, CheckCircleIcon } from  "@heroicons/react/24/outline";
import { getData } from "@/app/lib/data";
import { popupE } from "@/app/lib/trigger";

export default function Page(){
    let Range = useState(20);
    let Genesis = useState(0);//pointer to the first data
    let Search = useState("");
    let [total, setTotal] = useState(0);
    let TH = ['Full name', 'Email', 'NEMA Reg. No.', 'Certificate No.',  'Date Registered', 'Action'];
    let Sort = useState(TH[0]);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [optionsAt, setOptionsAt] = useState(-1);
    let [userID, setUserID] = useState(null);
    
    let [data, setData] = useState([]);
    let router = useRouter();

    useEffect(()=>{
        getData((response)=>{
            setData(response.members)
            setTotal(response.count)
        }, '/admin/members', {search:Search[0], limit:Range[0], Genesis:Genesis[0], count:true})
    },[])
    useEffect(()=>{},[Sort[0]])
    useEffect(()=>{
        console.log('Genesis:',Genesis[0])
        if (Range[0] > data.length) getData(setData, '/admin/members', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        if (Search[0].length > 3) getData(setData, '/admin/members', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        else getData(setData, '/admin/members', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
    },[Range[0],Search[0], Genesis[0]])
    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])

    let action = (e,id, action) => {
        e.preventDefault();
        popupE('ok', 'processing', 'Please wait...')
        getData((_)=>{}, '/user/verify', {verify:action, user:id})
        getData(setData, '/admin/members', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
    }

    return(
        <div onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
        <Head Range={Range} total={total} Search={Search} Title={'Members'} TH={TH} Sort={Sort} placeholder={'Search members'} Genesis={Genesis}>
        </Head>
        <div className="overflow-x-scroll mt-2 md:mt-10 mx-2 lg:mx-0 max-h-96 md:max-h-[65vh] overflow-y-scroll">
        <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
            <thead className="capitalize bg-gray-100 sticky top-0">
                <tr>
                {
                    TH.map((th, index) => {
                        return (<th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">{th}</th>)
                    })
                }
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.slice(0,Range[0]).map((data,index)=>{
                        return(
                            <tr key={data['id']} className="border-b border-gray-300">
                                <td className="px-6 py-4 whitespace-nowrap">{data['name']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['email']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['nema']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['number']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['created_at']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className={`border-2 ${data['email_verified_at']==null?'border-primary text-primary':'border-gray-900/50 text-gray-900'} mr-4`} onClick={e=>action(e, data['id'], 'true')}>
                                        <CheckIcon className="w-5 h-5"/>
                                    </button>
                                    <button className={`border-2 ${data['email_verified_at']!=null?'border-warning text-warning':'border-gray-900/50 text-gray-900'}`} onClick={e=>action(e, data['id'], 'false')}>
                                        <XMarkIcon className="w-5 h-5"/>
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap relative">
                                    <button onClick={e=>setOptionsAt(index)}>
                                        <EllipsisVerticalIcon className="w-6 h-6"/>
                                    </button>
                                    {
                                        optionsAt === index &&
                                        <div className={`flex shadow-xl p-4 absolute z-50 right-12 md:right-44 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`} onClick={e=>setUserID(data['id'])}>
                                            <button className="flex gap-x-2" onClick={e=>setOverlay('details')}>
                                                <UserCircleIcon className="w-6 h-6"/>
                                                Edit details
                                            </button>
                                            <button className="flex gap-x-2" onClick={e=>router.push(`/profile?id=${data['id']}&role=Individual`)}>
                                                <DocumentIcon className="w-6 h-6"/>
                                                View Profile
                                            </button>
                                            <button className="flex gap-x-2" onClick={e=>getData(
                                                (response)=>{},
                                                '/user/activate',
                                                {user:data['id']},
                                            )}>
                                                <CheckCircleIcon className="w-6 h-6"/>
                                                Activate
                                            </button>
                                            <button className="flex gap-x-2 text-warning" onClick={e=>setOverlay('delete')}>
                                                <TrashIcon className="w-6 h-6"/>
                                                Delete member
                                            </button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                {
                    [...new Array((Range[0]-data.length>0)?Range[0]-data.length:0)].map((_,index)=>{
                        return(
                            <tr key={index} className="border-b border-gray-300">
                                <td className="py-6"></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        <Overlay control={setOverlay} className={`${showOverlay?'flex items-center justify-center':'hidden'}`} >
            {overlay=='details'?<MemberDetails id={userID} control={setOverlay} />:null}
            {overlay=='delete'?<Delete id={userID} control={setOverlay} />:null}
        </Overlay>
        </div>
    )
}