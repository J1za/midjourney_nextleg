import React, { useState } from 'react';
import axios from 'axios';
import { TNLTypes } from 'tnl-midjourney-api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import Loading from '@/components/Loading';

type Props = {
    buttonMessageId: string;
    btnText: TNLTypes.ButtonTypes;
};

const AUTH_TOKEN = '55d62488-0bc3-4f89-92d6-5bfca0732740';
const endpoint = `https://api.thenextleg.io`;

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
};
export default function MyButton({ btnText, buttonMessageId }: Props) {
    const { thlInfo: { isLoadingButtonPrompt } } = useTypedSelector(state => state);
    const { setLoadingButtonPrompt } = useActions();
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState(null);
    const [btnIdLoading, setBtnIdLoading] = useState<string>();
    const [btnTextLoading, setBtnTextLoading] = useState<string>();

    const handleClick = async () => {
        setBtnIdLoading(buttonMessageId);
        setBtnTextLoading(btnText);
        setLoadingButtonPrompt(true);
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
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div>
            <button
                className='px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
                onClick={handleClick}
                disabled={isLoadingButtonPrompt}
            >
                {isLoadingButtonPrompt && btnIdLoading == buttonMessageId && btnTextLoading == btnText ? 'Loading...' : btnText}
            </button>
            {isLoadingButtonPrompt && btnIdLoading == buttonMessageId && btnTextLoading == btnText && <Loading />}
        </div>
    );
}
