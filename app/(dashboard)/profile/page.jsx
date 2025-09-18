'use client'
import { useSearchParams } from "next/navigation";
import useUser from "@/app/lib/hooks/useUser";
import Spinner from "@/app/ui/Spinner";
import Individual from "./Individual";
import Firm from "./Firm";

export default function Page(){
    const { user, isLoading, isError } = useUser()
    let params = useSearchParams();
    let id = params.get('id');
    let role = params.get('role');

    if (isLoading) return <Spinner />
    if (isError) return <>contact admin at <a href="mailto:developers@eik.co.ke">developers@eik.co.ke</a></>

    console.log('### ',user)

    return(
        <>
        {(user.role=='Individual' || role=='Individual') &&<Individual id={id} role={role}/>}
        {(user.role=='Firm' || role=='Firm') && <Firm id={id} role={role}/>}
        </>
    )
}