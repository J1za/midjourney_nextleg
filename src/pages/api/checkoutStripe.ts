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
    const { type, id } = req.body as any;
    res.status(200).json({ type, id });
}