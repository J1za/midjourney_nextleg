import { loadStripe } from "@stripe/stripe-js";

export async function CheckoutSub({ lineItems }: any) {
    let stripePromise: any = null

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
        }
        return stripePromise
    }

    const stripe = await getStripe()

    await stripe.redirectToCheckout({
        mode: 'subscription',
        lineItems,
        successUrl: `${window.location.origin}`,
        cancelUrl: window.location.origin
    })

}