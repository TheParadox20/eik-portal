'use client'
import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Head({children, Range, Search, Title, TH, placeholder, Sort, total, Genesis}){
    let [range, setRange] = Range;
    let [search, setSearch] = Search;
    let [sort, setSort] = Sort;
    let [genesis, setGenesis] = Genesis;
    let [showDropDown, setShowDropDown] = useState(false);
    return(
        <div className="mt-2 2xl:mt-4 mx-2 text-sm 2xl:text-base">
            <div className="flex justify-between my-6">
                <h1 className="my-2 ml-2 md:ml-0 text-primary font-bold text-2xl 2xl:text-4xl overflow-y-hidden">{Title}</h1>
                <div className="md:flex items-center hidden">
                    <span className=" w-fit mr-2">1 - </span>
                    <input className="w-8 text-center bg-tertiary bg-opacity-55" placeholder={range} type="number" value={range} onChange={e=>{
                        if (!isNaN(e.target.value)) {
                            let value = parseInt(e.target.value);
                            setRange(value)
                        }else{
                            setRange(range)
                        }
                    }} />
                    <span className="mx-1">of</span>
                    <span>{total}</span>
                    <button>
                        <ChevronLeftIcon className="w-4 h-4 2xl:w-6 2xl:h-6 mx-2 2xl:mx-1" onClick={e=>genesis-range>=0?setGenesis(genesis-range):null}/>
                    </button>
                    <button>
                        <ChevronRightIcon className="w-4 h-4 2xl:w-6 2xl:h-6 mx-2 2xl:mx-1" onClick={e=>genesis+range<=total?setGenesis(genesis+range):null}/>
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-4">
                <div className="flex items-center rounded-full px-1 py-2 bg-tertiary bg-opacity-55 w-4/5 mx-auto md:w-4/12 md:mx-1">
                    <MagnifyingGlassIcon className="w-4 h-4 2xl:w-6 2xl:h-6 mx-2 mr-3"/>
                    <input className="bg-tertiary bg-opacity-5 active:bg-none active:border-none w-full text-xs 2xl:text-base" type="text" name="" id="" placeholder={placeholder} value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-y-4">
                    <div className="flex justify-around">
                        <div className="flex items-center" onClick={e=>setShowDropDown(!showDropDown)}>
                            <AdjustmentsVerticalIcon className="w-5 h-5 lg:w-4 lg:h-4 2xl:w-6 2xl:h-6 mr-2"/>
                            <span className=" whitespace-nowrap">Sort By</span>
                        </div>
                        <div className="flex bg-surface w-fit py-2 px-4 rounded-lg mx-6 relative text-xs 2xl:text-base" onClick={e=>setShowDropDown(!showDropDown)}>
                            {sort}
                            <ChevronDownIcon className="w-4 h-4 2xl:w-6 2xl:h-6 ml-1"/>
                            <div className={`flex flex-col z-40 bg-white absolute top-10 gap-y-2 ${showDropDown?'block':'hidden'}`} onClick={e=>setShowDropDown(!showDropDown)}>
                                {
                                    TH.map((th, index) => {
                                        return (<div className="py-1 px-4 whitespace-nowrap" onClick={e=>setSort(th)} key={index}>{th}</div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {children}

                    <div className="flex justify-between mr-4 md:hidden mt-5">
                        <div></div>
                        <div className="flex items-center">
                            <span className=" w-fit mr-2">1 - </span>
                            <input className="w-8 text-center bg-tertiary" placeholder="20" type="number" name="" id="" />
                            <span className="mx-2">of</span>
                            <span>{'100'}</span>
                            <button>
                                <ChevronLeftIcon className="w-4 h-4 2xl:w-6 2xl:h-6 mx-2"/>
                            </button>
                            <button>
                                <ChevronRightIcon className="w-4 h-4 2xl:w-6 2xl:h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}