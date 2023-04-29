import React from 'react';
import Register from '../components/Register/Register';
import BaseLayout from '@/components/layout/BaseLayout';
import {
    Box
} from '@chakra-ui/react';

function LoginPage() {
    return (
        <BaseLayout>
            <Box position='absolute' top='50%' left='50%' width='md' transform='translate(-50%, -50%)'>
                <Register />
            </Box>
        </BaseLayout>

    )
}

export default LoginPage;
