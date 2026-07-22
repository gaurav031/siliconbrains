import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, company, email, country, subject, message, collaborationType } =
      parsed.data;

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        company: company || null,
        email,
        country: country || null,
        subject,
        message,
        collaborationType,
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple admin-style listing endpoint (protect this in production!)
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ success: true, submissions });
}
