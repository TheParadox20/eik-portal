'use client'

import { useEffect } from "react"

export default function Overlay({children, className,id, control}){
    useEffect(()=>{
        let overlay = document.getElementById(id);
        if (!overlay) {
            console.error(`Overlay element with id '${id}' not found`);
            return;
        }
        if(id!=undefined){
            overlay.addEventListener('click', e=>{
                if(e.target.id == id){
                    control(null)
                }
            })
        }
    },[])
    
    return(
        <div onClick={e=>{control('')}} id={id} className={`fixed z-50 w-lvw h-lvh top-0 left-0 bg-black bg-opacity-40 ${className}`}>
            <div onClick={e=>e.stopPropagation()} id="children">{children}</div>
        </div>
    )
}