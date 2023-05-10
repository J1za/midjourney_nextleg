import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerCheckout(req: NextApiRequest, res: NextApiResponse) {
    const { type, id, data } = req.body as any;
    const userId = data!.client_reference_id as string;
    try {
        await setDoc(doc(db, "users", 'EjzwZsV9ypchjrl6iVM4TeErjBH2'), {
            isPremium: true
        }, { merge: true });
        res.status(200).json({ type, data });
    } catch (error) {
        // Handle or log the error
        res.status(400).json({ "Error updating Firestore document:": error });
    }

}