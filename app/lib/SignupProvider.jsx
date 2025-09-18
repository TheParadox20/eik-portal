'use client'
import { createContext, useState } from "react";

export let SignupContext = createContext();

export default function SignupProvider({ children }) {
    let Type = useState(null);
    let Practicing = useState(0);
    let Category = useState(null);
    let Name = useState('');
    let Last = useState('');
    let Username = useState('');
    let Email = useState('');
    let Nema = useState('');
    let Nationality = useState('');
    let Postal = useState('');
    let Town = useState('');
    let County = useState('');
    let Phone = useState('');
    let Alternate = useState('');
    let Password = useState('');
    let Confirm = useState('');
    let FirmName = useState('');
    let Pin = useState('');
    let Image = useState([]);
    let Note = useState(' ');
    let Requirements = useState([]);
    let Education = useState([{}]);
    let Experience = useState([{}]);
    let Members = useState([{name:'',number:''},{name:'',number:''}]);
    let Paths = useState(['/register','/register/profile','/register/bio']);
    
    return(
        <SignupContext.Provider value={{
            Paths,
            Type, Category, Practicing,
            Name, Last, Username, Email, Nema, Nationality, Postal, Town, County, Phone, Alternate, Password, Confirm,
            Pin, FirmName,
            Image, Note,
            Requirements, Education, Experience,
            Members
        }}>
            {children}
        </SignupContext.Provider>
    )
}