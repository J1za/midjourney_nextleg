import {
    auth
} from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useGetUser = () => {
    const [user, loading] = useAuthState(auth);
    const uid = user?.uid;
    return {
        loading,
        uid
    };
};
