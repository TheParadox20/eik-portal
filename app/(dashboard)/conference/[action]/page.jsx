'use client'

import { useState, useRef, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation";
import useSWR from 'swr';
import { fetcher } from '@/app/lib/data';
import Spinner from '@/app/ui/Spinner';
import { postData, postFile } from "@/app/lib/data";
import Overlay from "@/app/ui/overlay";
import File from "@/app/ui/File";

function Roles({conference}){
    const [files, setFiles] = useState([]);
    const [active, setActive] = useState(0);

    const { data, error, isLoading } = useSWR([`/conference/roles/${conference?.id}`,{}], fetcher)

    const change = (e,next)=>{
        e.preventDefault();
        if(next){
            //next
            setActive(data?.data?.length-1==active?0:active+1)
        } else{
            //back
            setActive(active==0?0:active-1)
        }
    }

    const submit = (e)=>{
        e.preventDefault();
        postFile(
            (response)=>{
                if(response.success){
                    change(e,true);
                }
            },
            files[0],
            {},
            `/conference/roles/update/${data?.data?.[active]?.id}`
        )
    }

    if (isLoading) return <Spinner/>
    if (error) return <p className="bg-white p-5">Error when fetching conference {conference?.name} roles</p>

    return(
        <div className="bg-white p-5 min-w-[33vw] max-w-[40vw] rounded-lg">
            <h5 className="text-lg text-center font-semibold my-5">Certificate Templates for {conference?.Name}</h5>

            <h6 className="text-sm font-semibold mb-4">{data?.data?.[active]?.Name}</h6>

            <File files={files} setFiles={setFiles} type={'image'}/>

            <div className="flex justify-between items-center mt-7">
                <button className="" onClick={e=>submit(e)}>Submit</button>

                <div className="flex items-center gap-5">
                    <button onClick={e=>change(e,false)} className="">Back</button>
                    <button onClick={e=>change(e,true)}  className="">Next</button>
                </div>
            </div>
        </div>
    )
}

export default function CreateConferencePage(){
    const {action} = useParams();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [roles, setRoles] = useState([]);
    const [overlay, setOverlay] = useState('');

    let conferenceRef = useRef({});

    const { data:conference, error, isLoading } = useSWR([`/conference/${id}`,{}], fetcher,{
        errorRetryInterval:600000000
    })

    useEffect(()=>{
        console.log(conference)
        if(conference && conference?.success){
            setName(conference?.data?.Name);
            setStart(conference?.data?.StartDate);
            setEnd(conference?.data?.EndDate);
            const r = conference?.data?.roles?.map((rol)=>rol?.Name)
            setRoles(r)
        }
    },[conference])

    if (isLoading) return <Spinner/>

    const submit = (e)=>{
        e.preventDefault();
        postData(
            (response)=>{
                if(response.success)
                postData(
                    (r)=>{
                        if(r.success){
                            conferenceRef.current = response?.data
                            setOverlay('roles')
                        }
                    },
                    {roles},
                    `/conference/roles/${response?.data?.id}`
                )
            },
            {name,role,start,end},
            `${conference?.success?`/conference/update/${conference?.data?.id}`:'/conference'}`
        )
    }

    return(
        <main>
            <h2 className="mb-2 capitalize text-lg font-semibold">{action} Conference</h2>
            <input 
              type="text" name="" id="" 
              className="block py-2 px-4 rounded-lg border-2 my-3"
              placeholder="Conference Name"
              value={name}
              onChange={e=>setName(e.target.value)}
            />

            <div className="space-x-2 flex flex-wrap">
                {
                    roles.map((role,i)=>(
                        <button
                          key={i}
                          className="bg-secondary text-white text-xs flex items-center justify-center gap-1 p-2 rounded-xl"
                          onClick={e=>{
                            let r = roles.filter((rol)=>rol!=role)
                            setRoles(r)
                          }}
                        >
                            {role}
                            <span className="icon-[ion--close-outline] w-2 h-2"/>
                        </button>
                    ))
                }
            </div>

            <div className="flex gap-4 my-7">
                <input 
                  type="text" name="" id="" 
                  className="block py-2 px-4 rounded-lg border-2"
                  placeholder="Role"
                  value={role}
                  onChange={e=>setRole(e.target.value)}
                />
                <button 
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:scale-105"
                  onClick={e=>{
                      setRoles([...roles,role])
                      setRole('')
                  }}
                >
                    Add Role
                </button>
            </div>

            <div className="flex my-4 gap-2">
                <div>
                    <label 
                      htmlFor="start_date"
                      className="text-sm block font-semibold"
                    >
                        Start Date
                    </label>
                    <input 
                      type="date" name="start_date" id=""
                      className="px-4 py-2 rounded-md border-2"
                      value={start}
                      onChange={e=>setStart(e.target.value)}
                    />
                </div>
                <div>
                    <label 
                      htmlFor="start_date"
                      className="text-sm block font-semibold"
                    >
                        End Date
                    </label>
                    <input 
                      type="date" name="start_date" id=""
                      className="px-4 py-2 rounded-md border-2"
                      value={end}
                      onChange={e=>setEnd(e.target.value)}
                    />
                </div>
            </div>

            <button 
              className="bg-secondary text-white px-5 py-2 hover:bg-primary hover:font-semibold text-sm"
              onClick={e=>submit(e)}
            >
                Submit
            </button>

            <Overlay control={setOverlay} className={`${overlay==''?'hidden':'flex items-center justify-center'}`}>
                {
                    overlay=='roles' && <Roles conference={conferenceRef.current}/>
                }
            </Overlay>
        </main>
        // create conference: name, roles
    )
}