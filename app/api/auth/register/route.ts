import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const email = formData.get('email');
    const pass = formData.get('password');
    const name = formData.get('name');
    const gender = formData.get('gender');
    const city = formData.get('city');

    const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API}auth/registrationWithConfirmation`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email: email, 
            password: pass,
            name,
            gender,
            city
        })
    });
    
    const responseData = await authResponse.json();

    const cookies = authResponse.headers.get('set-cookie');

    const response = NextResponse.json(responseData);

    if (cookies) {
        response.headers.set('Set-Cookie', cookies);
    }

    return response;
}