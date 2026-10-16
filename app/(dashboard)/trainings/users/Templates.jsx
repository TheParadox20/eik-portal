'use client'
import { useState, useEffect } from "react"
import useSWR from 'swr';
import { XMarkIcon } from "@heroicons/react/24/outline"
import Spinner from '@/app/ui/Spinner';
import File from "@/app/ui/File";
import { fetcher, postData, postFile, putData } from "@/app/lib/data";
import { popupE } from "@/app/lib/trigger";

const defaultStyles = {
    name: {
        color: '#1083ac',
        fontFamily: 'DancingScript',
        fontSize: '60px',
        position: 'absolute',
        top: '280px',
    },
    number: {
        fontSize: '20px',
        lineHeight: '28px',
        position: 'absolute',
        bottom: '30px',
        left: '150px',
    },
    info: {
        width: '75%',
        textAlign: 'center',
        position: 'absolute',
        top: '420px',
        left: '120px',
    },
    date: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: '105px',
        fontSize: '18px',
        lineHeight: '28px',
    },
    qrData: {
        position: 'absolute',
        bottom: '80px',
        right: '96px',
    },
};

/**
 * Certificate template per training role.
 * Attendees whose role has no template get the training's default certificate.
 */
export default function Templates({control, training}){
    const [files, setFiles] = useState([]);
    const [active, setActive] = useState(0);
    const [className, setClassName] = useState(defaultStyles);

    const { data: roles, error, isLoading, mutate } = useSWR([`/training/roles/${training}`,{}], fetcher)
    const role = roles?.data?.[active];
    const { data: view } = useSWR(role?.certificate_view_id ? [`/certificate-views/${role.certificate_view_id}`,{}] : null, fetcher)

    useEffect(()=>{
        setFiles([]);
        if (!view || !role?.certificate_view_id) {
            setClassName(defaultStyles);
            return
        }
        const parsed = {};
        for (const key of Object.keys(defaultStyles)) {
            try {
                parsed[key] = typeof view[key] === 'string' ? JSON.parse(view[key]) : view[key];
            } catch {
                parsed[key] = defaultStyles[key];
            }
            if (!parsed[key] || typeof parsed[key] !== 'object') parsed[key] = defaultStyles[key];
        }
        setClassName(parsed);
    },[view, active, role?.certificate_view_id])

    const change = (e,next)=>{
        e.preventDefault();
        const last = roles?.data?.length-1;
        if(next) setActive(active==last?0:active+1)
        else setActive(active==0?last:active-1)
    }

    const submit = (e)=>{
        e.preventDefault();
        const payload = Object.keys(className).reduce((acc, key) => {
            acc[key] = typeof className[key] === 'object' ? JSON.stringify(className[key]) : className[key];
            return acc;
        }, {});

        if (role?.certificate_view_id && files.length === 0) {
            // Update the role's existing template, keeping its background
            putData(
                (_)=>popupE('ok','Success',`Certificate updated for ${role.Name}`),
                payload,
                `/certificate-views/${role.certificate_view_id}`
            );
            return
        }
        if (files.length === 0) {
            popupE('error','Error','Upload a background image for this role')
            return
        }
        postFile(
            (response)=>{
                if(response?.success && response?.data?.id){
                    postData(
                        (r)=>{
                            if(r.success){
                                popupE('ok','Success',`Certificate saved for ${role.Name}`)
                                mutate();
                            }
                        },
                        { certificate_view_id: response.data.id },
                        `/training/roles/update/${role.id}`
                    )
                }
            },
            files[0],
            payload,
            `/certificate-views`
        )
    }

    if (isLoading) return <Spinner/>
    if (error) return <p className="bg-white p-5">Error when fetching training roles</p>

    return(
        <div className="bg-white p-5 min-w-[33vw] max-w-[60vw] max-h-[80vh] overflow-y-auto large-scroll rounded-lg">
            <div className="flex w-full mb-4 justify-between items-center border-b-2 py-3">
                <span className="font-semibold">Role Certificates</span>
                <XMarkIcon className="w-8 h-8 cursor-pointer" onClick={e=>control('')} />
            </div>

            {
                !roles?.data?.length ?
                <p className="text-sm my-6">This training has no roles yet. Use <span className="font-semibold">Add role</span> first.</p>
                :
                <>
                <h6 className="text-sm font-semibold mb-1">Role: {role?.Name} <span className="text-gray-500 font-normal">({active+1}/{roles.data.length})</span></h6>
                <p className="text-xs text-gray-500 mb-4">
                    {role?.certificate_view_id ? 'Has its own certificate. Upload a new background to replace it.' : 'Uses the training certificate. Upload a background to give this role its own.'}
                </p>

                <div className="mb-5 bg-gray-50 p-4 rounded-md border">
                    <h6 className="font-semibold mb-3 text-xs text-gray-600">Certificate Properties</h6>
                    {Object.keys(className).map((fieldKey) => (
                        <div key={fieldKey} className="mb-4">
                            <div className="font-bold text-sm mb-2 capitalize">{fieldKey}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {Object.keys(className[fieldKey]).map((propKey) => (
                                    <div key={propKey} className="flex items-center gap-2">
                                        <label className="text-xs w-28 capitalize" htmlFor={`input-${fieldKey}-${propKey}`}>{propKey}</label>
                                        <input
                                            id={`input-${fieldKey}-${propKey}`}
                                            type="text"
                                            className="border px-2 py-1 rounded text-xs flex-1"
                                            value={className[fieldKey][propKey] ?? ""}
                                            onChange={e => {
                                                setClassName(prev => ({
                                                    ...prev,
                                                    [fieldKey]: {
                                                        ...prev[fieldKey],
                                                        [propKey]: e.target.value
                                                    }
                                                }));
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <File files={files} setFiles={setFiles} type={'image'}/>

                <div className="flex justify-between items-center mt-7">
                    <button className="bg-secondary text-white px-4 py-2 rounded-md" onClick={e=>submit(e)}>Save</button>

                    <div className="flex items-center gap-5">
                        <button onClick={e=>change(e,false)}>Back</button>
                        <button onClick={e=>change(e,true)}>Next</button>
                    </div>
                </div>
                </>
            }
        </div>
    )
}
