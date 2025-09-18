export function TableHead({children, TH}){
    return(
        <thead className="capitalize bg-gray-100 sticky top-0">
            <tr>
                {
                    TH.map((th, index) => {
                        return (<th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">{th}</th>)
                    })
                }
                {children}
            </tr>
        </thead>
    )
}


export function TableBody({children,data,range}){
    return(
        <tbody>
            {
                data.slice(0,range).map((data,index)=>{
                    return(
                        <tr key={index} className="border-b border-gray-700">
                            {
                                Object.keys(data).map((key, index) => {
                                    return(
                                        <td key={index} className="px-6 py-4 whitespace-nowrap">{data[key]}</td>
                                    )
                                })
                            }
                            {children}
                        </tr>
                    )
                })
            }
            {
                [...new Array((range-data.length>0)?range-data.length:0)].map((_,index)=>{
                    return(
                        <tr key={index} className="border-b border-gray-700">
                            <td className="py-6"></td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}


export function Table({children}){
    return(
        <div className="overflow-x-scroll mt-2 md:mt-10 mx-2 lg:mx-0 max-h-96 md:max-h-[65vh] overflow-y-scroll">
            <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
                {children}
            </table>
        </div>
    )
}