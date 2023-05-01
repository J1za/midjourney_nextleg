import { useEffect, useState } from 'react';
import { useActions } from "@/hooks/useActions";
import { db } from '../firebase';
import { collection, onSnapshot, query, doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
function ErrorMassage() {
    const toast = useToast();
    const [errorMassage, setErrorMassage] = useState<string>('');
    const { setLoadingPrompt, setLoadingButtonPrompt } = useActions();

    useEffect(() => {
        const errorCollectionRef = collection(db, 'errorMsg');
        const queryRef = query(errorCollectionRef);
        const unsubscribe = onSnapshot(queryRef, snapshot => {
            let error: string = snapshot.docs.map(
                doc => doc.data().error,
            ) as any;
            setErrorMassage(error);
        });

        return () => (
            unsubscribe()
        );
    }, []);
    useEffect(() => {
        if (errorMassage?.length > 0) {
            toast({
                position: 'top',
                description: errorMassage,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            deleteDoc(doc(db, "errorMsg", "error"));
            setLoadingPrompt(false);
            setLoadingButtonPrompt(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMassage]);
    return (<></>);
}

export default ErrorMassage