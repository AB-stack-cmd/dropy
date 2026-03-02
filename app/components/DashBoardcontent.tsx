import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DashBoard() {
    
    const {userId} = await auth();

    if(!userId){
        redirect("/sign-up");
    };

    return(
        <div>
            <h1>DashBoard</h1>
        </div>
    )

    // added comment
};