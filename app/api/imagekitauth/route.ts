import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Image } from '@imagekit/next';
import Imagekit from "imagekit"

const imagekit = new Imagekit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || " ",
    privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_PRIVATE_KEY || " ",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL || " "
});

export async function GET() {
    try{
         // auth
    const {userId} = await auth()
    if(!userId){
        return NextResponse.json({error : "unauthorized"},{status:400});
    };
    // params from imagekit
    const authParam = imagekit.getAuthenticationParameters()
    return NextResponse.json(authParam);

    }catch(error){
        return NextResponse.json({error:"Authentication Failed for Imagekit"},{status:500});

    }
   
}