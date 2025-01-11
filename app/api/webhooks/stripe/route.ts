import { NextResponse } from "next/server";
import Stripe from 'stripe'
import { headers } from "next/headers";
import { create } from "domain";
import { createOrUpdateSubscription } from "@/utils/db/actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia"
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    if(!signature){
        console.error("No Stripe signature found");
        return NextResponse.json({error: "No Stripe signature"}, {status:400});
    }
    let event: Stripe.Event;
    try{
      event = stripe.webhooks.constructEvent(body , signature, process.env.SRIPE_WEBHOOK_SECRET!);
    }catch(err: any){
     console.error(`Webhook signature verification failed: ${err.message}`);
     return NextResponse.json({
        error: `Webhook Error: ${err.message}`},
        {status: 400}
     )
    }


    if(event.type === 'checkout.session.completed'){
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        const subscriptionId = session.subscription as string;


    if(!userId || !subscriptionId){
        console.error("Missing userId or subscriptionId in session", {session})
            return NextResponse.json(
             {error: "Invalid session data"},
             {status: 400}
            )
        }
         try{
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            console.log("Retrieved subscription:", subscription);
      
            if (!subscription.items.data.length) {
              console.error("No items found in subscription", { subscription });
              return NextResponse.json(
                { error: "Invalid subscription data" },
                { status: 400 }
              );
            }

            const priceId = subscription.items.data[0].price.id;

            let plan: string;
            let pointsToAdd: number;

            switch (priceId) {
                case "price_1QfKOXBQt6gVwbjOrNLHjRG6":
                  plan = "Basic";
                  pointsToAdd = 100;
                  break;
                case "price_1QfKRWBQt6gVwbjOPMvkImQf":
                  plan = "Pro";
                  pointsToAdd = 500;
                  break;
                default:
                  console.error("Unknown price ID", { priceId });
                  return NextResponse.json(
                    { error: "Unknown price ID" },
                    { status: 400 }
                  );
              }
              const updateSubscription = await createOrUpdateSubscription(
                
              )
            
        }catch(error){

        }
    
    }
}
