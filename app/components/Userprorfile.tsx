"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { Badge } from "./ui/Badge";
import { useRouter } from "next/navigation";
import { Mail, User, LogOut, Shield, ArrowRight } from "lucide-react";

export default function UserProfile(){
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center p-12">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-default-600">Loading your profile...</p>
      </div>
    );
  }

  if(!isSignedIn){
    return()
  }
}