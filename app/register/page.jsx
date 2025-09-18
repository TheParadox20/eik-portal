'use client'

import Link from "next/link";
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useState, useContext } from "react";
import { SignupContext } from "@/app/lib/SignupProvider";

export function Categories({type, setType, cat, setCategory}){
    let categories = [
        {
            name: 'Student',
            entryFee: 200,
            anualFee: 500
        },
        {
            name: 'Associate',
            entryFee: 1500,
            anualFee: 3000
        },
        {
            name: 'Lead',
            entryFee: 2000,
            anualFee: 5000
        },
        {
            name: 'Affiliate',
            entryFee: 7500,
            anualFee: 10000
        }
        ,
        {
            name: 'Honorary',
            entryFee: 0,
            anualFee: 0
        }
        ,
        {
            name: 'Fellow',
            entryFee: 0,
            anualFee: 0
        }
    ]

    if(type==='individual')
    return(
        <div>
            <button onClick={e=>setType(null)} className="flex items-center gap-1 mb-10">
                <span className='icon-[grommet-icons--previous] w-5 h-5'/>
                Back
            </button>
            <div className="grid md:grid-cols-2 gap-y-5 gap-x-8">
                {
                    categories.map((category, i) => (
                        <div key={i} className="flex flex-col gap-y-2 p-5 border-2 border-gray-100 shadow-lg rounded-md">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl text-secondary uppercase font-semibold">{category.name}</h3>
                                    <div className={`icon-[simple-icons--ticktick] w-5 h-5 text-green-600 ${cat===category.name?'block':'hidden'} `}/>
                                </div>
                                <div className="icon-[bxs--category-alt] w-9 h-9 text-gray-500"/>
                            </div>
                            <p className="">Entry Fee: <span className="text-gray-600">KES {category.entryFee}</span></p>
                            <p className="">Annual Fee: <span className="text-gray-600">KES {category.anualFee}</span></p>
                            <div className="flex justify-between mt-10 ">
                                <div></div>
                                <Link href={'/register/profile'} onClick={e=>setCategory(category.name)} className="bg-primary hover:bg-secondary hover:scale-105 text-white rounded-md px-9 py-2">Select</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default function Page(){
    let {Type, Category} = useContext(SignupContext);
    let [type, setType] = Type;
    let [category, setCategory] = Category

    return(
        <section className='min-h-[60vh] p-10'>
            {
                type && type==='individual'?
                <Categories type={type} setType={setType} cat={category} setCategory={setCategory}/>
                :
                <div className="flex flex-col gap-y-10 md:flex-row mt-6 justify-center md:justify-around rounded-xl items-center md:h-[40vh]">
                    <button onClick={e=>setType('individual')}>
                        <div className={`flex flex-col gap-y-12 px-2 md:px-10 py-7 justify-center items-center gap-5 rounded-md shadow-2xl font-semibold relative group`}>
                            <p className="uppercase text-xl">Individual</p>
                            <UserIcon className={`w-8 h-8 md:w-12 md:h-12`}/>
                            <div className="bg-primary text-white py-2 px-4 rounded-md hover:scale-105 flex items-center gap-2">
                                Continue To Registration
                                <span className="icon-[grommet-icons--form-next] w-6 h-6"/>
                            </div>
                        </div>
                    </button>
                    <Link href={'/register/profile'} onClick={e=>{setType('firm');setCategory('Firm')}}>
                    <div className={`flex flex-col gap-y-12 px-2 md:px-10 py-7 justify-center items-center gap-5 rounded-md shadow-2xl font-semibold relative group`}>
                            <p className="uppercase text-xl">Firms</p>
                            <UserGroupIcon className={`w-8 h-8 md:w-12 md:h-12`}/>
                            <div className="bg-primary text-white py-2 px-4 rounded-md hover:scale-105 flex items-center gap-2">
                                Continue To Registration
                                <span className="icon-[grommet-icons--form-next] w-6 h-6"/>
                            </div>
                        </div>
                    </Link>
                </div>
            }
        </section>
    )
}