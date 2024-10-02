import { NextResponse } from "next/server";

export async function middleware(req) {
    const { cookies, url } = req;
    const token = cookies.get("access_token");

    if (url.match(/\.(css|js|png|jpg|jpeg|gif|ico)$/) || url.includes("/_next/")) {
        return NextResponse.next();
    }
    if (token && token.value) {
        return NextResponse.next();
    }
    else if (url.includes("/login") || url.includes("/confirmation") || url.includes("/register")) {
        return NextResponse.next();
    }
    else {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: [
        "/:path*",
    ],
};
