import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
const Stripe = require('stripe');

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});
const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_ENDPOINT_SECRET;
export const config = {
    api: {
        bodyParser: false,
    },
};

const updateOrder = async (userId: string) => {
    await setDoc(doc(db, "users", 'EjzwZsV9ypchjrl6iVM4TeErjBH2'), {
        isPremium: true
    }, { merge: true });
}

async function checkSignature(req: NextApiRequest, res: NextApiResponse) {
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
        const userId = stripeEvent.data.client_reference_id;
        // Payment Success.
        try {
            await updateOrder(userId);
        } catch (error) {
            console.error('Update order error', error);
        }
    }

    res.json({ received: true, userId: stripeEvent.data.client_reference_id ?? 'not have' });
}
export default async function handlerCheckout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return checkSignature(req, res)
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}