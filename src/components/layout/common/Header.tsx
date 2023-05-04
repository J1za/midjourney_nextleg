import React, { useEffect } from 'react'
import {
  logout,
} from '@/firebase';
import { useRouter } from 'next/router'

import { Container, Box, Button } from '@chakra-ui/react';
import { FiLogIn } from "react-icons/fi";
import { AiOutlineRollback } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useGetUser } from '@/hooks/useGetUser';

function Header() {
  const { loading, uid } = useGetUser();
  const { push, asPath } = useRouter();
  useEffect(() => {
    if (!uid) return;
  }, [uid, loading, push, asPath]);
  return (
    <Box>
      <Container maxW='1536px' padding={2}>
        <Box display='flex' justifyContent='flex-end'>
          {!uid && !loading && !(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' rightIcon={<FiLogIn size={20} />} onClick={() => push('/login')}>
              Login
            </Button>
          }
          {(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' leftIcon={<AiOutlineRollback size={20} />} onClick={() => push('/')}>
              Back to Home
            </Button>
          }
          {uid &&
            <Button colorScheme='messenger' size='md' rightIcon={<BiLogOut size={20} />} onClick={() => {
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