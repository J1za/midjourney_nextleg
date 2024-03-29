import MyButton from '@/components/MyButton';
import Image from 'next/image';
import BaseLayout from '@/components/layout/BaseLayout';
import { TNLTypes } from 'tnl-midjourney-api';
import InputPrompt from '@/components/InputPrompt';
import ErrorMassage from '@/components/ErrorMassage';
import { useImagesFirebase } from '@/hooks/useImagesFirebase';
import { Button, Link } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

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
      <Container maxW='1536px' padding={3} className='h-screen mx-auto mt-10 sm:mt-20'>
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
                  alt='nothing'
                  width={400}
                  height={400}
                  priority={true}
                />

                {buttons && (
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {buttons
                      .map((btnText, idx) => (
                        btnText == 'Learn More'
                          ?
                          <Button key={idx} colorScheme='blue'>{btnText}</Button>
                          :
                          btnText == 'Web' ? <Button key={idx} size='sm' colorScheme='blue'><Link href={imgUrl} isExternal>{btnText}</Link></Button>
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
      </Container>
      <ErrorMassage />
    </BaseLayout>
  );
}
