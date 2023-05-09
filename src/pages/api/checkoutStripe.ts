import { buffer } from "micro";
import Stripe from "stripe";
import { db } from '@/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
    apiVersion: "2022-11-15",
});
const webhookSecret: any = process.env.NEXT_PUBLIC_SIGNING_SECRET_KEY;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig: any = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        if (event.type === "charge.succeeded") {
            const charge = event.data.object;
            const docRef = doc(db, "users", 'EfWSGJmgS9NU5M2ki5IEJsEYwAe2');
            updateDoc(docRef, {
                isPremium: true
            });
            alert('yes true done good well done nice')
        } else {
            console.warn(`Unhandled event type: ${event.type}`);
        }
        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}