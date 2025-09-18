'use client'
import Dashboard from "./Dashboard";
import Home from './Home';
import useUser from "@/app/lib/hooks/useUser";

export default function Page(){
    const { user, isLoading, isError } = useUser()
    if (isLoading) return <></>
    if (isError) return <></>
    console.log('### ',user)
    return(
        <>
        {user.role=='Admin'?<Dashboard/>:<Home/>}
        </>
    )
}