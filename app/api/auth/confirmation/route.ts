import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const email = formData.get('email');
    const code = formData.get('code');
    
    const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API}auth/acceptUserAccount`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code })
    });
    
    const responseData = await authResponse.json();

    const cookies = authResponse.headers.get('set-cookie');

    const response = NextResponse.json(responseData);

    if (cookies) {
        response.headers.set('Set-Cookie', cookies);
    }

    return response;
}