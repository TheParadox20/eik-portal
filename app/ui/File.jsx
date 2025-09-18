'use client'
import { useState, useEffect } from "react"
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline'

export default function File({ files, setFiles, type }) {
    const [dragging, setDragging] = useState(false);
    let [image, setImage] = useState(null);
    let [title, setTitle] = useState('');

    let createURL = () => {
        if (type != 'image') return;
        if (files.length===0) {
            setImage(null);
            return;
        }
        let file = files[0]
        if (file && file.type.startsWith('image/')){
            let url = URL.createObjectURL(file);
            // saveDB('profile', file)
            setImage(url);
        } else {
            alert ('File uploaded not image')
        }
    };

    useEffect(() => {
        createURL();
    }, [files]);

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        setFiles([...files, ...event.dataTransfer.files]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((file, i) => i !== index));
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-2 flex flex-col items-center justify-center ${dragging ? "border-2" : "border-2"} rounded-xl`}
        >
            {
                type === 'image' ?
                    image?
                    <img src={image} alt="profile" className='w-24 h-24 2xl:w-56 2xl:h-56 rounded-lg'/>
                    :
                    <ViewfinderCircleIcon className='text-tertiary w-24 h-24 2xl:w-56 2xl:h-56'/>
                :
                <img src="/icons/file.svg" className="w-24 h-24 2xl:w-56 2xl:h-56" alt="" />
            }
            <input 
                type="file"
                id={`profile-${type}`} 
                {...
                    type === 'image' ?
                    {accept: 'image/*'}
                    :
                    {accept: '*'}
                }
                multiple onChange={handleFileChange} 
                placeholder='Upload profile photo'
                className="
                    text-sm text-black
                    file:bg-white file:border-none file:outline-none
                    file:font-medium
                    file:text-secondary file:text-lg
                    hover:file:cursor-pointer hover:file:text-xl
                    file:hidden text-center
                " 
            />
            <label htmlFor={`profile-${type}`}  className='py-4'>
                <span className='text-secondary'>Browse Files</span> or Drag into area
            </label>
            {files.map((file, index) => (
                <div className="text-sm md:text-base grid grid-cols-3 gap-x-2 auto-rows-max mb-2" key={index}>
                    <span className="col-span-2 text-left max-w-1/3 truncate">{file.name}</span>
                    <button className=" text-warning w-fit" onClick={() => removeFile(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
}