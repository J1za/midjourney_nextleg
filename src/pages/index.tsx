import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import MyButton from '@/components/MyButton';
import Image from 'next/image';
import BaseLayout from '@/components/layout/BaseLayout';
import { TNLTypes } from 'tnl-midjourney-api';
import InputPrompt from '@/components/InputPrompt';
import { useActions } from "@/hooks/useActions";

export default function Home() {
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


  return (
    <BaseLayout>
      <div className='container flex flex-col items-center h-screen mx-auto mt-20 sm:mt-60'>
        <div className='w-full px-2 mx-auto sm:px-0'>
          <InputPrompt />
        </div>
        <div className='p-2 mt-10 sm:p-0'>
          <div className='grid gap-4 sm:grid-cols-3'>
            {imgs.map(({ imgUrl, buttons, buttonMessageId, content }) => (
              imgUrl && <div key={buttonMessageId}>
                {content &&
                  <p> <span className='font-semibold'>{content}</span></p>
                }
                <Image
                  src={imgUrl}
                  className='w-full'
                  key={imgUrl}
                  alt='nothing'
                  width={400}
                  height={400}
                />

                {buttons &&
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {
                      buttons.filter(el => el !== 'V1' && el !== 'V2' && el !== 'V3' && el !== 'V4').map((btnText, idx) => (
                        <MyButton
                          key={idx}
                          btnText={btnText as TNLTypes.ButtonTypes}
                          buttonMessageId={buttonMessageId!}
                        />
                      ))
                    }
                  </div>
                }

              </div>

            ))}
          </div>

        </div>
      </div>
    </BaseLayout>
  );
}
