import {load} from './storage.js'
import { popupE } from "@/app/lib/trigger"

export function getData(setData,endpoint,parameters, token=load('token'), url = process.env.NEXT_PUBLIC_API_URL) {
    //map parameters to get parameter format
    let params = new URLSearchParams(parameters).toString();
    console.log('Payload :: ', params)
    fetch(`${url}${endpoint}?${params}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(response => response.json())
    .then(data => {
        console.log(`From ${endpoint}`, data)
        if (data.error) popupE('error', 'Error', data.error)
        else setData(data);
        if (data.message) popupE('ok', 'Success ✅', data.message)
    })
    .catch(err => {
        console.log(err)
        popupE('error', 'Error', 'Server Error')
    });
}

export function getFile(name,endpoint,parameters, token=load('token')) {
    let params = new URLSearchParams(parameters).toString();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(response => response.blob())
    .then(blob => {
        console.log(blob)
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(err => {
        console.log(err)
        popupE('error', 'Error', 'Server Error')
    });
}

export function postFile(setData,file,data,endpoint,token = load('token'), url = process.env.NEXT_PUBLIC_API_URL) {
    const formData = new FormData();
    formData.append(`file`, file);
    Object.keys(data).map((key,i)=>{
        formData.append(key, data[key]);
    })
    fetch(`${url}${endpoint}`, {
        method: "POST",
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) popupE('error', 'Error', data.error)
            if (data.message) popupE('ok', 'Success', data.message)
            setData(data);
        })
        .catch(err => {
            console.log(err)
            popupE('error', 'Error', 'File upload Error')
        });
}

export function postData(setData,data,endpoint,token = load('token'), url = process.env.NEXT_PUBLIC_API_URL) {
    fetch(`${url}${endpoint}`, {
        method: "POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(`From ${endpoint}`, data)
        if (data.error) popupE('error', 'Error', data.error)
        if (data.message) popupE('ok', 'Success', data.message)
        setData(data);
    })
    .catch(err => {
        console.log(err)
        popupE('error', 'Error', 'Server Error')
    });
}

export function putData(setData,data,endpoint,token = load('token'), url = process.env.NEXT_PUBLIC_API_URL) {
    fetch(`${url}${endpoint}`, {
        method: "PUT",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(`From ${endpoint}`, data)
        if (data.error) popupE('error', 'Error', data.error)
        if (data.message) popupE('ok', 'Success', data.message)
        setData(data);
    })
    .catch(err => {
        console.log(err)
        popupE('error', 'Error', 'Server Error')
    });
}

export function fetcher([endpoint,parameters, token=load('token'), url=process.env.NEXT_PUBLIC_API_URL]) {
    // if (load('token') == null) throw new Error('Session Expired')
    let params = new URLSearchParams(parameters).toString();
    console.log(`Payload to ${endpoint} :: `, params)
    return fetch(`${url}${endpoint}?${params}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(response => response.json())
}

export async function postFileFetcher([file,data,endpoint,token = load('token'), url = process.env.NEXT_PUBLIC_API_URL]) {
    const formData = new FormData();
    formData.append(`file`, file);
    Object.keys(data).map((key,i)=>{
        formData.append(key, data[key]);
    })
    return await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('File upload Error')
        }
        return res.json();
    })
    .catch(err => {
        popupE('error', 'Error', 'File upload Error')
    });
}