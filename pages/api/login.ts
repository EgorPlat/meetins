// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../global/store/store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;

            const authResponse = await fetch(`${baseURL}auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const responseData = await authResponse.json();
            
            const cookies = authResponse.headers.get("set-cookie");
            
            if (cookies) {
                res.setHeader("Set-Cookie", cookies);
            }

            res.status(authResponse.status).json(responseData);
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}