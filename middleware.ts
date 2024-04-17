
import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/","/api/webhooks/clerk"],
    afterAuth(auth, req, evt) {
        // Redirect users to the dashboard/role(patient,doctor,labstaff) after signing in
        

        // Allow users to continue to their requested route
 return NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(trpc)(.*)"],
};
