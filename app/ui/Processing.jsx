import { getData } from "@/app/lib/data"
import { popupE } from "@/app/lib/trigger"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Processing({control,callback,trigger, phone, email}) {
    let check = (e)=>{
        e.preventDefault();
        getData((response)=>{
            if (response.ResponseCode){
                if (response.ResultCode=='0'){
                    popupE('ok', 'Success', 'Payment was successful')
                }
            } else {
                popupE('error', 'Error', response.ResponseDescription)
            }
        },'/mpesa/callback',{CheckoutRequestID: callback.CheckoutRequestID,phone,email})
    }
    return (
        <div className='flex flex-col items-center justify-center bg-white p-4 rounded-md'>
            <div className="flex w-full mx-2 mb-4 justify-between items-right">
                <div></div>
                <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
            </div>
            <div className=''>
                <div className='flex items-center gap-2 bg-primary/40 p-4 rounded-lg'>
                    <img src="/icons/loading.svg" className='w-8 h-8' alt="" />
                    <p>Check phone and enter MPESA PIN then click complete button below</p>
                </div>
                <p className='my-10 text-center'>Click complete button once you receive MPESA confirmation</p>
                <div className='flex gap-4 text-lg my-6'>
                    <button className='bg-primary text-white px-4 py-1 rounded-md hover:scale-105' onClick={e=>check(e)}>Complete</button>
                    <button className='bg-secondary text-white px-4 py-1  hover:scale-105' onClick={e=>trigger(e,phone,email)}>Retry payment</button>
                </div>
                <p className=" text-secondary text-right hover:cursor-pointer">Having issues with MPESA Express? Click here to use Paybill</p>
            </div>
        </div>
    )
}