import { useState, useEffect } from "react"
import Image from "next/image";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Input from "./Input";
import { getData, postData } from "@/app/lib/data";

export default function FirmDetails({control, id}){
    let [data, setData] = useState();
    let [email, setEmail] = useState('');
    let [nema, setNema] = useState('');
    let [certificate, setCertificate] = useState('');
    let [firm, setFirm] = useState('');
    let [pin, setPin] = useState('');
    let [postal, setPostal] = useState('');
    let [nationality, setNationality] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [alternative, setAlternative] = useState('');
    let [photo, setPhoto] = useState();
    let [practicing, setPracticing] = useState('');

    useEffect(()=>{
        getData(setData, '/admin/firm', {id})
     },[])
 
     useEffect(()=>{
         if(data){
             setFirm(data['member']['name']);
             setEmail(data['member']['email']);
             setNema(data['member']['nema']);
             setPracticing(data['member']['practicing']);
             setPhoto(data['photo']);
             if (data['certificates']) setCertificate(data['certificates']['number']);
             if (data['firm']){
                 setPostal(data['firm']['postal']);
                 setTown(data['firm']['town']);
                 setCounty(data['firm']['county']);
                 setPhone(data['firm']['phone']);
                 setAlternative(data['firm']['alternate']);
                 setPin(data['firm']['kra']);
             }
         }
     },[data])

    let submit = e=>{
        e.preventDefault();
        let data = {
            id,
            fullName:firm,
            email,
            nema,
            practicing,
            firm: {
                nationality,
                kra:pin,
                postal,
                town,
                county,
                phone,
                alternate: alternative
            },
        }
        console.log('Sending :: ',data)
        postData((_)=>{},data, '/admin/members')
    }

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Firm Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col justify-center gap-y-8 gap-x-10 md:flex-row">
            <div className="w-32 md:w-64 h-fit relative">
                {
                    <img src={photo ?? "/profile.svg"} className="w-24 h-24 2xl:w-48 2xl:h-48 rounded-lg" alt="" />
                }
                <div className="bg-secondary w-fit absolute -right-2 -bottom-2">
                    <PencilSquareIcon className="w-6 h-6 text-white"/>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
                <select className="bg-white border-[2px] rounded-lg p-2" name="" id="">
                    <option className='bg-white hover:bg-white' value="Firm">Firm membership</option>
                </select>
                <select className="bg-white border-[2px] rounded-lg p-2" value={practicing} name="" id="" onChange={e=>setPracticing(e.target.value)}>
                    <option className='bg-white hover:bg-white' value={0}>Non-practicing</option>
                    <option className='bg-white hover:bg-white' value={1}>Practicing</option>
                </select>
                <Input value={firm} setValue={setFirm} placeholder={'Firm name'} type={'text'} name={'Firm'}/>
                <Input value={nema} setValue={setNema} placeholder={'AXKL000'} type={'text'} name={'NEMA'}/>
                <Input value={certificate} setValue={setCertificate} placeholder={''} type={'text'} name={'Certificate'}/>
                <Input value={pin} setValue={setPin} placeholder={''} type={'text'} name={'KRA pin'}/>
                <Input value={nationality} setValue={setNationality} placeholder={'Kenya'} type={'text'} name={'Nationality'}/>
                <Input value={postal} setValue={setPostal} placeholder={''} type={'text'} name={'Postal Address'}/>
                <Input value={town} setValue={setTown} placeholder={'Nairobi'} type={'text'} name={'Town'}/>
                <Input value={county} setValue={setCounty} placeholder={''} type={'text'} name={'County'}/>
                <Input value={phone} setValue={setPhone} placeholder={''} type={'tel'} name={'Phone'}/>
                <Input value={email} setValue={setEmail} placeholder={''} type={'email'} name={'Email'}/>
                <Input value={alternative} setValue={setAlternative} placeholder={''} type={'email'} name={'Alternative email'}/>
            </div>
        </div>

        <div className="flex md:w-1/2 md:float-right mt-4 md:mt-12 justify-between gap-4 my-4 text-sm">
            <button className={`py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white`} onClick={e=>submit(e)}>Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}