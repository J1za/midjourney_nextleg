import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerCheckout(req: NextApiRequest, res: NextApiResponse) {
    const { type, id, data } = req.body as any;
    if (type === 'checkout.session.completed') {
        const userId = data!.client_reference_id as string;
        try {
            await setDoc(doc(db, "users", userId), {
                isPremium: true
            }, { merge: true });
            res.status(200).json({ status: 'done' });
        } catch (error) {
            // Handle or log the error
            res.status(400).json({ "Error updating Firestore document:": error });
        }
    }


}