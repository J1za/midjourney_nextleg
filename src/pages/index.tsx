'use client'; // this is a client component 👈🏽
import axios from 'axios';
import { firestore } from '../db';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import MyButton from '@/components/MyButton';

const AUTH_TOKEN = '55d62488-0bc3-4f89-92d6-5bfca0732740';
const endpoint = `https://api.thenextleg.io`;

export default function Home() {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };
  const [text, setText] = useState('');
  const [imgs, setImgs] = useState<{ createdAt: any; imgUrl: string, buttonMessageId?: string, buttons?: string[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const imgsCollectionRef = collection(firestore, 'imgs');
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
      setImgs(allImgs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='container flex flex-col items-center h-screen mx-auto mt-60'>
      <div className='w-full px-20 mx-auto'>
        <div className='relative'>
          {/* tailwindui.com */}
          {/* <div className='fixed w-3/4 left-2/4 translate-x-[-50%] top-60'> */}
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
                  console.log(`Submitting my prompt: ${text}`);
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

                    console.log(r.data);
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
          </div>
          {/* <pre>Response Message: {response}</pre>
          Error: {error} */}
        </div>
      </div>
      <div>
        <h1 className='py-8 text-4xl text-center'>These are your images!</h1>
        <div className='grid grid-cols-3 gap-4'>
          {imgs.map(({ imgUrl, buttons, buttonMessageId }) => (
            <div key={buttonMessageId}>
              {
                imgUrl &&
                <img
                  src={imgUrl}
                  className='w-full'
                  key={imgUrl}
                  alt='nothing'
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
  );
}
