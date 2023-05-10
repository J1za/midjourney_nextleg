import { useEffect, useState } from 'react'
import { useGetListQueueQuery } from '@/store/api/queueImage.api';
import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
interface IQueueOrder {
    messageId: string
    prompt: string
}

function QueueOrder({ messageId, prompt }: IQueueOrder) {
    const [progress, setProgress] = useState<number | null>(0);
    const { data } = useGetListQueueQuery({ messageId: messageId }, {
        pollingInterval: messageId && progress !== 100 ? 1000 : 0
    });
    useEffect(() => {
        if (data) {
            setProgress(data.progress);
        }
        if (data.progress === 'incomplete') {
            deleteDoc(doc(db, 'queue', messageId))
        }
    }, [data, messageId]);

    if (!messageId) {
        return null;
    }
    return (
        <p className='inline text-[15px]' style={{ fontFamily: 'monospace' }}>{prompt} <span className='underline underline-offset-2'>{progress}%</span></p>
    )
}

export default QueueOrder