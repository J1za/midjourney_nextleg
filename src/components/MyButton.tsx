import React, { useState } from 'react';
import { AUTH_TOKEN } from '@/services/core/nextLeg';
import axios from 'axios';
import { TNLTypes } from 'tnl-midjourney-api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import Loading from '@/components/Loading';
import { useToast, Button } from '@chakra-ui/react';
import { useGetUser } from '@/hooks/useGetUser';
import db from '@/services/core/db.service';

type Props = {
    buttonMessageId: string;
    btnText: TNLTypes.ButtonTypes;
    content: string;
};

const endpoint = `https://api.thenextleg.io`;

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
};
function MyButton({ btnText, buttonMessageId, content }: Props) {
    const { uid } = useGetUser();
    const toast = useToast();
    const { thlInfo: { isLoadingButtonPrompt } } = useTypedSelector(state => state);
    const { setLoadingButtonPrompt, setLoadingPrompt, setNewRequest } = useActions();
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
                    ref: uid ?? '',
                },
                { headers },
            );
            setResponse(JSON.stringify(r.data, null, 2));
            db.setDocument('queue', r.data.messageId, {
                prompt: content,
                id: r.data.messageId
            })
            setNewRequest({ prompt: content, messageId: r.data.messageId })
        } catch (e: any) {
            setError(e.message);
            setLoadingButtonPrompt(false);
            setLoadingPrompt(false);
            toast({
                position: 'top',
                description: e.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div>
            <Button
                colorScheme='blue'
                size='sm'
                onClick={handleClick}
                disabled={isLoadingButtonPrompt}
            >
                {isLoadingButtonPrompt && btnIdLoading == buttonMessageId && btnTextLoading == btnText ? 'Loading...' : btnText}
            </Button>
            {isLoadingButtonPrompt && btnIdLoading == buttonMessageId && btnTextLoading == btnText && <Loading />}
        </div>
    );
}
export default MyButton;
