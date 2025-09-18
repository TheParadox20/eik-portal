'use client'
import { useState, useEffect } from "react"
import Head from '@/app/ui/head';
import Overlay from "@/app/ui/overlay";
import Edit from "./Edit";
import Delete from "./Delete";
import New from "./New";
import { UserPlusIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getData } from "@/app/lib/data";

export default function Page(){
    let Range = useState(20);
    let Search = useState("");
    let Genesis = useState(0);
    let [total, setTotal] = useState(0);
    let TH = ['Full name', 'Username', 'Email']
    let Sort = useState(TH[0]);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [optionsAt, setOptionsAt] = useState(-1);
    let [userID, setUserID] = useState();
    
    let [data, setData] = useState([]);

    useEffect(()=>{
        getData((response)=>{
            setData(response.admins)
            setTotal(response.count)
        }, '/admins', {search:Search[0], limit:Range[0], Genesis:Genesis[0], count:true})
    },[])
    useEffect(()=>{},[Sort[0]])
    useEffect(()=>{
        if (Range[0] > data.length) getData(setData, '/admins', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        if (Search[0].length > 3) getData(setData, '/admins', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        else getData(setData, '/admins', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
    },[Range[0],Search[0], Genesis[0]])
    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])

    return(
        <div onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
        <Head Range={Range} Search={Search} Title={'Admin panel'} TH={TH} Sort={Sort} placeholder={'Search registerd admins'} total={total} Genesis={Genesis}>
            <span className="min-w-[2px] hidden md:block min-h-6 h-max bg-tertiary mx-4"></span>
            <button className="bg-secondary text-white flex md:w-fit px-4 py-2 rounded-lg mx-auto w-2/3 items-center justify-center text-base lg:text-xs 2xl:text-base" onClick={e=>setOverlay('new')}>
                <UserPlusIcon className="w-6 h-6 lg:w-4 lg:h-4 2xl:w-6 2xl:h-6 mr-2"/>
                <span className="font-semibold">New Admin</span>
            </button>
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
                                {
                                    <>
                                    <td className="px-6 py-4 whitespace-nowrap">{data['name']}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data['username']}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data['email']}</td>
                                    </>
                                }
                                <td onClick={e=>setUserID(data['id'])} className="px-6 py-4 whitespace-nowrap relative">
                                    <button onClick={e=>setOptionsAt(index)}>
                                        <EllipsisVerticalIcon className="w-6 h-6"/>
                                    </button>
                                    {
                                        optionsAt === index &&
                                        <div className={`flex shadow-xl p-4 absolute z-50 right-12 md:right-44 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`}>
                                            <button className="flex gap-x-2" onClick={e=>setOverlay('edit')}>
                                                <PencilSquareIcon className="w-6 h-6"/>
                                                Edit details
                                            </button>
                                            <button className="flex gap-x-2 text-warning" onClick={e=>setOverlay('delete')}>
                                                <TrashIcon className="w-6 h-6"/>
                                                Delete admin
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
            {overlay === 'edit' && <Edit control={setOverlay} id={userID} />}
            {overlay === 'delete' && <Delete control={setOverlay} id={userID} />}
            {overlay === 'new' && <New control={setOverlay} id={userID} />}
        </Overlay>
        </div>
    )
}