'use client'

import { useState, useContext } from 'react'
import Link from 'next/link';
import Input from "@/app/ui/Input"
import { SignupContext } from "@/app/lib/SignupProvider";

export function Individual(){
    let {Name, Last, Username, Email, Nema, Nationality, Postal, Town, County, Phone, Alternate, Password, Confirm} = useContext(SignupContext);

    let [name, setName] = Name;
    let [last, setLast] = Last;
    let [username, setUsername] = Username;
    let [email, setEmail] = Email;
    let [nema, setNema] = Nema;
    let [nationality, setNationality] = Nationality;
    let [postal, setPostal] = Postal;
    let [town, setTown] = Town;
    let [county, setCounty] = County;
    let [phone, setPhone] = Phone;
    let [alternate, setAlternate] = Alternate;
    let [password, setPassword] = Password;
    let [confirm, setConfirm] = Confirm;

    return(
        <form action="">
            <div className='grid gap-6 md:gap-y-8 md:grid-cols-3'>
                <Input required={true} value={name} setValue={setName} placeholder={'Jane'} type={'text'} name={'First name'}/>
                <Input required={true} value={last} setValue={setLast} placeholder={'Doe'} type={'text'} name={'Last name'}/>
                <Input required={true} value={username} setValue={setUsername} placeholder={'Username'} type={'username'} name={'username'}/>
                <Input required={true} value={email} setValue={setEmail} placeholder={'jane@gmail.com'} type={'email'} name={'Email'}/>
                <Input value={alternate} setValue={setAlternate} placeholder={'jane@gmail.com'} type={'email'} name={'Alternate email'}/>
                <Input value={nationality} setValue={setNationality} placeholder={'Kenya'} type={'text'} name={'Nationality'}/>
                <Input value={postal} setValue={setPostal} placeholder={'1234-4321'} type={'text'} name={'Postal Address'}/>
                <Input value={town} setValue={setTown} placeholder={'Town'} type={'text'} name={'Town'}/>
                <Input value={county} setValue={setCounty} placeholder={'County'} type={'text'} name={'County'}/>
                <Input value={nema} setValue={setNema} placeholder={'AXR/321'} type={'text'} name={'NEMA'}/>
                <Input value={phone} setValue={setPhone} placeholder={'0712345678'} type={'phone'} name={'Phone number'}/>
            </div>
            <div className='flex flex-col gap-x-6 gap-y-4 md:gap-y-8 md:flex-row mt-4 md:mt-8'>
                <Input required={true} value={password} setValue={setPassword} placeholder={'******'} type={'password'} name={'Password'}/>
                <Input value={confirm} setValue={setConfirm} placeholder={'******'} type={'password'} name={'Confirm password'}/>
            </div>
        </form>
    )
}

export function Firm(){
    let {FirmName, Pin, Email, Nema, Nationality, Postal, Town, County, Phone, Alternate, Password, Confirm} = useContext(SignupContext);

    let [firmName, setFirmName] = FirmName;
    let [nema, setNema] = Nema;
    let [pin, setPin] = Pin;
    let [nationality, setNationality] = Nationality;
    let [postal, setPostal] = Postal;
    let [town, setTown] = Town;
    let [county, setCounty] = County;
    let [phone, setPhone] = Phone;
    let [email, setEmail] = Email;
    let [alternate, setAlternate] = Alternate;
    let [password, setPassword] = Password;
    let [confirm, setConfirm] = Confirm;

    return(
        <form action="" className='grid gap-x-6 gap-y-4 md:gap-y-8 md:grid-cols-2'>
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
        </form>
    )
}

export default function ProfilePage(){
    let {Type} = useContext(SignupContext);

    return(
        <div className='min-h-[60vh] p-10'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Applicant Details</h3>
            {
                Type[0]==='individual'?
                <Individual/>
                :
                <Firm/>
            }
            <div className="flex justify-between mt-8">
                <Link href={'/register'} className='flex items-center gap-1'>
                    <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                    Previous
                </Link>
                <Link href={'/register/bio'} className='flex items-center gap-2 bg-primary text-white hover:bg-secondary px-10 py-2 rounded-md hover:font-semibold'>
                    Next
                    <span className='icon-[tabler--player-track-next-filled] w-5 h-5'/>
                </Link>
            </div>
        </div>
    )
}