import { buffer } from "micro";
import Stripe from 'stripe';
import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
    apiVersion: '2022-11-15'
});
const webhookSecret: any = process.env.NEXT_PUBLIC_SIGNING_SECRET_KEY;
export default async function handlerCheckout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig: any = req.headers["stripe-signature"];
        let stripeEvent: any;
        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log('stripeEvent', stripeEvent);
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ('checkout.session.completed' === stripeEvent.type) {
            const session = stripeEvent.data;
            const userId = stripeEvent.data.client_reference_id;
            await setDoc(doc(db, "users", userId), {
                isPremium: true
            }, { merge: true });
            res.json({ received: session });
        } else {
            res.setHeader("Allow", "POST");
            res.status(405).end("Method Not Allowed");
        }

    }
}