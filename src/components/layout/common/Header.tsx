import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  logout,
} from '@/firebase';
import { useRouter } from 'next/router'

import { Container, Box, Button } from '@chakra-ui/react';
import { FiLogIn } from "react-icons/fi";
import { AiOutlineRollback } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

function Header() {
  const [user, loading] = useAuthState(auth);
  const { push, asPath } = useRouter();
  useEffect(() => {
    if (!user) return;
  }, [user, loading, push, asPath]);
  return (
    <Box>
      <Container maxW='1536px' padding={2}>
        <Box display='flex' justifyContent='flex-end'>
          {!user && !loading && !(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' rightIcon={<FiLogIn size={20} />} onClick={() => push('/login')}>
              Login
            </Button>
          }
          {(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' leftIcon={<AiOutlineRollback size={20} />} onClick={() => push('/')}>
              Back to Home
            </Button>
          }
          {user &&
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