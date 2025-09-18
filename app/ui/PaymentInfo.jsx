import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input";

export default function PaymentInfo({control, trigger}){
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');

    return(
        <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
        <div className="flex w-full mx-2 mb-4 justify-between items-center border-b-2 py-3">
            <span className="font-semibold">Edit payment info</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex gap-5 flex-col">
            <Input required={true} value={phone} setValue={setPhone} placeholder={'0712345678'} type={'number'} name={'Phone number'}/>
            <Input required={true} value={email} setValue={setEmail} placeholder={'janedoe@eik.co.ke'} type={'email'} name={'Email'}/>
        </div>

        <button className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto w-full items-center justify-center my-6" onClick={e=>trigger(e, phone, email)}>
            <span className="font-semibold">Pay</span>
        </button>
    </div>
    )
}