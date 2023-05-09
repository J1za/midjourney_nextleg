import { db } from '@/firebase';
import { updateDoc, setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { type, id, data } = req.body as any;
    const userId = data?.client_reference_id as string;
    if (userId) {
        setDoc(doc(db, "users", userId), {
            isPremium: true
        }, { merge: true });
    }
    res.status(200).json({ type, id });
}