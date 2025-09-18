'use client'

import { useState } from "react";

export function getDaySuffix (day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export function getWeeksOfMonth (year, month) {
    const weeks = [];
    const date = new Date(year, month, 1);
    
    // Find the first Sunday of the month
    while (date.getDay() !== 0) {
        date.setDate(date.getDate() + 1);
    }

    // Iterate through the weeks of the month
    while (date.getMonth() === month) {
        const sunday = new Date(date);
        const saturday = new Date(date);
        saturday.setDate(date.getDate() + 6);
        weeks.push({
            sunday: `${(new Date(year,sunday.getMonth(),1)).toLocaleString('default', {month:'long'}).slice(0,3)},${sunday.getDate()}${getDaySuffix(sunday.getDate())}`,
            saturday: `${(new Date(year,saturday.getMonth(),1)).toLocaleString('default', {month:'long'}).slice(0,3)},${saturday.getDate()}${getDaySuffix(saturday.getDate())}`,
            epoch: sunday
        });
        date.setDate(date.getDate() + 7);
    }
    
    return weeks;
};

export function getDatesOfWeek(epoch){
    let dates = []
    let date = new Date(epoch)
    for(let i=0;i<7;i++){
        dates.push(`${date.getFullYear()}-${(new Date(date.getFullYear(),date.getMonth(),1)).toLocaleString('default', {month:'long'})}-${date.getDate()}`)
        date.setDate(date.getDate()+1)
    }
    return dates
}

export function getDatesInRange(start,end){
    let monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    let startDate = new Date(start[0], start[1], start[2]);
    let endDate = new Date(end[0], end[1], end[2]);

    let dates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
    let year = currentDate.getFullYear();
    let monthName = monthNames[currentDate.getMonth()];
    let day = currentDate.getDate();
    let dateString = `${year}-${monthName}-${day}`;
    dates.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

export function getMonthName(month){
    return ['January','February','March','April','May','June','July','August','September','October','November','December'][month]
}

export function CalenderRange({control, DateRef}){
    let [from, setFrom] = useState('')
    let [to, setTo] = useState('')

    let submit = (e)=>{
        e.preventDefault();
        DateRef.current = {from,to}
        control('')
    }

    return(
        <div className="bg-white rounded-lg md:min-w-1/2 p-2 overflow-hidden">
            <div className="flex border-b-2 py-4 justify-between">
                <h6>Custom Date</h6>
            </div>
            <div className="flex flex-col md:flex-row my-5 gap-3">
                <input className="py-2 px-1 rounded-md" type="date" name="" value={from} onChange={e=>setFrom(e.target.value)} placeholder="From" id="" />
                <input className="py-2 px-1 rounded-md" type="date" name="" value={to} onChange={e=>setTo(e.target.value)} placeholder="To" id="" />
            </div>
            <div className="flex items-end gap-5">
                <button className="py-2 font-semibold w-fit px-2 rounded-md bg-primary text-white" onClick={e=>submit(e)}>Apply Dates</button>
                <button className="py-2 font-semibold" onClick={e=>control('')}>Cancel</button>
            </div>
        </div>
    )
}

export default function Calender({date}) {
    let [calender, setCalender] = date

    let firstDay = (new Date(calender[0], calender[1])).getDay();//index of first day of month, sunday at index 0
    let daysInMonth = 32 - new Date(calender[0],calender[1],32).getDate();//jan at index 0

    let selectDate = (e)=>{
        e.preventDefault()
        calender[2] = e.target.value;
        setCalender([calender[0],calender[1],calender[2]]);
    }
    let changeMonth = (e,operand)=>{
        e.preventDefault();
        calender[1]+=operand;
        if(calender[1]==-1){
            calender[0]-=1;
            calender[1]=11;
        }
        if(calender[1]==12){
            calender[0]+=1;
            calender[1]=0;
        }
        setCalender([calender[0],calender[1],calender[2]]);
    }

    return (
        <div className="md:p-8 p-5 w-full h-full rounded-t overflow-y-hidden">
            <div className="flex justify-around">
                <button onClick={e => changeMonth(e, -1)} aria-label="calendar backward" className="hover:scale-105">
                    <span className="icon-[f7--chevron-left] w-6 h-6"/>
                </button>
                <div className="focus:outline-none text-lg font-bold">
                    {(new Date(calender[0], calender[1], 1)).toLocaleString('default', { month: 'long' })} {calender[0]}
                </div>
                <button onClick={e => changeMonth(e, 1)} aria-label="calendar forward" className="hover:scale-105 ml-3">
                    <span className="icon-[f7--chevron-right] w-6 h-6"/>
                </button>
            </div>

            {/* Calender Grid */}
            <div className="pt-6 grid grid-cols-7 h-full grid-rows-[auto]">
                {/* Days of the week */}
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, dayIndex) => (
                    <div key={dayIndex} className="flex justify-center items-center font-semibold text-center">{day}</div>
                ))}

                {[...Array(daysInMonth)].map((_, dayIndex) => {
                    let dayNumber = dayIndex + 1;
                    return (
                        <div key={dayNumber} className={`flex justify-center items-center hover:bg-secondary hover:text-white ${dayNumber === calender[2] ? 'bg-primary text-white' : ''}`}>
                            <button onClick={e => selectDate(e)} value={dayNumber} className="focus:outline-none w-8 h-8 flex items-center justify-center">
                                {dayNumber}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}