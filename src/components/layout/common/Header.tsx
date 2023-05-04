import React, { useEffect } from 'react'
import Link from 'next/link';
import {
  logout,
} from '@/firebase';
import { useRouter } from 'next/router'

import { Container, Box, Button } from '@chakra-ui/react';
import { FiLogIn } from "react-icons/fi";
import { AiOutlineRollback, AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { useGetUser } from '@/hooks/useGetUser';

function Header() {
  const { loading, uid } = useGetUser();
  const { push, asPath } = useRouter();
  useEffect(() => {
    if (!uid) return;
  }, [uid, loading, push, asPath]);
  return (
    <Box>
      <Container maxW='1536px' padding={3}>
        <Box className='flex gap-3'>
          {asPath !== '/' &&
            <Link href='/'>
              <Button leftIcon={<AiOutlineHome size={20} />} colorScheme='teal' size='md'>
                Go Home
              </Button>
            </Link>
          }
          {uid &&
            <Link href='/my-images'>
              <Button leftIcon={<BsImages size={20} />} colorScheme='teal' size='md' variant={asPath === '/my-images' ? 'outline' : 'solid'}>
                My images
              </Button>
            </Link>
          }
          {!uid && !loading && !(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' marginLeft='auto' rightIcon={<FiLogIn size={20} />} onClick={() => push('/login')}>
              Login
            </Button>
          }
          {(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' marginLeft='auto' leftIcon={<AiOutlineRollback size={20} />} onClick={() => push('/')}>
              Back to Home
            </Button>
          }
          {uid &&
            <Button colorScheme='messenger' size='md' marginLeft='auto' rightIcon={<BiLogOut size={20} />} onClick={() => {
              logout();
            }} >
              Logout
            </Button>
          }
        </Box>
      </Container >
    </Box >
  )
}

export default Header