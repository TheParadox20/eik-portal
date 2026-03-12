'use client'
import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import useSWR from 'swr';
import Spinner from '@/app/ui/Spinner';
import { fetcher, postFile, putData } from "@/app/lib/data";
import File from "@/app/ui/File";

const defaultStyles = {
    name: {
        color: '#1083ac',
        fontFamily: 'DancingScript',
        fontSize: '60px',
        position: 'absolute',
        top: '280px',
    },
    number: {
        fontSize: '20px',
        lineHeight: '28px',
        position: 'absolute',
        bottom: '30px',
        left: '150px',
    },
    info: {
        width: '75%',
        textAlign: 'center',
        position: 'absolute',
        top: '420px',
        left: '120px',
    },
    date: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: '105px',
        fontSize: '18px',
        lineHeight: '28px',
    },
    qrData: {
        position: 'absolute',
        bottom: '80px',
        right: '96px',
    },
};

export default function Certificate(){
    const router = useRouter();
    const {action: act} = useParams();
    let searchParams = useSearchParams();
    let id = searchParams.get('id');
    let iframeRef = useRef(null);
    let [files, setFiles] = useState([]);
    let [className, setClassName] = useState(defaultStyles);

    const { data: training, error, isLoading } = useSWR([`/certificate-views/training/${id}`, {}], fetcher);

    useEffect(() => {
        if (training && training.certificate_view) {
            const cv = training.certificate_view;
            const parsed = {};
            for (const key of ['name', 'number', 'info', 'date', 'qrData']) {
                try {
                    parsed[key] = typeof cv[key] === 'string' ? JSON.parse(cv[key]) : cv[key];
                } catch {
                    parsed[key] = defaultStyles[key];
                }
            }
            setClassName(parsed);
        }
    }, [training]);

    const submit = (e) => {
        e.preventDefault();
        const payload = Object.keys(className).reduce((acc, key) => {
            acc[key] = typeof className[key] === 'object' ? JSON.stringify(className[key]) : className[key];
            return acc;
        }, {});

        if (training?.certificate_view?.id && files.length === 0) {
            // Update existing certificate view (no new file)
            putData(
                (response) => {
                    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
                },
                payload,
                `/certificate-views/${training.certificate_view.id}`
            );
        } else {
            // Create new certificate view with file upload
            postFile(
                (response) => {
                    if (response?.success && response?.data?.id) {
                        // Link the new certificate view to the training
                        putData(
                            () => {
                                if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
                            },
                            { certificate_view_id: response.data.id },
                            `/certificate-views/training/${id}/link`
                        );
                    }
                },
                files[0],
                payload,
                `/certificate-views`
            );
        }
    }

    if (isLoading) return <Spinner/>;

    return(
        <>
        <h5 className="text-lg font-semibold mb-4">Certificate Generator</h5>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
            {/* Preview */}
            <div className='flex-1 bg-gray-200/70 p-4 rounded-lg'>
                <iframe
                    ref={iframeRef}
                    className='w-full h-[740px]'
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/view/certificates/training/${id}`}
                />
            </div>

            {/* Controls */}
            <div className="w-full lg:w-[400px] bg-white p-4 rounded-lg border max-h-[80vh] overflow-y-auto">
                <h6 className="font-semibold mb-4">Certificate Properties</h6>

                {Object.keys(className).map((roleKey) => (
                    <div key={roleKey} className="mb-4">
                        <div className="font-bold text-sm mb-2 capitalize border-b pb-1">{roleKey}</div>
                        <div className="grid grid-cols-1 gap-2">
                            {className[roleKey] && typeof className[roleKey] === 'object' && Object.keys(className[roleKey]).map((propKey) => (
                                <div key={propKey} className="flex items-center gap-2">
                                    <label className="text-xs w-28 capitalize" htmlFor={`input-${roleKey}-${propKey}`}>{propKey}</label>
                                    <input
                                        id={`input-${roleKey}-${propKey}`}
                                        type="text"
                                        className="border px-2 py-1 rounded text-xs flex-1"
                                        value={className[roleKey][propKey] ?? ""}
                                        onChange={e => {
                                            setClassName(prev => ({
                                                ...prev,
                                                [roleKey]: {
                                                    ...prev[roleKey],
                                                    [propKey]: e.target.value
                                                }
                                            }));
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="my-4">
                    <div className="font-bold text-sm mb-2 border-b pb-1">Background Image</div>
                    <File files={files} setFiles={setFiles} type={'image'}/>
                </div>

                <button
                    className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary mt-4"
                    onClick={submit}
                >
                    Update Certificate
                </button>
            </div>
        </div>

        <section className="flex justify-end my-5">
            <button
                className="bg-secondary text-white px-4 py-2 rounded-md"
                onClick={e=>router.push(`/trainings/${act}/Publish?id=${id}`)}
            >
                Publish
            </button>
        </section>
        </>
    )
}
