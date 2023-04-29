'use client'; // this is a client component 👈🏽
import axios from 'axios';
import { db } from '../firebase';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import MyButton from '@/components/MyButton';
import Image from 'next/image';
import Loading from '@/components/Loading';
import BaseLayout from '@/components/layout/BaseLayout';

const AUTH_TOKEN = '55d62488-0bc3-4f89-92d6-5bfca0732740';
const endpoint = `https://api.thenextleg.io`;

export default function Home() {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };
  const [text, setText] = useState('');
  const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string, buttonMessageId?: string, buttons?: string[], content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

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
    setLoadingImage(false)
  }, [imgs]);

  const handleButtonAddText = (value: string) => {
    setText((text + value));
  };
  return (
    <BaseLayout>
      <div className='container flex flex-col items-center h-screen mx-auto mt-20 sm:mt-60'>
        <div className='w-full px-5 mx-auto sm:px-20'>
          <div className='relative'>
            <div>
              <label
                htmlFor='email'
                className='block text-lg font-medium leading-5'
              >
                Prompt
              </label>
              <div className='flex mt-2 space-x-2'>
                <input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className='block w-full px-4 border-0 rounded-md shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  placeholder='Enter your prompt here'
                />
                <button
                  className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
                  onClick={async () => {
                    setLoadingImage(true);
                    setLoading(true);
                    try {
                      let r = await axios.post(
                        `${endpoint}`,
                        {
                          cmd: 'imagine',
                          msg: text,
                        },
                        { headers },
                      );
                      setResponse(JSON.stringify(r.data, null, 2));
                    } catch (e: any) {
                      console.log(e);
                      setError(e.message);
                    }
                    setLoading(false);
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              <div className='flex gap-1 mt-1'>
                <button
                  className='px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700'
                  onClick={() => handleButtonAddText('--v 4')}
                >
                  --v 4
                </button>
                <button
                  className='px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700'
                  onClick={() => handleButtonAddText('--v 5')}
                >
                  --v 5
                </button>
                <button
                  className='px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700'
                  onClick={() => handleButtonAddText('--')}
                >
                  --
                </button>
              </div>
            </div>
            {/* <pre>Response Message: {response}</pre>
          Error: {error} */}
          </div>
        </div>
        <div className='p-2 mt-10 sm:p-0'>
          <div className='grid gap-4 sm:grid-cols-3'>
            {imgs.map(({ imgUrl, buttons, buttonMessageId, content }) => (
              <div key={buttonMessageId}>
                {content &&
                  <p> <span className='font-semibold'>{content}</span></p>
                }
                {
                  imgUrl &&
                  <Image
                    src={imgUrl}
                    className='w-full'
                    key={imgUrl}
                    alt='nothing'
                    width={400}
                    height={400}
                  />
                }

                {buttons &&
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {
                      buttons.filter(el => el !== 'V1' && el !== 'V2' && el !== 'V3' && el !== 'V4').map((btnText, idx) => (
                        <MyButton
                          key={idx}
                          btnText={btnText}
                          endpoint={endpoint}
                          buttonMessageId={buttonMessageId!}
                          headers={headers}
                          onClick={() => setLoadingImage(true)}
                        />
                      ))
                    }
                  </div>
                }

              </div>

            ))}
          </div>

        </div>
        {loadingImage && <Loading />}
      </div>
    </BaseLayout>
  );
}
