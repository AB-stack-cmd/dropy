import { CloudUpload } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { div } from "framer-motion/client";

export default async function DashBoard(){
    const {userId} = await auth();
    if (!auth){
        redirect("/sign-in");
    };

    return(
        <div>
            Dashboard
        </div>
    )
}