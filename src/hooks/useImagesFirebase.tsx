import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useActions } from "@/hooks/useActions";
export const useImagesFirebase = () => {
    const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string, buttonMessageId?: string, buttons?: string[], content: string }[]>([]);
    const { setLoadingPrompt, setLoadingButtonPrompt } = useActions();

    useEffect(() => {
        const imgsCollectionRef = collection(db, 'imgs');
        const queryRef = query(imgsCollectionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(queryRef, snapshot => {
            let allImgs: {
                createdAt: any;
                imgUrl: string;
                buttonMessageId?: string;
                buttons?: string[]
            }[] = snapshot.docs.map(
                doc => doc.data(),
            ) as any;;
            setImgs(allImgs as any);
        });

        return () => (
            unsubscribe()
        );
    }, []);
    useEffect(() => {
        setLoadingPrompt(false)
        setLoadingButtonPrompt(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgs]);
    return {
        imgs
    };
};
