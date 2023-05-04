import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useActions } from "@/hooks/useActions";

interface IImagesUserFirebase {
    uid: string
}

export const useImagesUserFirebase = ({ uid }: IImagesUserFirebase) => {
    const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string, buttonMessageId?: string, buttons?: string[], content: string }[]>([]);
    const { setLoadingPrompt, setLoadingButtonPrompt } = useActions();
    useEffect(() => {
        if (uid) {
            const docRef = doc(db, "users", uid);
            const colRef = collection(docRef, "imgs");
            const queryRef = query(colRef, orderBy('createdAt', 'desc'));
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
        }

    }, [uid]);
    useEffect(() => {
        setLoadingPrompt(false)
        setLoadingButtonPrompt(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgs]);
    return {
        imgs
    };
};
