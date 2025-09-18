'use client'
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { fetcher } from "@/app/lib/data";
import Spinner from "@/app/ui/Spinner";
import useUser from "@/app/lib/hooks/useUser";
import Bur from "@/app/ui/charts/Bar"
import Lyn from "@/app/ui/charts/Line"
import Py from "@/app/ui/charts/Pie"
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, UsersIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation";
import { getData } from "@/app/lib/data"
import Overlay from "../ui/overlay";
import { CalenderRange } from "@/app/ui/Calender";

export default function Dashboard(){
    const { user } = useUser()
    let [category, setCategory] = useState('');
    let [members, setMembers] = useState(0);
    let [time, setTime] = useState('7D')
    let [page, setPage] = useState('')

    useEffect(()=>{
        getData(setMembers,'/stats/members',{category})
    },[category])
    let timeRef = useRef({})

    const { data, error, isLoading } = useSWR(['/summary',{}], fetcher)
    console.log(data)

    let router = useRouter()
    
    if (user.role != 'Admin') {
        router.push('/profile')
    }
    if (isLoading) return <Spinner />
    if (error) return <></>
    return(
        <>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
          <div className="flex  overflow-x-scroll max-w-full py-2 md:py-0 items-center">
            <select className="border-[2px] rounded-lg p-2 mr-2" name="" id="" value={category} onChange={e=>setCategory(e.target.value)}>
                <option className=' hover:' value="">Select member category</option>
                <option className=' hover:' value="Student">Student membership</option>
                <option className=' hover:' value="Fellow">Fellow membership</option>
                <option className=' hover:' value="Lead">Lead membership</option>
                <option className=' hover:' value="Associate">Associate membership</option>
                <option className=' hover:' value="Honorary">Honorary membership</option>
                <option className=' hover:' value="Affiliate">Affiliate membership</option>
                <option className=' hover:' value="Firm">Firm membership</option>
            </select>
            {
              ['Today', 'Yesterday', '7D', '30D', '3M', '6M', '12M'].map((length,i)=>(
                <button key={i} className={`${length==time?'bg-secondary text-white px-8 rounded-sm':'border-r-2 border-gray-200 px-3'} py-1`} onClick={e=>setTime(length)}>{length}</button>
              ))
            }
            <button className="ml-2 border-2 rounded-lg py-2 px-2 min-w-32" onClick={e=>setPage('/custom')}>Custom <span className="icon-[simple-line-icons--calender] w-4 h-4 ml-4"/></button>
          </div>
        </div>
        <div className="mb-0 w-[100%] px-4 overflow-x-auto no-scroll">
            <div className="flex w-fit gap-10">
                <div className="bg-tertiary bg-opacity-15 px-6 py-4 rounded-md w-80">
                    <div className="flex justify-between">
                        <div>
                            <div className="mb-4 lg:text-xs 2xl:text-base">Member Count</div>
                            <div className="text-2xl font-bold lg:text-xl 2xl:text-2xl">{members}</div>
                        </div>
                        <div className="flex bg-primary bg-opacity-25 px-4 mb-4 items-center rounded-lg">
                            <UsersIcon className="text-primary w-8 h-8 block"/>
                        </div>
                    </div>
                </div>
                <div className="bg-tertiary bg-opacity-15 px-6 py-4 rounded-md w-80">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="mb-4 lg:text-xs 2xl:text-base">Total Revenue</div>
                            <div className="text-2xl font-bold lg:text-xl 2xl:text-2xl">KES {parseInt(data.revenue.quantity)?.toLocaleString()}</div>
                        </div>
                        <div className="flex bg-primary bg-opacity-25 px-4 mb-4 items-center rounded-lg">
                            <img src="/icons/bag.svg" className="w-8 h-8 block" alt="" />
                        </div>
                    </div>
                    <div className="flex text-sm">
                        <div className={`flex ${data.revenue.trend?'text-primary':'text-warning'}`}>
                            {data.revenue.trend?<ArrowTrendingUpIcon className="w-5 h-5 mx-2"/>:<ArrowTrendingDownIcon className="w-5 h-5 mx-2"/>}
                            <span>{data.revenue.rate}% {`${data.revenue.trend?'up':'down'}`} from {'last month'}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-tertiary bg-opacity-15 px-6 py-4 rounded-md w-80">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="mb-4 lg:text-xs 2xl:text-base">Total Logins</div>
                            <div className="text-2xl font-bold lg:text-xl 2xl:text-2xl">{data.logins.quantity}</div>
                        </div>
                        <div className="flex bg-primary bg-opacity-25 px-4 mb-4 items-center rounded-lg">
                            <img src="/icons/login.svg" className="w-8 h-8 block" alt="" />
                        </div>
                    </div>
                    <div className="flex text-sm">
                        <div className={`flex ${data.logins.trend?'text-primary':'text-warning'}`}>
                            {data.logins.trend?<ArrowTrendingUpIcon className="w-5 h-5 mx-2"/>:<ArrowTrendingDownIcon className="w-5 h-5 mx-2"/>}
                            <span>{data.logins.rate}% {`${data.logins.trend?'up':'down'}`} from {'last month'}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-tertiary bg-opacity-15 px-6 py-4 rounded-md w-fit">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="mb-4 lg:text-xs 2xl:text-base">Print Certificate Requests</div>
                            <div className="text-2xl font-bold lg:text-xl 2xl:text-2xl">{data.print.quantity}</div>
                        </div>
                        <div className="flex bg-primary ml-4 bg-opacity-25 px-4 mb-4 items-center rounded-lg h-14">
                            <img src="/icons/printer.svg" className="h-6 w-6 2xl:w-8 2xl:h-8 block" alt="" />
                        </div>
                    </div>
                    <div className="flex text-sm">
                        <div className={`flex ${data.print.trend?'text-primary':'text-warning'}`}>
                            {data.print.trend?<ArrowTrendingUpIcon className="w-5 h-5 mx-2"/>:<ArrowTrendingDownIcon className="w-5 h-5 mx-2"/>}
                            <span>{data.print.rate}% {`${data.print.trend?'up':'down'}`} from {'last month'}</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="mt-10"><Lyn/></div>
            <div className="flex flex-col md:flex-row gap-y-10 gap-x-10 justify-between my-24">
                <Bur/>
                <Py/>
            </div>
            <Overlay control={setPage} id={'alpha-overlay'} className={`${page==''?'hidden':'flex items-center justify-center'}`}>
                {page=='/custom' && <CalenderRange DateRef={timeRef} control={setPage}/>}
            </Overlay>
        </>
    )
}