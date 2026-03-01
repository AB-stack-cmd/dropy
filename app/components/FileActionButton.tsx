"use client"

import { RefreshCcw,Trash } from "lucide-react"
import { Button } from "@heroui/react"
import { div } from "framer-motion/client";

interface FileActionButtonProps{
    activeTab:string;
    trashCount : number ;
    folderPath : Array<{id:string,name:string}>;
    onRefresh : ()=> void;
    onEmptyTrash : ()=> void;
};

export default function FileActionButtons({
    activeTab,
    trashCount,
    folderPath,
    onRefresh,
    onEmptyTrash,
}:FileActionButtonProps){
    return(
        <div>
            
        </div>
    )
}