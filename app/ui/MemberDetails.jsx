'use client'
import { useState, useEffect } from "react"
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Input from "./Input";
import { getData, postData } from "@/app/lib/data";

export default function MemberDetails({control,id}){
    let [data, setData] = useState();

    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [category, setCategory] = useState('');
    let [practicing, setPracticing] = useState('');
    let [nema, setNema] = useState('');
    let [certificate, setCertificate] = useState('');
    let [firm, setFirm] = useState('');
    let [nationality, setNationality] = useState('');
    let [nationalID, setNationalID] = useState('');
    let [postal, setPostal] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [alternative, setAlternative] = useState('');
    let [photo, setPhoto] = useState();

    useEffect(()=>{
       getData(setData, '/admin/member', {id})
    },[])

    useEffect(()=>{
        if(data){
            setFullName(data['member']['name']);
            setEmail(data['member']['email']);
            setNema(data['member']['nema']);
            setPracticing(data['member']['practicing']);
            setPhoto(data['photo']);
            if (data['certificates']) setCertificate(data['certificates']['number']);
            if (data['individual']){
                setCategory(data['individual']['category']);
                setFirm(data['individual']['firm']);
                setNationality(data['individual']['nationality']);
                setNationalID(data['individual']['nationalID']);
                setPostal(data['individual']['postal']);
                setTown(data['individual']['town']);
                setCounty(data['individual']['county']);
                setPhone(data['individual']['phone']);
                setAlternative(data['individual']['alternate']);
            }
        }
    },[data])

    let submit = e=>{
        e.preventDefault();
        let data = {
            id,
            fullName,
            email,
            nema,
            practicing,
            individual: {
                category,
                firm,
                nationalID,
                nationality,
                postal,
                town,
                county,
                phone,
                alternate: alternative
            },
            certificates: {
                number: certificate
            },
        }
        console.log('Sending :: ',data)
        postData((_)=>{},data, '/admin/members')
    }

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Member Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col justify-center gap-y-8 gap-x-10 md:flex-row">
            <div className="w-32 md:w-64 h-fit relative">
           {
            <img src={photo ?? "/profile.svg"} className="w-24 h-24 2xl:w-48 2xl:h-48 rounded-lg" alt="" />
           }
            <div className="bg-secondary p-1 rounded-md w-fit absolute -right-2 -bottom-2">
                <PencilSquareIcon className="w-6 h-6 text-white"/>
            </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
                <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" value={category} onChange={e=>setCategory(e.target.value)}>
                    <option className='bg-white hover:bg-white' value="Student">Student membership</option>
                    <option className='bg-white hover:bg-white' value="Fellow">Fellow membership</option>
                    <option className='bg-white hover:bg-white' value="Lead">Lead membership</option>
                    <option className='bg-white hover:bg-white' value="Associate">Associate membership</option>
                    <option className='bg-white hover:bg-white' value="Honorary">Honorary membership</option>
                    <option className='bg-white hover:bg-white' value="Affiliate">Affiliate membership</option>
                    <option className='bg-white hover:bg-white' value="Firm">Firm membership</option>
                </select>
                <select className="bg-white border-[2px] rounded-lg p-2" value={practicing} name="" id="" onChange={e=>setPracticing(e.target.value)}>
                    <option className='bg-white hover:bg-white' value={0}>Non-practicing</option>
                    <option className='bg-white hover:bg-white' value={1}>Practicing</option>
                </select>
                <Input value={fullName} setValue={setFullName} placeholder={''} type={'text'} name={'Full name'}/>
                <Input value={nema} setValue={setNema} placeholder={''} type={'text'} name={'NEMA Registration Number'}/>
                <Input value={certificate} setValue={setCertificate} placeholder={''} type={'text'} name={'Certificate Number'}/>
                <Input value={firm} setValue={setFirm} placeholder={''} type={'text'} name={'Firm of Experts'}/>
                <Input value={nationality} setValue={setNationality} placeholder={''} type={'text'} name={'Nationality'}/>
                <Input value={nationalID} setValue={setNationalID} placeholder={''} type={'text'} name={'Identification Number'}/>
                <Input value={postal} setValue={setPostal} placeholder={''} type={'text'} name={'Postal Address'}/>
                <Input value={town} setValue={setTown} placeholder={''} type={'text'} name={'Town'}/>
                <Input value={county} setValue={setCounty} placeholder={''} type={'text'} name={'County'}/>
                <Input value={phone} setValue={setPhone} placeholder={''} type={'text'} name={'Phone Number'}/>
                <Input value={email} setValue={setEmail} placeholder={''} type={'email'} name={'Email Address'}/>
                <Input value={alternative} setValue={setAlternative} placeholder={''} type={'text'} name={'Alternative Email Address'}/>
            </div>
        </div>

        <div className="flex md:w-1/2 md:float-right mt-4 md:mt-12 justify-between gap-4 my-4 text-sm">
            <button className={`py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white`} onClick={e=>submit(e)}>Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}