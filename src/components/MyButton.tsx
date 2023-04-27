import React, { useState } from 'react';
import axios from 'axios';

type Props = {
    endpoint: string;
    headers: Record<string, string>;
    buttonMessageId: string;
    btnText: string;
};


export default function MyButton({ btnText, endpoint, buttonMessageId, headers }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const r = await axios.post(
                `${endpoint}`,
                {
                    button: btnText,
                    buttonMessageId: buttonMessageId,
                },
                { headers },
            );
            setResponse(JSON.stringify(r.data, null, 2));
            setTimeout(() => {
                setIsLoading(false);
            }, 2000)
        } catch (e: any) {
            console.log(e);
            setError(e.message);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000)
        }
    };

    return (
        <div>
            <button
                className='px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
                onClick={handleClick}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : btnText}
            </button>
            {/* {response && <pre>{response}</pre>}
            {error && <pre>{error}</pre>} */}
        </div>
    );
}
