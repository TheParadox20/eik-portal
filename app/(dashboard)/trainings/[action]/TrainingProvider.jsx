'use client'
import { useState } from "react";
import { createContext } from "react";

export let Training = createContext();

export default function TrainingContext({ children }) {
    let Title = useState('');
    let TWG = useState([]);
    let Description = useState('');
    let Pricing = useState({});

    return(
        <Training.Provider value={{
            Title, TWG, Description
        }}>
        {children}
        </Training.Provider>
    )
}