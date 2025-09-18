'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { SignupContext } from "@/app/lib/SignupProvider";

export default function Trail(){
    let path = usePathname();
    let {Category, Paths} = useContext(SignupContext)
    let [category, _] = Category
    let [paths, setPaths] = Paths
    let [complete, setComplete] = useState(false)

    let index = paths.indexOf(path)
    useEffect(()=>{
        if(path=='/register/payment' || path=='/register/preview') setComplete(true)
        else setComplete(false)
    },[index])

    let [steps, setSteps] = useState([
        {
            icon: 'icon-[mynaui--ticket]',
            title: 'Type',
            link: '/register'
        },
        {
            icon: 'icon-[iconamoon--profile-circle-fill]',
            title: 'Profile',
            link: '/register/profile'
        },
        {
            icon: 'icon-[ic--round-fingerprint]',
            title: 'Bio',
            link: '/register/bio'
        }
    ]);

    useEffect(()=>{
        let newSteps = [...steps];
        let newPaths = [...paths];

        if(category == 'Student' || category == 'Lead' || category == 'Associate'){
            if(!newSteps.find(step => step.title === 'Education')){
                newSteps.push({
                    icon: 'icon-[game-icons--graduate-cap]',
                    title: 'Education',
                    link: '/register/education'
                });
                newPaths.push('/register/education');
            }
        } else {
            newSteps = newSteps.filter(step => step.title !== 'Education');
            newPaths = newPaths.filter(path => path !== '/register/education');
        }

        if(category == 'Fellow' || category == 'Lead' || category == 'Associate'){
            if(!newSteps.find(step => step.title === 'Experience')){
                newSteps.push({
                    icon: 'icon-[mdi--worker-outline]',
                    title: 'Experience',
                    link: '/register/experience'
                });
                newPaths.push('/register/experience');
            }
        } else {
            newSteps = newSteps.filter(step => step.title !== 'Experience');
            newPaths = newPaths.filter(path => path !== '/register/experience');
        }

        if(category === 'Firm'){
            if(!newSteps.find(step => step.title === 'Requirements')){
                newSteps.push({
                    icon: 'icon-[bi--files]',
                    title: 'Requirements',
                    link: '/register/requirements'
                });
                newPaths.push('/register/requirements');
            }
        } else {
            newSteps = newSteps.filter(step => step.title !== 'Requirements');
            newPaths = newPaths.filter(path => path !== '/register/requirements');
        }

        setSteps(newSteps);
        setPaths(newPaths);
    },[category])

    return(
        <section className="flex text-xs md:text-base">
            {
                steps.map((step, i) => (
                    <Link href={step.link} key={i} className="flex-grow">
                        <div className="relative flex justify-center">
                            <div className={`absolute ${index>=i || complete?'bg-secondary':'bg-gray-300'} top-1/2 h-1 w-full`}></div>
                            <div className={`${index>=i || complete?'bg-secondary text-white':'bg-gray-300 text-gray-600'} w-14 h-14 rounded-full flex justify-center items-center`}>
                                <div className={step.icon + ' w-8 h-8'}/>
                            </div>
                        </div>
                        <p className={`text-center font-semibold ${index>=i || complete?'text-secondary':'text-gray-600'}`}>{step.title}</p>
                    </Link>
                ))
            }
        </section>
    )
}