import { Berkshire_Swash } from 'next/font/google';
import {forwardRef, useState, useEffect} from 'react';
import QRCode from 'qrcode'

const berkshire = Berkshire_Swash({subsets: ['latin-ext'], weight:'400', style:'normal'});

let checkPractising = (category) => {
    if (category == 'Fellow' || category == 'Lead' || category == 'Associate' || category == 'Firms') return `practicing ${category} member`
    else return `non-practicing ${category} member`
}

const Certificate = forwardRef((props, ref) => {
    const [qrCodeURL, setQrCodeURL] = useState('');  

    useEffect(() => {
        QRCode.toDataURL(`https://portal.eik.co.ke/verify?id=${props.data.number}`)
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
        <div ref={ref} id="certificate" className={`bg-certificate w-[1045px] h-[740px] relative`}>
            <div className='absolute top-[270px] w-[100%]'>
                <p className='text-center text-lg my-2'>This is to certify that</p>
                <p className='text-center text-lg my-2'>{props.data.user.name.toUpperCase()}</p>
                <p className='text-center text-lg my-2'>Member No: {props.data.number}</p>
                <p className='w-2/3 mx-auto mt-3 px-8 text-center'>{`Is a ${checkPractising(props.data.category)} of Environment Institute of Kenya An Institute Founded in the year 2014 to extend and disseminate Environment knowledge and promote the practical application for public good`}</p>
            </div>
            <img className='w-12 h-12 absolute bottom-28 right-[474px]' src={qrCodeURL} alt="QR Code" />
            <p className='absolute bottom-[105px] text-lg right-60'>{props.data.verified}</p>
        </div>
        </>
    )
});
Certificate.displayName = 'Certificate';

export default Certificate;