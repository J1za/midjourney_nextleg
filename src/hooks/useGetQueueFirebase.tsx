import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface IQueueFirebase {
    createdAt: any;
    id: string;
    prompt: string;
}

export const useGetQueueFirebase = () => {
    const [queue, setQueue] = useState<IQueueFirebase[]>([]);

    useEffect(() => {
        const imgsCollectionRef = collection(db, 'queue');
        const queryRef = query(imgsCollectionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(queryRef, snapshot => {
            let allQueue = snapshot.docs.map(
                doc => doc.data(),
            ) as IQueueFirebase[];
            setQueue(allQueue as IQueueFirebase[]);
        });

        return () => (
            unsubscribe()
        );
    }, []);
    return {
        queue
    };
};
