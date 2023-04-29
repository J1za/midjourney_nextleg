import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router'
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import {
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsGoogle } from "react-icons/bs";

function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.push('/');
  }, [user, loading, router]);
  return (
    <Flex direction="column" m="2">
      <form
        onSubmit={e => {
          e.preventDefault();
          register();
        }}
      >
        <FormControl isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            variant='filled'
            bg='gray.50'
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            autoComplete="username"
          />
        </FormControl>
        <FormControl isRequired marginTop={3}>
          <FormLabel>Email</FormLabel>
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
          <FormLabel>Password</FormLabel>
          <Input
            variant='filled'
            bg='gray.50'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            minLength="6"
          />
        </FormControl>
        <Button w="100%" my="2" type="submit">
          Register
        </Button>
      </form>
      <Button colorScheme='messenger' onClick={signInWithGoogle} rightIcon={<BsGoogle size={20} />}>
        Register with Google
      </Button>
      <Box marginTop={1}>
        Already have an account? <Link href="/login">Login</Link> now.
      </Box>
    </Flex>
  );
}
export default Register;
