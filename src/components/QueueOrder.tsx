import { useEffect, useState } from 'react'
import { useGetListQueueQuery } from '@/store/api/queueImage.api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { writeStorage } from '@rehooks/local-storage';

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
            console.log(data)
            setProgress(data.progress);
            // const oldStorage: Array<any> = JSON.parse(localStorage.getItem('queue')!);
            // const queueData = { progress: progress, prompt: newRequest.prompt, messageId: newRequest.messageId };
            // writeStorage('queue', [...oldStorage, queueData]);
            // console.log(JSON.parse(localStorage.getItem('queue')!))
        }
    }, [data]);
    useEffect(() => {
        // const queueJson = localStorage.getItem('queue') ?? '[]';
        // const queue = queueJson !== '' ? JSON.parse(queueJson) : [];
        // const queueIndex = queue.findIndex((item: any) => item.progress === 100);
        // if (queueIndex >= 0) {
        //     queue.splice(queueIndex, 1);
        //     localStorage.setItem('queue', queue);
        // }
    }, []);

    if (!messageId) {
        return null;
    }
    return (
        <p className='inline text-[15px]' style={{ fontFamily: 'monospace' }}>{prompt} <span className='underline underline-offset-2'>{progress ?? 0}%</span></p>
    )
}

export default QueueOrder