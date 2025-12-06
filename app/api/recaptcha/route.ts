import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 400 });
    }

    const secretKey = process.env.RECAPCHA_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ message: "Server secret key is missing" }, { status: 500 });
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await fetch(verificationUrl, {
      method: "POST",
    });

    const data = await response.json();
    console.log("reCAPTCHA Evaluation:", data);  // reCAPTCHA の評価をログ出力

    if (data.success && data.score > 0.5) {
      return NextResponse.json({ message: "Successful reCAPTCHA verification", score: data.score }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed reCAPTCHA verification", score: data.score }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in reCAPTCHA API:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
