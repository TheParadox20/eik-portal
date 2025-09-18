import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/ui/Input";
import { popupE } from "@/app/lib/trigger";

export default function Reset({token}){
    let [password, setPassword] = useState('');
    let [confirm, setConfirm] = useState('');
    let router = useRouter();

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recover/${token}`).then(res => res.json()).then(data => {
            console.log(data)
            if(data.success) popupE('ok', 'Success', data.success)
            if(data.error){
                popupE('error', 'Error', data.error)
            }
        }).catch(err => popupE('error', 'Error', "Server error"))
    },[])
    
    let reset = e => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recover`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token:token,
                password:password
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if(data.success) {
                popupE('ok', 'Success', data.success)
                router.push('/login');
            }
            if(data.error){
                popupE('error', 'Error', data.error)
            }
        }).catch(err => popupE('error', 'Error', "Server error"))
    }
    return(
        <div>
            <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <img className="mx-auto h-24 w-auto" src="/transparent-logo.svg" alt="Your Company"/>
                </div>
    
                <div className="mt-10 sm:mx-auto w-full max-w-sm">
                <form className="space-y-10">
                    <Input value={password} setValue={setPassword} placeholder={'Password'} type={'password'} name={'Password'}/>
                    <Input value={confirm} setValue={setConfirm} placeholder={'Confirm Password'} type={'password'} name={'Confirm Password'}/>
                    <div>
                    <button
                        onClick={e=>reset(e)}
                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Reset
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}