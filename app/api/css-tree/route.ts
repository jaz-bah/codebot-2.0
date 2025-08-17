import { NextResponse } from "next/server";

// app/api/chat/route.ts

export async function POST(req: Request) {
    try {
        const { message } = await req.json()

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-r1-distill-llama-70b',
                messages: [{ role: 'user', content: message }],
            }),
        })
        const data = await res.json()
        return NextResponse.json({ reply: data.choices[0].message.content })
    } catch (error) {
        return NextResponse.json({ error: error || "Failed to fetch data from Groq API" })
    }
}
