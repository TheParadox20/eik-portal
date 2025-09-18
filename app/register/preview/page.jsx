'use client'
import { useContext } from 'react';
import { SignupContext } from '@/app/lib/SignupProvider';
import { useRouter } from 'next/navigation';
import { postData, postFile } from '@/app/lib/data'
import { popupE } from "@/app/lib/trigger"

export function Individuals({data}){
    return(
        <section>
            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Profile</h1>
            <div className="flex flex-col md:flex-row gap-y-4 gap-x-10">
                {
                    data.image.length > 0 ?
                    <img src={URL.createObjectURL(data.image[0])} className='w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg' alt="Profile" />
                    :
                    <img src="/profile.svg" className='w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg' alt="Profile" />
                }

                <div className="grid md:grid-cols-2 flex-grow gap-4">
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Name:</p>
                        <p>{data.name}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Username:</p>
                        <p>{data.username}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Email:</p>
                        <p>{data.email}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Alternate Email:</p>
                        <p>{data.alternate}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Nationality:</p>
                        <p>{data.nationality}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Postal Address:</p>
                        <p>{data.postal}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Town:</p>
                        <p>{data.town}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>County:</p>
                        <p>{data.county}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>NEMA:</p>
                        <p>{data.nema}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Phone number:</p>
                        <p>{data.phone}</p>
                    </div>
                </div>
            </div>

            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Bio</h1>
            <div className="max-h-96 overflow-y-scroll large-scroll">
                <div 
                    className="" 
                    dangerouslySetInnerHTML={{ __html: data.bio }} 
                />
            </div>

            {
                (data.category == 'Student' || data.category == 'Lead' || data.category == 'Associate') &&
                <>
                <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Education</h1>
                {
                    data.education.map((item, index) => {
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 mb-4">
                                <span className="font-bold w-fit">Institution:</span>
                                <span className="md:whitespace-nowrap">{item.institution}</span>
                                <span className="font-bold w-fit">Title:</span>
                                <span className="md:whitespace-nowrap">{item.Title}</span>
                                <span className="font-bold w-fit">Certification</span>
                                <span className="md:whitespace-nowrap">{item.Certification}</span>
                                <span className="font-bold w-fit">Start & Finish Date:</span>
                                <span className="md:whitespace-nowrap">{item.start} - {item.end}</span>
                            </div>
                        )
                    })
                }
                </>
            }

            {
                (data.category == 'Fellow' || data.category == 'Lead' || data.category == 'Associate') &&
                <>
                <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Experience</h1>
                {
                    data.experience.map((item, index) => {
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 mb-4">
                                <span className="font-bold w-fit">Company:</span>
                                <span className="md:whitespace-nowrap">{item.Organization}</span>
                                <span className="font-bold w-fit">Company Email:</span>
                                <span className="md:whitespace-nowrap">{item.Email}</span>
                                <span className="font-bold w-fit">Company Telephone:</span>
                                <span className="md:whitespace-nowrap">{item.Phone}</span>
                                <span className="font-bold w-fit">Location</span>
                                <span className="md:whitespace-nowrap">{item.Location}</span>
                                <span className="font-bold w-fit">Job title</span>
                                <span className="md:whitespace-nowrap">{item.Position}</span>
                                <span className="font-bold w-fit">Duties</span>
                                <span className="md:whitespace-nowrap">{item.Duties}</span>
                                <span className="font-bold w-fit">Start & Finish Date:</span>
                                <span className="md:whitespace-nowrap">{item.start} - {item.end}</span>
                            </div>
                        )
                    })
                }
                </>
            }

            {
                (data.category == 'Fellow' || data.category == 'Lead' || data.category == 'Associate' || 'Student') &&
                <>
                <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Attachments</h1>
                {
                    data.requirements.map((file, index) => {
                        console.log(file.name)
                        return(
                            <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 mb-4">
                                <span className="font-bold w-fit">Attachment {index+1}:</span>
                                <span className="md:whitespace-nowrap">{file.name}</span>
                            </div>
                        )
                    } )
                }
                </>
            }
        </section>
    )
}

