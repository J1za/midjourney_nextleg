import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
const Stripe = require('stripe');

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});
const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_ENDPOINT_SECRET;
export const config = {
    api: {
        bodyParser: false,
    },
};

const updateOrder = async (userId: string) => {
    await setDoc(doc(db, "users", userId), {
        isPremium: true
    }, { merge: true });
}

export default async function handlerCheckout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log('stripeEvent', stripeEvent);
        } catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ('checkout.session.completed' === stripeEvent.type) {
            const session = stripeEvent.data.object;
            console.log('sessionsession', session);
            console.log('✅ session.metadata.orderId', session.metadata.orderId, session.id);
            // Payment Success.
            // try {
            //     await updateOrder('processing', session.metadata.orderId, session.id);
            // } catch (error) {
            //     console.error('Update order error', error);
            // }
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}