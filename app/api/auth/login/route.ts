import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const body = await request.json();
    
    const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    
    const responseData = await authResponse.json();

    const cookies = authResponse.headers.get('set-cookie');

    const response = NextResponse.json(responseData);

    if (cookies) {
        response.headers.set('Set-Cookie', cookies);
    }

    return response;
}