import React from 'react';
import Login from '../components/Login/Login';
import BaseLayout from '@/components/layout/BaseLayout';
import {
    Box
} from '@chakra-ui/react';

function LoginPage() {
    return (
        <BaseLayout>
            <Box position='absolute' top='50%' left='50%' width='md' transform='translate(-50%, -50%)'>
                <Login />
            </Box>
        </BaseLayout>

    )
}

export default LoginPage;
