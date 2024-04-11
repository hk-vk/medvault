
import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    afterAuth(auth, req, evt) {
        // Redirect users to the dashboard after signing in
        if (auth.userId && !auth.isPublicRoute && req.nextUrl.pathname !== "/dashboard") {
            const dashboardUrl = new URL("/dashboard", req.url);
            return NextResponse.redirect(dashboardUrl);
        }

        // Allow users to continue to their requested route
        return NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(trpc)(.*)"],
};
