import React, { useState } from 'react';
import axios from 'axios';
import { TNLTypes } from 'tnl-midjourney-api';

type Props = {
    buttonMessageId: string;
    btnText: TNLTypes.ButtonTypes;
    onClick: any;
};

const AUTH_TOKEN = '55d62488-0bc3-4f89-92d6-5bfca0732740';
const endpoint = `https://api.thenextleg.io`;

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
};
export default function MyButton({ btnText, buttonMessageId, onClick }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        console.log(buttonMessageId)
        onClick();
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
