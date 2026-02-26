import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {db} from"@/app/lib/db";
import { Files } from "@/app/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq, and } from "drizzle-orm";
import { error } from "console";

export async function POST(request: NextRequest){
    try{
        const { userId } = await auth();
        console.log(userId);

        if(!userId){
            return NextResponse.json({
                error:"Unaurthorized",
                status : 401
            });
        }
    }catch(error){
    return NextResponse.json(
        {error:'Failed to create a folder'},
        {status : 500}
        );
    }
}