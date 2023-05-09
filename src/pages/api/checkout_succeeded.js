import initStripe from "stripe";
import { buffer } from "micro";
import { db } from '@/firebase';
import { addDoc, updateDoc, doc } from 'firebase/firestore';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
    const docRef = doc(db, "users", 'EfWSGJmgS9NU5M2ki5IEJsEYwAe2');
    updateDoc(docRef, {
        isPremium: true
    });
    const stripe = initStripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
    const signature = req.headers["stripe-signature"];
    const signingSecret = process.env.NEXT_PUBLIC_SIGNING_SECRET_KEY;
    const reqBuffer = await buffer(req);

    let event;

    try {
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
    } catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    console.log({ event });

    res.send({ received: true });
}