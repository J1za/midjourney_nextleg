import { db } from '@/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { type, id } = req.body as any;
        const docRef = doc(db, "users", 'EfWSGJmgS9NU5M2ki5IEJsEYwAe2');
        updateDoc(docRef, {
            isPremium: true
        });
        res.status(200).json({ type, id });
    }

}