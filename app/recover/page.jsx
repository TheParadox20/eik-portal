'use client'
import { useSearchParams } from "next/navigation";
import Reset from "./Reset";
import Request from "./Request";

export default function Page(){
    let params = useSearchParams();
    let token = params.get('token');

    return(
        token==null?<Request/>:<Reset token={token}/>
    )
}