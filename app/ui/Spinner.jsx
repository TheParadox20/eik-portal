export default function Spinner({internal}){
    return(
        <div className={`flex items-center justify-center ${internal?'w-full h-full':'w-lvw h-lvh fixed z-50 top-0 left-0'} bg-white bg-opacity-95`}>
            <img className='w-20 mb-5' src="/icons/loading.svg" alt="" />
        </div>
    )
}