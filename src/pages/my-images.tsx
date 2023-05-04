import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useGetUser } from '@/hooks/useGetUser';
import Loading from '@/components/Loading';
import BaseLayout from '@/components/layout/BaseLayout';
import { Container } from '@chakra-ui/react';
import { useImagesUserFirebase } from '@/hooks/useImagesUserFirebase';
import Masonry from 'react-masonry-css'

function MyImages() {
    const { loading, uid } = useGetUser();
    const [isLoading, setIsLoading] = useState(true);
    const { push } = useRouter();
    const { imgs } = useImagesUserFirebase({ uid: uid! });
    console.log(imgs)
    useEffect(() => {
        if (!uid && !loading) {
            push('/')
        } else {
            setIsLoading(false)
        }
    }, [uid, push, loading]);
    if (isLoading) {
        return <Loading />
    }
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <BaseLayout>
            <Container maxW='1536px' padding={3} className='mt-10'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {imgs.length > 0 && imgs.map(({ imgUrl, buttons, buttonMessageId, content }) => (
                        imgUrl && <div key={buttonMessageId}>
                            {content && <p className='p-2'><span className='font-semibold'>{content}</span></p>}
                            <Image
                                src={imgUrl}
                                className='w-full'
                                key={imgUrl}
                                alt='nothing'
                                width={400}
                                height={400}
                            />
                        </div>

                    ))}
                </Masonry>
            </Container>
        </BaseLayout>
    )
}

export default MyImages