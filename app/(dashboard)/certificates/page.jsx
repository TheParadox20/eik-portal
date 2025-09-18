'use client'
import { useState, useEffect } from "react"
import Head from '@/app/ui/head';
import Overlay from "@/app/ui/overlay";
import Delete from "./Delete";
import { useRouter } from "next/navigation";
import { EllipsisVerticalIcon, ArrowDownTrayIcon, CheckIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getData } from "@/app/lib/data";
import { popupE } from "@/app/lib/trigger";

export default function Page(){
    let Range = useState(20);
    let Search = useState("");
    let Genesis = useState(0);
    let [total, setTotal] = useState(0);
    let router = useRouter();
    let TH = ['Full name', 'Email', 'Year', 'Certificate No.', 'Date Requested', 'Action'];
    let Sort = useState(TH[0]);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [optionsAt, setOptionsAt] = useState(-1);
    let [userID, setUserID] = useState(null);
    
    let [data, setData] = useState([]);

    useEffect(()=>{
        getData((response)=>{
            setData(response.certs)
            setTotal(response.count)
        }, '/certificates', {search:Search[0], limit:Range[0], Genesis:Genesis[0], count:true})
    },[])
    useEffect(()=>{},[Sort[0]])
    useEffect(()=>{
        console.log('Range:',typeof(Range[0]))
        if (Range[0] > data.length) getData(setData,'/certificates', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        if (Search[0].length > 3) getData(setData,'/certificates', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        else getData(setData, '/certificates', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        console.log('Searching for ::',Search[0])
    },[Range[0],Search[0], Genesis[0]])
    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])

    let action = (e,id, action) => {
        e.preventDefault();
        popupE('ok', 'processing', 'Please wait...')
        getData((_)=>{}, '/certificate/validate', {validate:action, id:id})
        getData(setData,'/certificates', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
    }

    return(
        <div onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
        <Head Range={Range} Search={Search} Title={'Certificates'} TH={TH} Sort={Sort} placeholder={'Search certificates'}  Genesis={Genesis} total={total}>
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
                            <tr key={index} className="border-b border-gray-300">
                                <td className="px-6 py-4 whitespace-nowrap">{data['user'].name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['user'].email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['year']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['number']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data['created_at']}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className={`border-2 ${data['verified']==null?'border-primary text-primary':'border-gray-900/50 text-gray-900'} mr-4`} onClick={e=>action(e, data['id'],'true')}>
                                        <CheckIcon className="w-5 h-5"/>
                                    </button>
                                    <button className={`border-2 ${data['verified']!=null?'border-warning text-warning':'border-gray-900/50 text-gray-900'}`} onClick={e=>action(e, data['id'],'false')} >
                                        <XMarkIcon className="w-5 h-5"/>
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap relative">
                                    <button onClick={e=>setOptionsAt(index)}>
                                        <EllipsisVerticalIcon className="w-6 h-6"/>
                                    </button>
                                    {
                                        optionsAt === index &&
                                        <div className={`flex absolute p-2 shadow-lg z-50 right-12 md:right-34 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`} onClick={e=>setUserID(data['id'])}>
                                            <button className="flex gap-x-2" onClick={e=>router.push(`/download/certificate?id=${data['number']}`)}>
                                                <ArrowDownTrayIcon className="w-6 h-6"/>
                                                Download
                                            </button>
                                            <button className="flex gap-x-2 text-warning" onClick={e=>setOverlay('delete')}>
                                                <TrashIcon className="w-6 h-6"/>
                                                Delete Certificate
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
            {overlay=='delete'?<Delete id={userID} control={setOverlay} />:null}
        </Overlay>
        </div>
    )
}