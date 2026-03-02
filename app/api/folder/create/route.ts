import { NextRequest, NextResponse } from "next/server.js";
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

        const body = await request.json();
        const { name,userId : bodyUserId,parentId = null} = body;

        if(!userId){
            return NextResponse.json({
                error:"Unaurthorized",
                status : 401
            });
        };

        if (!name || typeof name !== "string" || name.trim() === "") {
            return NextResponse.json(
                { error: "Folder name is required" },
                { status: 400 }
            );
        };

        // Create folder record in database
            const folderData = {
            id: uuidv4(),
            name: name.trim(),
            path: `/folders/${userId}/${uuidv4()}`,
            size: 0,
            type: "folder",
            fileUrl: "",
            thumbnailUrl: null,
            userId,
            parentId,
            isFolder: true,
            isStarred: false,
            isTrash: false,
            };


        // insert data to db

        if(parentId){
            const [parentFolder]=await db
            .select().from(Files).where(and(eq(Files.id,parentId)))
        };

        const [newFolder] = await db.insert(Files).values(folderData).returning()
        
        return NextResponse.json(
            {   
                success : true,
                message : "Folder created successfully",
                folder : newFolder
             }
        );

      
    }catch(error){
     return NextResponse.json(
        {error:'Failed to create a folder'},
        {status : 500}
        );
    }
}