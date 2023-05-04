import { useEffect, useState, memo } from 'react'
import { useGetListQueueQuery } from '@/store/api/queueImage.api';

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
    }, [data]);

    if (!messageId) {
        return null;
    }
    return (
        <p className='inline text-[15px]' style={{ fontFamily: 'monospace' }}>{prompt} <span className='underline underline-offset-2'>{progress}%</span></p>
    )
}

export default QueueOrder