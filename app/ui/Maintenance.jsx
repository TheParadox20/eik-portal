'use client'
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const DotLottieReact = dynamic(
  () =>
      import('@lottiefiles/dotlottie-react').then(
          (mod) => mod.DotLottieReact
      ),
  {
      ssr: false,
  }
)

export function Countdown(Props){
    let daysRef = useRef();
    let hourRef = useRef();
    let minuteRef = useRef();
    let secondRef = useRef();
    let countDownDate = new Date(Props.target).getTime();

    useEffect(()=>{
        setInterval(()=>{
            let now = new Date().getTime();
            let duration = countDownDate-now;
            daysRef.current.innerText = Math.floor(duration / (1000 * 60 * 60 * 24));
            hourRef.current.innerText = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minuteRef.current.innerText = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            secondRef.current.innerText = Math.floor((duration % (1000 * 60)) / 1000);
        },1000)
    },[])
    return(
        <div className="countdown flex justify-center items-center font-semibold md:text-4xl mx-auto uppercase">
            <div className=" text-primary-base">
                <div className="md:text-6xl text-center" ref={daysRef}></div>
                <div className=''>Days</div>
            </div>
            <div className=" text-2xl md:text-4xl mx-2">:</div>
            <div className="text-primary-base">
                <div className="md:text-6xl text-center" ref={hourRef}></div>
                <div className=''>Hours</div>
            </div>
            <div className=" text-2xl md:text-4xl mx-2">:</div>
            <div className="text-primary-base">
                <div className="md:text-6xl text-center text-primary" ref={minuteRef}></div>
                <div className='text-secondary'>minutes</div>
            </div>
            <div className="text-2xl md:text-4xl mx-2">:</div>
            <div className="text-secondary-base">
                <div className="md:text-6xl text-center text-primary" ref={secondRef}></div>
                <div className='text-secondary'>seconds</div>
            </div>
        </div>
    )
}

export default function Maintenance({duration}) {
  return (
    <main className='flex flex-col h-[100vh] items-center justify-center'>
        <h1 className='text-4xl mb-3 font-semibold'>Under Maintenance</h1>
      <div className='w-2/3 md:w-1/3 mb-8'>
        <DotLottieReact
          src="/animations/building.lottie"
          loop
          autoplay
        />
      </div>
      <Countdown target={duration}/>
      <button className='bg-primary-base text-white mt-9 py-3 rounded-full w-44 hover:scale-105 hover:bg-secondary-base hover:font-bold'>Join Waitlist</button>
    </main>
  );
}
