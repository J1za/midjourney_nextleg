import React, { useState } from 'react';
import { TNLTypes } from 'tnl-midjourney-api';
import { tnl } from '@/services/core/nextLeg';
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

function MyButton({ btnText, buttonMessageId, content }: Props) {
    const { uid } = useGetUser();
    const toast = useToast();
    const { thlInfo: { isLoadingButtonPrompt } } = useTypedSelector(state => state);
    const { setLoadingButtonPrompt, setLoadingPrompt, setNewRequest } = useActions();
    const [btnIdLoading, setBtnIdLoading] = useState<string>();
    const [btnTextLoading, setBtnTextLoading] = useState<string>();

    const handleClick = async () => {
        setBtnIdLoading(buttonMessageId);
        setBtnTextLoading(btnText);
        setLoadingButtonPrompt(true);
        try {
            const response = await tnl.button(btnText, buttonMessageId, uid)
            db.setDocument('queue', response.messageId, {
                prompt: content,
                id: response.messageId
            })
            setNewRequest({ prompt: content, messageId: response.messageId })
        } catch (e: any) {
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
        <>
            <Button
                colorScheme='blue'
                size='sm'
                onClick={handleClick}
                disabled={isLoadingButtonPrompt}
            >
                {isLoadingButtonPrompt && btnIdLoading == buttonMessageId && btnTextLoading == btnText ? 'Loading...' : btnText}
            </Button>
            {isLoadingButtonPrompt && btnIdLoading == buttonMessageId && btnTextLoading == btnText && <Loading />}
        </>
    );
}
export default MyButton;
