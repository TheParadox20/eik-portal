'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from "@/app/ui/Input"
import Quill from '@/app/ui/Quill'
import Pay from '@/app/ui/Pay'
import File from '@/app/ui/File'
import PaymentInfo from '@/app/ui/PaymentInfo'
import Overlay from '@/app/ui/overlay'
import { Corporate, Firms } from '@/app/lib/instructions'
import { popupE, verifyE } from '@/app/lib/trigger'
import { postData, postFile } from '@/app/lib/data'

export default function Page() {
    let router = useRouter()

    let [image, setImage] = useState([]);
    let [requirements, setRequirements] = useState([]);
    let [overlay, setOverlay] = useState('')

    let [category, setCategory] = useState('Corporate');
    let [firmName, setFirmName] = useState('');
    let [nema, setNema] = useState('');
    let [pin, setPin] = useState('');
    let [nationality, setNationality] = useState('');
    let [postal, setPostal] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [alternate, setAlternate] = useState('');
    let [note, setNote] = useState(' ');
    let [password, setPassword] = useState('');
    let [confirm, setConfirm] = useState('');
    let [practicing, setPracticing] = useState(true);

    let [instructions, setInstructions] = useState(Corporate);
    let [amount, setAmount] = useState(12500);

    useEffect(() => {
        switch (category) {
            case 'Corporate':
                setInstructions(Corporate)
                setAmount(12500)
                break;
            case 'Firms':
                setInstructions(Firms)
                setAmount(12500)
                break;
            default:
                break;
        }
    }, [category])

    let validate = () => {
        //validate all required fields
        if (pin=='' || note=='' || firmName=='' || email=='' || password==''){
            verifyE();
            popupE('error', 'Error', 'Fill all mandatory fields')
            window.scrollTo({
                top: 10,
                behavior: 'smooth'
            });
            return false;
        }
        if(password!=confirm){
            popupE('error', 'Error', 'Passwords must match')
            window.scrollTo({
                top: 10,
                behavior: 'smooth'
            });
            return false
        }
        return true;
    }

    let submit = e => {
        e.preventDefault();
        if (validate()){
            popupE('ok', 'Processing', 'Please wait...')
            postData((response)=>{
                let token = response.token;
                if (image.length>0) postFile((_)=>{},image[0],{title:'profile picture'},'/files/profile',token)
                if (requirements.length>0) {
                    requirements.forEach((file, index) => {
                        postFile((_)=>{},file,{title:'requirements'},'/files/requirements',token)
                    });
                }
                popupE('ok', 'Success', 'Account created successfully')
                router.push('/login')
            },{
                email: email,
                password: password,
                name: firmName,
                role: 'Firm',
                nema: nema,
                practicing: practicing,
                profile:{
                    category: category,
                    alternate: alternate,
                    nationality: nationality,
                    postal: postal,
                    town: town,
                    county: county,
                    kra: pin,
                    phone: phone,
                    note: note,
                }
            },'/register')
        }
    }
    
    return(
        <>
            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Profile info</h1>
            <div className='flex flex-col gap-5 mb-10'>

                <div className='h-[50%]'>
                    <h4 className='mb-4'>Upload Profile Photo</h4>
                    <div className='md:w-1/3 mx-2'>
                        <File type='image' files={image} setFiles={setImage} />
                    </div>
                </div>

                <div>
                    <h3>Select Category</h3>
                    <div className='my-4 flex flex-col md:flex-row gap-4'>
                        <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setCategory(e.target.value)}>
                            <option className='bg-white hover:bg-white' value="Firms">Firms membership</option>
                        </select>
                        <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setPracticing(e.target.value)}>
                            <option className='bg-white hover:bg-white' value={1}>Practicing</option>
                            <option className='bg-white hover:bg-white' value={0}>Non-practicing</option>
                        </select>
                    </div>
                    <div className='grid gap-x-6 gap-y-4 md:gap-y-8 md:grid-cols-2'>
                        <Input required={true} value={firmName} setValue={setFirmName} placeholder={'XYZ ltd.'} type={'text'} name={'Firm of experts'}/>
                        <Input required={true} value={email} setValue={setEmail} placeholder={'jane@gmail.com'} type={'email'} name={'Email'}/>
                        <Input value={alternate} setValue={setAlternate} placeholder={'jane@gmail.com'} type={'email'} name={'Alternate email'}/>
                        <Input value={nationality} setValue={setNationality} placeholder={'Kenya'} type={'text'} name={'Nationality'}/>
                        <Input value={postal} setValue={setPostal} placeholder={'1234-4321'} type={'text'} name={'Postal Address'}/>
                        <Input value={town} setValue={setTown} placeholder={'Town'} type={'text'} name={'Town'}/>
                        <Input value={county} setValue={setCounty} placeholder={'County'} type={'text'} name={'County'}/>
                        <Input value={nema} setValue={setNema} placeholder={'AXR/321'} type={'text'} name={'NEMA'}/>
                        <Input required={true} value={pin} setValue={setPin} placeholder={'4321'} type={'text'} name={'Firm KRA PIN'}/>
                        <Input value={phone} setValue={setPhone} placeholder={'0712345678'} type={'phone'} name={'Phone number'}/>
                        <Input required={true} value={password} setValue={setPassword} placeholder={'******'} type={'password'} name={'Password'}/>
                        <Input value={confirm} setValue={setConfirm} placeholder={'******'} type={'password'} name={'Confirm password'}/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-y-7 gap-x-7 mb-12'>
                <div className='flex-grow md:h-96'>
                    <Quill placeholder={'Bio'} value={note} setValue={setNote}/>
                </div>
                <div className='flex-grow'>
                    <p className='font-bold mb-5'>*Bio Preview</p>
                    <div 
                    className="" 
                    dangerouslySetInnerHTML={{ __html: note }} 
                    />
                </div>
            </div>
            
            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Requirements</h1>
            <div className='text-sm 2xl:text-base mx-2'>
                <p className=''>The following requirements must be satisfied for {category} Membership</p>
                {
                    instructions.map((value,index)=>{
                        return(
                            <div className='ml-4' key={index}>{`${index+1}.) `} {value}</div>
                        )
                    })
                }
            </div>
            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Upload Documents</h1>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File files={requirements} setFiles={setRequirements} type={'all'}/>
            </div>

            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Payment</h1>
            <Pay title={'Registration fee'} description={'First time registration fee'} amount={amount} email={email} phone={phone} name={`${firmName}`} />

            <div className='flex justify-between'>
                <div></div>
                <button className="bg-primary px-4 md:px-6 py-2 text-white font-semibold my-8 rounded-md hover:scale-105" onClick={e=>submit(e)}>Sign Up</button>
            </div>
            <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
                {overlay === 'payment' && <PaymentInfo control={setOverlay} amount={amount}/>}
            </Overlay>
        </>
    )
}