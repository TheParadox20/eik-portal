'use client'
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    let params = useSearchParams();
    let id = params.get('id');
    let [data, setData] = useState({
        name: '',
        member: '',
        date:''
    });

    useEffect(()=>{
        setData({
            id: id,
            name: 'frida nyiva mutui',
            member: 'EIK/1/4247',
            date:'08/04/2024'
        })
    },[])

    return (
    <Suspense>
        <div>
            <h1>Download Receipt</h1>
            <p>Download your receipt here. ID = {id}</p>
        </div>
    </Suspense>
    );
}