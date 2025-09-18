'use client'

import { useEffect } from 'react';
import Link from "next/link";
import SignupProvider from "../lib/SignupProvider";
import Trail from "./Trail";

export default function Layout({children}){

    return(
        <SignupProvider>
            <main className='bg-gray-200 min-h-[100vh] pb-7'>
                <div className="md:w-10/12 2xl:w-2/3 md:mx-auto">
                    <section className="flex flex-col gap-y-3 lg:flex-row md:items-center md:gap-0 justify-between rounded-b-lg bg-white py-10 px-5">
                        <img src="/logo10.jpeg" className="w-56 mx-auto md:mx-0" alt="" />
                        <div>
                            <h1 className="mb-2 text-3xl">Membership Application</h1>
                            <p className="text-sm">This page allows you to create an account that you shall use for your membership</p>
                        </div>
                        <div className="text-sm">
                            <span>Already have an account?</span>
                            <Link href={'/login'}> <span className="text-secondary font-semibold">Sign in</span> </Link>
                        </div>
                    </section>

                    <section className="my-7">
                        <Trail/>
                    </section>
                    
                    <section className="bg-white rounded-lg">
                        {children}
                    </section>
                </div>
            </main>
        </SignupProvider>
    )
}