import MyButton from '@/components/MyButton';
import Image from 'next/image';
import BaseLayout from '@/components/layout/BaseLayout';
import { TNLTypes } from 'tnl-midjourney-api';
import InputPrompt from '@/components/InputPrompt';
import ErrorMassage from '@/components/ErrorMassage';
import { useImagesFirebase } from '@/hooks/useImagesFirebase';

export default function Home() {
  const { imgs } = useImagesFirebase();
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
      <ErrorMassage />
    </BaseLayout>
  );
}
