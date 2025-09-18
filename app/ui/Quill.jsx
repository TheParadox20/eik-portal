'use client'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

export default function Quill({value, setValue, placeholder}){
    return (
        <div className='h-full w-full'>
            <ReactQuill
            theme="snow" placeholder={placeholder}
            value={value} onChange={setValue}
            style={{height:'100%'}}
            />
        </div>
    );
}