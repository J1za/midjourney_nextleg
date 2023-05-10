import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { type, id, data } = req.body as any;
    const userId = data?.client_reference_id as string;
    try {
        await setDoc(doc(db, "users", userId), {
            isPremium: true
        }, { merge: true });
        res.status(200).json({ type, id });
    } catch (error) {
        // Handle or log the error
        res.status(400).json({ "Error updating Firestore document:": error });
        console.error("Error updating Firestore document:", error);
    }

}