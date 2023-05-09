const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { db } from '@/firebase';
import { updateDoc, doc } from 'firebase/firestore';
const endpointSecret = "whsec_c34629d41d0d94eaf989c04df601af55e2c906b2b4204ed6d4abcfbe85b21a80";
export default async function handler(request: any, response: any) {
    const sig = request.headers['stripe-signature'];

    let event;
    const docRef = doc(db, "users", 'EfWSGJmgS9NU5M2ki5IEJsEYwAe2');
    updateDoc(docRef, {
        isPremium: true
    });
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err: any) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}