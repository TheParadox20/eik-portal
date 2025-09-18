'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from "@/app/ui/Input"
import { Institutions, Organizations } from '@/app/ui/Input'
import Pay from '@/app/ui/Pay'
import File from '@/app/ui/File'
import Quill from '@/app/ui/Quill'
import { Student, Affiliate, Honorary, Associate, Lead, Fellow } from '@/app/lib/instructions'
import { popupE, verifyE } from '@/app/lib/trigger'
import { postData, postFile } from '@/app/lib/data'

export default function Page() {
    let router = useRouter()

    let [image, setImage] = useState([]);
    let [requirements, setRequirements] = useState([]);

    let [category, setCategory] = useState('Student');
    let [name, setName] = useState('');
    let [last, setLast] = useState('');
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [nema, setNema] = useState('');
    let [pin, setPin] = useState('');
    let [nationality, setNationality] = useState('');
    let [ID, setID] = useState('');
    let [postal, setPostal] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [alternate, setAlternate] = useState('');
    let [note, setNote] = useState(' ');
    let [password, setPassword] = useState('');
    let [confirm, setConfirm] = useState('');
    let [practicing, setPracticing] = useState(false);

    let [institutions, setInstitutions] = useState([{}]);
    let [organizations, setOrganizations] = useState([{}]);

    let [instructions, setInstructions] = useState(Student);
    let [amount, setAmount] = useState(300);

    useEffect(() => {
        switch (category) {
            case 'Student':
                setInstructions(Student)
                setAmount(700)
                break;
            case 'Affiliate':
                setInstructions(Affiliate)
                setAmount(17500)
                break;
            case 'Honorary':
                setInstructions(Honorary)
                setAmount(0)
                break;
            case 'Associate':
                setInstructions(Associate)
                setAmount(3000)
                break;
            case 'Lead':
                setInstructions(Lead)
                setAmount(7000)
                break;
            case 'Fellow':
                setInstructions(Fellow)
                setAmount(0)
                break;
            default:
                break;
        }
        if (category == 'Fellow' || category == 'Lead' || category == 'Associate' || category == 'Firms') setPracticing(1)
        else setPracticing(0)
    }, [category])

    let validate = () => {
        //validate all required fields
        console.log(institutions)
        console.log(organizations)
        let checkInstituions;
        let checkOrganizations;
        if ((category == 'Student' || category == 'Lead' || category == 'Associate')){
            institutions.map((institution, index) => {
                Object.keys(institution).map((key, index) => {
                    if (institution[key] == '') checkInstituions = true;
                })
            })
        } else setInstitutions([])
        if ((category == 'Fellow' || category == 'Lead' || category == 'Associate') ){
            organizations.map((organization, index) => {
                Object.keys(organization).map((key, index) => {
                    if (organization[key] == '') checkOrganizations = true;
                })
            })
        } else setOrganizations([])
        if (name == '' || last == '' || username == '' || email == '' || ID == '' || password == '' || note=='' || checkInstituions || checkOrganizations){
            verifyE();
            popupE('error', 'Error', 'Fill all mandatory fields')
            window.scrollTo({
                top: 10,
                behavior: 'smooth'
            });
            return false;
        }
        if (password!=confirm){
            popupE('error', 'Error', 'Passwords do not match')
            window.scrollTo({
                top: 10,
                behavior: 'smooth'
            });
            return false;
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
                name: `${name} ${last}`,
                username: username,
                role: 'Individual',
                nema: nema,
                practicing: practicing,
                profile:{
                    category: category,
                    alternate: alternate,
                    nationality: nationality,
                    nationalID: ID,
                    postal: postal,
                    town: town,
                    county: county,
                    firm: pin,
                    phone: phone,
                    note: note,
                },
                education:institutions,
                profession:organizations
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
                    <div className='my-6 flex flex-col md:flex-row gap-x-16 gap-y-4'>
                        <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setCategory(e.target.value)}>
                            <option className='bg-white hover:bg-white' value="Student">Student membership</option>
                            <option className='bg-white hover:bg-white' value="Fellow">Fellow membership</option>
                            <option className='bg-white hover:bg-white' value="Lead">Lead membership</option>
                            <option className='bg-white hover:bg-white' value="Associate">Associate membership</option>
                            <option className='bg-white hover:bg-white' value="Honorary">Honorary membership</option>
                            <option className='bg-white hover:bg-white' value="Affiliate">Affiliate membership</option>
                        </select>
                        <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" value={practicing} onChange={e=>setPracticing(e.target.value)}>
                            <option className='bg-white hover:bg-white' value={0}>Non-practicing</option>
                            <option className='bg-white hover:bg-white' value={1}>Practicing</option>
                        </select>
                    </div>
                    <div className='grid gap-6 md:gap-y-8 md:grid-cols-2'>
                        <Input required={true} value={name} setValue={setName} placeholder={'Jane'} type={'text'} name={'First name'}/>
                        <Input required={true} value={last} setValue={setLast} placeholder={'Doe'} type={'text'} name={'Last name'}/>
                        <Input required={true} value={username} setValue={setUsername} placeholder={'Username'} type={'username'} name={'username'}/>
                        <Input required={true} value={email} setValue={setEmail} placeholder={'jane@gmail.com'} type={'email'} name={'Email'}/>
                        <Input value={alternate} setValue={setAlternate} placeholder={'jane@gmail.com'} type={'email'} name={'Alternate email'}/>
                        <Input value={nationality} setValue={setNationality} placeholder={'Kenya'} type={'text'} name={'Nationality'}/>
                        <Input required={true} value={ID} setValue={setID} placeholder={'12345678'} type={'number'} name={'National ID'}/>
                        <Input value={postal} setValue={setPostal} placeholder={'1234-4321'} type={'text'} name={'Postal Address'}/>
                        <Input value={town} setValue={setTown} placeholder={'Town'} type={'text'} name={'Town'}/>
                        <Input value={county} setValue={setCounty} placeholder={'County'} type={'text'} name={'County'}/>
                        <Input value={nema} setValue={setNema} placeholder={'AXR/321'} type={'text'} name={'NEMA'}/>
                        <Input value={pin} setValue={setPin} placeholder={'4321'} type={'number'} name={'FOE PIN'}/>
                        <Input value={phone} setValue={setPhone} placeholder={'0712345678'} type={'phone'} name={'Phone number'}/>
                    </div>
                    <div className='flex flex-col gap-x-6 gap-y-4 md:gap-y-8 md:flex-row mt-4 md:mt-8'>
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
            <div className='mt-4'>
                {
                (category == 'Student' || category == 'Lead' || category == 'Associate') && 
                <>
                <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Education</h1>
                <Institutions data={institutions} setData={setInstitutions}/>
                </> 
                }
                {(category == 'Fellow' || category == 'Lead' || category == 'Associate') && 
                <>
                <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Work Experience</h1>
                <Organizations data={organizations} setData={setOrganizations}/>
                </>
                }
            </div>
            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Upload Documents</h1>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File files={requirements} setFiles={setRequirements} type={'all'}/>
            </div>

            <h1 className='text-xl 2xl:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Payment</h1>
            <Pay title={'Registration fee'} description={'First time registration fee'} amount={amount} email={email} phone={phone} name={`${name} ${last}`} />

            <div className='mt-6'>
                <input className='w-5 h-5' type="checkbox" name="policy" id="" />
                <label className='ml-4' htmlFor="policy">By signing up you Accept the <a href="https://docs.google.com/document/d/105XUTKZipyKBwxy4jO7wLQD7WIRufxLcgEFQGCpk6-A/edit?usp=sharing" target='blank' className='text-secondary'>Our data privacy policy</a> terms </label>
            </div>

            <div className='flex justify-between'>
                <div></div>
                <button className="bg-primary px-4 md:px-6 py-2 text-white font-semibold my-8 rounded-md hover:scale-105" onClick={e=>submit(e)}>Sign Up</button>
            </div>
        </>
    )
}