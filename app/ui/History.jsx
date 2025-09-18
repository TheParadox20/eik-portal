import useSWR from "swr";
import { useState } from "react";
import { fetcher, getFile } from "@/app/lib/data";
import { popupE } from "@/app/lib/trigger";

export default function History({id}) {
    let [selected, setSelected] = useState(null)
    const { data, error, isLoading } = useSWR(['/profile/membership',{id}], fetcher)

    let download = (e)=>{
        e.preventDefault();
        popupE('ok', 'processing', 'Please wait...');
        getFile(`${data?.data[selected].year}.pdf`,'/certificate/download',{
            id: data?.data[selected].number,
            year: data?.data[selected].year
        })
    }
    
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error loading history</div>

    console.log(data)

    return(
        <table onClick={e=>{selected!=null?setSelected(null):null}} className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Number</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.data.map((item, index) => {
                        return (
                            <tr key={index} className="border-b-2 border-gray-100 relative">
                                <td className="py-2 px-5">{item.year}</td>
                                <td className="py-2 px-5">{item.number}</td>
                                <td className="py-2 px-5">{'Not available'}</td>
                                <td className="py-2 px-5">
                                    <button
                                     className="icon-[codicon--ellipsis] w-6 h-6"
                                     onClick={e=>setSelected(index)}
                                    />
                                </td>
                                <div className={`bg-white z-30 space-y-3 absolute right-20 top-2 shadow-xl py-4 px-1 rounded-xl ${selected==index?'block':'hidden'}`}>
                                    <button onClick={e=>download(e)} className="block w-full text-left py-2 px-4 rounded-md hover:bg-secondary hover:text-white">Download certificate</button>
                                    <button className="block w-full text-left py-2 px-4 rounded-md hover:bg-secondary hover:text-white">Initiate payment</button>
                                    <button className="block w-full text-left py-2 px-4 rounded-md hover:bg-secondary hover:text-white">Waiver</button>
                                </div>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}