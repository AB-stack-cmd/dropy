<<<<<<< HEAD
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DashBoard() {
    
    const {userId} = await auth();

    if(!userId){
=======
import { CloudUpload } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { div } from "framer-motion/client";

export default async function DashBoard(){
    const {userId} = await auth();
    if (!auth){
>>>>>>> 0f7be1fb60d6a99ce93d4755f3ceb2359ca7b2a6
        redirect("/sign-in");
    };

    return(
        <div>
<<<<<<< HEAD
            <h1>DashBoard</h1>
        </div>
    )

=======
            Dashboard
        </div>
    )
>>>>>>> 0f7be1fb60d6a99ce93d4755f3ceb2359ca7b2a6
}