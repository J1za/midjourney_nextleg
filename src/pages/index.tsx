import MyButton from '@/components/MyButton';
import Image from 'next/image';
import BaseLayout from '@/components/layout/BaseLayout';
import { TNLTypes } from 'tnl-midjourney-api';
import InputPrompt from '@/components/InputPrompt';
import ErrorMassage from '@/components/ErrorMassage';
import { useImagesFirebase } from '@/hooks/useImagesFirebase';
import { Button, Link } from '@chakra-ui/react';

const blockAdvertising = {
  imgUrl: '/images/Product-Advertising.jpg',
  buttonMessageId: 'ad-block-button',
  content: 'Check out our new product advertising!',
  buttons: ['Learn More']
};

export default function Home() {
  const { imgs } = useImagesFirebase();
  const allImgs = [...imgs];
  imgs && allImgs.splice(4, 0, blockAdvertising as any);
  return (
    <BaseLayout>
      <div className='container flex flex-col items-center h-screen mx-auto mt-20 sm:mt-60'>
        <div className='w-full px-2 mx-auto sm:px-0'>
          <InputPrompt />
        </div>
        <div className='w-full p-2 mt-10 sm:p-0'>
          <div className='grid gap-4 sm:grid-cols-3'>
            {imgs.length > 0 && allImgs.map(({ imgUrl, buttons, buttonMessageId, content }) => (

              imgUrl && <div key={buttonMessageId} className='flex flex-col justify-between h-full'>
                {content && <p><span className='font-semibold'>{content}</span></p>}
                <Image
                  src={imgUrl}
                  className='w-full'
                  key={imgUrl}
                  alt='nothing'
                  width={400}
                  height={400}
                />

                {buttons && (
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {buttons
                      .map((btnText, idx) => (
                        btnText == 'Learn More'
                          ?
                          <Button key={idx} colorScheme='blue'>{btnText}</Button>
                          :
                          btnText == 'Web' ? <Link href={imgUrl} isExternal><Button key={idx} size='sm' colorScheme='blue'>{btnText}</Button></Link>
                            :
                            <MyButton
                              content={content}
                              key={idx}
                              btnText={btnText as TNLTypes.ButtonTypes}
                              buttonMessageId={buttonMessageId!}
                            />
                      ))}
                  </div>
                )}

              </div>

            ))}
          </div>

        </div>
      </div>
      <ErrorMassage />
    </BaseLayout>
  );
}
