import { useEffect, useState } from 'react';
// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Processing from '@/app/ui/Processing';
import PaymentInfo from '@/app/ui/PaymentInfo'
import Overlay from '@/app/ui/overlay';
import { popupE } from '@/app/lib/trigger';
import { postData, getData } from '@/app/lib/data';
import Input from '@/app/ui/Input';

export function FlutterWave({tite, description, amount, email, phone, name}){
    const config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTER_PUBLIC,
        tx_ref: Date.now(),
        amount: amount,
        currency: 'KES',
        payment_options: 'card,mpesa',
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        customizations: {
            title: tite,
            description: description,
            logo: '/transparent-logo.svg',
        },
    };
    // const handleFlutterPayment = useFlutterwave(config);

    return(
        <div>
            {/* <button
                className='font-semibold leading-6 text-white bg-secondary w-fit text-center mr-4 py-2 px-6 rounded-md md:text-xl'
                onClick={e => {
                    handleFlutterPayment({
                        callback: (response) => {
                            console.log(response);
                            closePaymentModal() // this will close the modal programmatically
                        },
                        onClose: () => {
                            alert('Payment closed');
                        },
                    });
                }}
            >
                Pay
            </button> */}
        </div>
    )
}

export default function Pay({title, description, amount, email, phone, name}){
    let [paymentMethod, setPaymentMethod] = useState('mpesa');
    let [overlay, setOverlay] = useState('')
    let [callback, setCallback] = useState(null)
    let [inputPhone, setInputPhone] = useState(phone)
    let [inputEmail, setInputEmail] = useState(email)
    let [inputName, setInputName] = useState(name)

    useEffect(()=>{
        setInputPhone(phone);
        setInputEmail(email);
    },[phone,email])

    let stk = (e)=>{
        e.preventDefault();
        popupE('ok', 'Processing', 'Please wait...')
        postData((response)=>{
            if(response.ResponseCode=="0"){
                setCallback({CheckoutRequestID: response.CheckoutRequestID})
                setOverlay('processing')
            } else popupE('error', 'Error', response.ResponseDescription)
        },{phone:inputPhone, amount, email:inputEmail,AccountReference:title},'/pay/mpesa')
    }

    return (
        <div className='mx-2'>
            <div className='flex gap-6 mb-2'>
                <button className='flex items-center font-semibold' onClick={e=>setPaymentMethod('mpesa')}>
                    {/* <div className={`rounded-full md:w-5 md:h-5 w-7 h-4 ${paymentMethod=='mpesa'?'bg-primary':'border-2'}`}></div> */}
                    <img className='' src="/icons/saf-mpesa.png" alt="" />
                </button>
                {/* <button className='flex items-center font-semibold' onClick={e=>setPaymentMethod('airtel')}>
                    <div className={`rounded-full md:w-5 md:h-5 w-7 h-4 ${paymentMethod=='airtel'?'bg-primary':'border-2'}`}></div>
                    <img className='w-8 mx-2 block' src="/icons/airtel.svg" alt="" />
                    Airtel
                </button>
                <button className='flex items-center font-semibold' onClick={e=>setPaymentMethod('visa')}>
                    <div className={`rounded-full md:w-5 md:h-5 w-7 h-4 ${paymentMethod=='visa'?'bg-primary':'border-2'}`}></div>
                    <img className='w-10 mx-2 block' src="/icons/visa.svg" alt="" />
                    Card
                </button> */}
            </div>
            <p className='my-4 font-bold text-lg'>Pay via M-Pesa Xpress</p>
            <ol className='list-decimal m-4'>
                <li className='mb-2'>Confirm phone & email address. Edit incase you wish to use a different phone number/email adddress. </li>
                <li className='mb-2'>Click {"\'"}Initiate Payment{"\'"}.</li>
                <li className='mb-2'>You will receive a prompt asking you to pay KES {amount} to EIK.</li>
                <li className='mb-2'>Enter M-Pesa PIN to confirm.</li>
            </ol>
            <div className='flex flex-col m-5 gap-5'>
                {
                    paymentMethod!='visa'?
                    <Input required={true} value={inputPhone} setValue={setInputPhone} placeholder={'0712345678'} type={'phone'} name={'Phone number'}/>
                    :
                    <Input required={true} value={inputName} setValue={setInputName} placeholder={'Jane'} type={'text'} name={'First name'}/>
                }
                <Input disabled={true} value={amount} setValue={(_)=>{}} placeholder={amount} type={'number'} name={'Amount'}/>
                <Input required={false} value={inputEmail} setValue={setInputEmail} placeholder={'jane@gmail.com'} type={'email'} name={'Receipt to:'}/>
            </div>
            <div className='flex mt-4 gap-5'>
                {
                    paymentMethod=='mpesa'?
                    <button onClick={e=>stk(e,phone,email)} className='font-semibold leading-6 text-white bg-secondary w-fit text-center mr-4 py-2 px-6 rounded-md md:text-lg hover:scale-105'>Initiate Payment</button>
                    :
                    <FlutterWave title={title} description={description} amount={amount} email={email} phone={phone} name={name} />
                }
            </div>
            <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
                {overlay === 'payment' && <PaymentInfo control={setOverlay} amount={amount} trigger={stk}/>}
                {overlay === 'processing' && <Processing control={setOverlay} callback={callback} phone={phone} email={email} amount={amount} trigger={stk}/>}
            </Overlay>
        </div>
    )
}