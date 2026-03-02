import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async(auth, req) => {
  const user = auth()
  const userId =  (await user).userId
  const url = new URL(req.url)

  if(userId && isPublicRoute(req) && url.pathname != "/"){
    return NextResponse.redirect(new URL("/dashboard"),req.url)
  }
  if (!isPublicRoute(req)) {
    
    // auth().protect(); // ✅ must call auth() first
  }

  return NextResponse.next(); // ✅ must return a response
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};