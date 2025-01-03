import {db} from "./dbConfig"
import {eq, sql, desc} from 'drizzle-orm'
import {Users, Subscriptions, GeneratedContent} from './schema'


export async function createOrUpdateUser(
    clerkUserId: string,
    email: string,
    name: string
) {
    try{
         const [existingUser] = await db.select().from(Users).where(eq(Users.stripeCustomerId, clerkUserId)).limit(1).execute();
         if(existingUser){
            const [updatedUser] = await db
            .update(Users)
            .set({name , email})
            .where(eq(Users.stripeCustomerId, clerkUserId))
            .returning()
            .execute();
          console.log("Updated user", updatedUser);
         }
        const [newUser] = await db.insert(Users).values({email, name , stripeCustomerId:clerkUserId, points: 50}).returning().execute();
    }catch(error){

    }
}