export function Firms({data}){
    return(
        <section>
            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Profile</h1>
            <div className="flex flex-col md:flex-row gap-y-4 gap-x-10">
                {
                    data.image.length > 0 ?
                    <img src={URL.createObjectURL(data.image[0])} className='w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg' alt="Profile" />
                    :
                    <img src="/profile.svg" className='w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg' alt="Profile" />
                }

                <div className="grid md:grid-cols-2 flex-grow gap-4">
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Firm of Experts:</p>
                        <p>{data.firmName}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Email:</p>
                        <p>{data.email}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Alternate Email:</p>
                        <p>{data.alternate}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Nationality:</p>
                        <p>{data.nationality}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Postal Address:</p>
                        <p>{data.postal}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Town:</p>
                        <p>{data.town}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>County:</p>
                        <p>{data.county}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>NEMA:</p>
                        <p>{data.nema}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Firm KRA PIN:</p>
                        <p>{data.pin}</p>
                    </div>
                    <div className="shadow-md py-2 px-4">
                        <p className='font-semibold'>Phone number:</p>
                        <p>{data.phone}</p>
                    </div>
                </div>
            </div>

            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Bio</h1>
            <div className="max-h-96 overflow-y-scroll large-scroll">
                <div 
                    className="" 
                    dangerouslySetInnerHTML={{ __html: data.bio }} 
                />
            </div>

            <h1 className='text-xl font-medium mx-2 py-2 border-b-2 my-8'>Attachments</h1>
            {
                data.requirements.map((file, index) => {
                    console.log(file.name)
                    return(
                        <div key={index} className="grid grid-cols-2 md:w-1/3 gap-y-1 mb-4">
                            <span className="font-bold w-fit">Attachment {index+1}:</span>
                            <span className="md:whitespace-nowrap">{file.name}</span>
                        </div>
                    )
                } )
            }
        </section>
    )
}

export default function Page() {
    let {
        Type, Category, Practicing,
        Name, Last, Username, Email, Nema, Nationality, Postal, Town, County, Phone, Alternate, Password, Confirm,
        Pin, FirmName,
        Image, Note,
        Requirements, Education, Experience,
        Members
    } = useContext(SignupContext);

    let [type, setType] = Type;
    let [category, setCategory] = Category;
    let [practicing, setPracticing] = Practicing;
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
    let [pin, setPin] = Pin;
    let [firmName, setFirmName] = FirmName;
    let [image, setImage] = Image;
    let [note, setNote] = Note;
    let [requirements, setRequirements] = Requirements;
    let [education, setEducation] = Education;
    let [experience, setExperience] = Experience;
    let [members, setMembers] = Members;


    let router = useRouter()
    let submitIndividual = e => {
        e.preventDefault();
        if (true){
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
                    postal: postal,
                    town: town,
                    county: county,
                    phone: phone,
                    note: note,
                },
                education,
                profession:experience,
            },'/register')
        }
    }

    let submitFirm = e => {
        e.preventDefault();
        if (true){
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
        <div className='px-2 py-5 md:p-7'>
            <h3 className='mb-7 text-secondary text-lg 2xl:text-xl'>Preview & Submit</h3>

            {
                type==='individual' ?
                <Individuals data={{
                    image,
                    bio:note,
                    education,
                    experience,
                    name: `${name} ${last}`,
                    username,
                    email, alternate,
                    nationality, postal, town, county, phone,
                    nema,
                    requirements,
                    category
                }}/>
                :
                <Firms data={{
                    image,
                    bio:note,
                    firmName, pin,
                    email, alternate,
                    nationality, postal, town, county, phone,
                    nema,
                    requirements,
                }}/>
            }

            <div className='flex gap-5 mt-8 ml-2 my-4'>
                <button
                    className='font-semibold leading-6 text-white bg-primary w-fit text-center mr-4 py-2 px-6 rounded-md md:text-xl'
                    onClick={e=>{
                        type == 'individual' ? submitIndividual(e) : submitFirm(e)
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}