import { db } from "@/app/lib/db";
import { auth} from "@clerk/nextjs/server";
import { Files, Newfile } from "@/app/lib/db/schema";
import { NextResponse,NextRequest } from "next/server";
import ImageKit from "imagekit";

export async function POST(req:NextRequest,res:NextResponse){
    try{

        const {userId} = await auth();

            if(!userId){
                return NextResponse.json({error : "Unauthorized"},{status:401});
            };

        // parse req body
        const body = await req.json();
        const {imagekit, bodyUserId} = body;

        if(bodyUserId !== userId){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        if(!imagekit || imagekit.url ){
            return NextResponse.json({error:"Invakud file Upload"},{status:401});

        }

      // Extract file information from ImageKit response
    const fileData = {
      name: imagekit.name || "Untitled",
      path: imagekit.filePath || `/droply/${userId}/${imagekit.name}`,
      size: imagekit.size || 0,
      type: imagekit.fileType || "image",
      fileUrl: imagekit.url,
      thumbnailUrl: imagekit.thumbnailUrl || null,
      userId: userId,
      parentId: null, // Root level by default
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    const [newFile] = await db.insert(Files).values(fileData).returning()

    return NextResponse.json(Newfile)
    }catch(error){
         return NextResponse.json({error:"failed to save data"},{status:401})
    }
};
/*
here its just fetching the data from client through imagkit 
and saves to the db file located at app/lib/db/schema.ts
*/
