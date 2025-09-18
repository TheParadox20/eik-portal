'use client'
import Link from "next/link";
import useUser from "@/app/lib/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import {RectangleGroupIcon, GlobeAltIcon, UserPlusIcon, Square3Stack3DIcon, UserGroupIcon, BuildingLibraryIcon, AcademicCapIcon, ArrowLeftEndOnRectangleIcon, UserCircleIcon, HomeIcon, CurrencyDollarIcon, NewspaperIcon, CreditCardIcon} from '@heroicons/react/24/outline';
import { remove } from "@/app/lib/storage";

export default function SideNav({control}){
    let pathname = usePathname();
    const router = useRouter();
    const { user, isLoading, isError } = useUser()

    let logout = e => {
        remove('token');
        router.push('/login')
    }


    let links = [

        {
            name: "Home",
            icon: HomeIcon,
            href: "/",
            roles:['Firm','Individual']
        },
        {
            name: "Profile",
            icon: UserCircleIcon,
            href: "/profile",
            roles:['Firm','Individual']
        },
        {
            name: "Account",
            icon: CreditCardIcon,
            href: "/account",
            roles:['Firm','Individual']
        },
        {
            name: "Dashboard",
            icon: RectangleGroupIcon,
            href: "/",
            roles:['Admin']
        },
        {
            name: "Admins",
            icon: UserPlusIcon,
            href: "/admins",
            roles:['Admin']
        },
        {
            name: "User Logs",
            icon: Square3Stack3DIcon,
            href: "/logs",
            roles:['Admin']
        },
        {
            name: "Members",
            icon: UserGroupIcon,
            href: "/members",
            roles:['Admin','Firm']
        },
        {
            name: "Firms",
            icon: BuildingLibraryIcon,
            href: "/firms",
            roles:['Admin']
        },
        {
            name: "Certificates",
            icon: AcademicCapIcon,
            href: "/certificates",
            roles:['Admin']
        },
        {
            name: "Payments",
            icon: CurrencyDollarIcon,
            href: "/payments",
            roles:['Admin']
        },
        {
            name: "Trainings",
            icon: NewspaperIcon,
            href: "/trainings",
            roles:['Admin']
        },
        {
            name: "Conferences",
            icon: GlobeAltIcon,
            href: "/conference",
            roles:['Admin']
        },
    ]

    if (isLoading) return <></>
    if (isError) return <></>
    return(<>
    <img className="w-48" src="/logo10.jpeg" alt="" />
    {
        links.map((link, index) => {
            if(link.roles.includes(user.role)){
                return(
                    <Link key={index} href={link.href} onClick={e=>control(false)}>
                        <div className={`flex items-center p-4 lg:p-2 2xl:p-4 ${pathname === link.href ? ' border-l-8 border-primary text-primary bg-tertiary bg-opacity-10' : ''}`}>
                            <link.icon className="w-6 h-8 mr-2"/>
                            <span className="text-sm">{link.name}</span>
                        </div>
                    </Link>
                )
            }
        })
    }
        <button className="flex items-center text-warning absolute bottom-10 2xl:bottom-20 ml-4" onClick={e=>logout(e)}>
            <ArrowLeftEndOnRectangleIcon className="w-6 h-8 mr-2"/>
            Logout
        </button>
    </>)
}