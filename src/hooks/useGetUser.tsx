import {
    auth
} from '@/firebase';
import { doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
export const useGetUser = () => {
    const [user, loading] = useAuthState(auth);
    const uid = user?.uid;
    const [value, error] = useDocument(
        doc(db, 'users', uid ?? '1'),
        {
            snapshotListenOptions: { includeMetadataChanges: false },
        }
    );
    const isPremium = value?.data()?.isPremium

    return {
        loading,
        uid,
        isPremium
    };
};
