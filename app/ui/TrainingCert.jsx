import { Berkshire_Swash, Dancing_Script } from 'next/font/google';
import {forwardRef, useState, useEffect} from 'react';
import QRCode from 'qrcode'

const berkshire = Berkshire_Swash({subsets: ['latin-ext'], weight:'400', style:'normal'});
const dancing = Dancing_Script({weight:'600', subsets:['latin'], style:'normal'})

const TrainingCert = forwardRef((props, ref) => {
    const [qrCodeURL, setQrCodeURL] = useState('');  

    useEffect(() => {
        QRCode.toDataURL(`https://portal.eik.co.ke/verify?id=${1234}&training=${1}`)
            .then(url => {
                setQrCodeURL(url);
            })
            .catch(err => console.error(err));
    }, []);

    return(
        <>
        <style type="text/css" media="print">
        {`
            @page { 
            size: 1045px 740px;
            }
        `}
        </style>
        <div ref={ref} id="certificate" className={`bg-training bg-cover w-[1045px] h-[740px] relative`}>
            <p className={` text-6xl text-center text-secondary w-full absolute top-[360px] ${dancing.className}`}>Samson Mongare</p>
            <p className='text-center absolute top-[440px] left-[120px] w-3/4'>
            For attending the EIK Webinar on Developing Quality Environment Audit Report
            On 31st January 2024. Your Continuous Professional Developments Points are Two (2) Units.
            </p>
            <p className='absolute bottom-[105px] text-lg w-full text-center'>Date 31st January 2024</p>
            <p className='text-xl absolute bottom-[30px] left-[170px]'>EIK/01/24/1234</p>
            <img className='absolute bottom-20 right-24 scale-75' src={qrCodeURL} alt="QR Code" />
        </div>
        </>
    )
});
TrainingCert.displayName = 'TrainingCert';

export default TrainingCert;