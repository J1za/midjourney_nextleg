import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Button,
  Flex,
  Input,
  Box,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsGoogle } from "react-icons/bs";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) router.push('/');
  }, [user, loading, router]);
  return (
    <Flex direction="column" m="2" width='100%'>
      <form
        onSubmit={e => {
          e.preventDefault();
          logInWithEmailAndPassword(email, password);
        }}
      >
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            variant='filled'
            bg='gray.50'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail Address"
            type="email"
            autoComplete="email"
          />
        </FormControl>
        <FormControl isRequired marginTop={3}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            variant='filled'
            bg='gray.50'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button w="100%" my="2" type="submit">
          Login
        </Button>
      </form>
      <Button colorScheme='messenger' onClick={signInWithGoogle} rightIcon={<BsGoogle size={20} />}>
        Login with Google
      </Button>
      {/* <Link to="/reset-password">Forgot Password</Link> */}
      <Box marginTop={1}>
        Do not have an account? <Link href="/signup">Register</Link> now.
      </Box>
    </Flex>
  );
}

export default Login;
