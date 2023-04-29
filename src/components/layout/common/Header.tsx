import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
} from '@/firebase';
import { useRouter } from 'next/router'

import { Container, Box, Button } from '@chakra-ui/react';
import { FiLogIn } from "react-icons/fi";
import { AiOutlineRollback } from "react-icons/ai";

function Header() {
  const [user] = useAuthState(auth);
  const { push, asPath } = useRouter();
  return (
    <Box>
      <Container maxW='1536px' padding={2}>
        <Box display='flex' justifyContent='flex-end'>
          {!user && asPath == '/' &&
            <Button colorScheme='messenger' size='md' rightIcon={<FiLogIn size={20} />} onClick={() => push('/login')}>
              Login
            </Button>
          }
          {(asPath === '/login' || asPath === '/signup') &&
            <Button colorScheme='messenger' size='md' leftIcon={<AiOutlineRollback size={20} />} onClick={() => push('/')}>
              Back to Home
            </Button>
          }
        </Box>
      </Container >
    </Box >
  )
}

export default Header