import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { leadFormSchema } from "@/src/lib/validations/lead-schema";
import { sendLeadNotificationEmails } from "@/src/lib/email";
import { ZodError } from "zod";

/**
 * POST /api/leads
 * Handles submission of new project enquiry leads.
 * Validates payload, persists to PostgreSQL database via Prisma, dispatches email notifications, and returns 201 Created.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate payload with Zod schema
    const validatedData = leadFormSchema.parse(body);

    // 2. Server-Side Duplicate Check (within the last 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    const existingLead = await prisma.lead.findFirst({
      where: {
        phone: validatedData.phone,
        projectType: validatedData.projectType,
        createdAt: { gte: twoMinutesAgo },
      },
    });

    if (existingLead) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This enquiry has already been submitted. Please wait before trying again.",
        },
        { status: 409 }
      );
    }

    // 3. Save lead into PostgreSQL database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        projectType: validatedData.projectType,
        location: validatedData.location,
        budget: validatedData.budget || null,
        preferredContactMethod: validatedData.preferredContactMethod || null,
        message: validatedData.message || null,
      },
    });

    // 4. Dispatch Email Notifications (Owner + Customer confirmation)
    // Non-blocking & fail-safe: failures are logged without breaking response
    sendLeadNotificationEmails(lead).catch((err) => {
      console.error("[API_LEADS_EMAIL_DISPATCH_ERROR]", err);
    });

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully.",
        data: {
          id: lead.id,
          createdAt: lead.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle Zod validation errors (HTTP 400)
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("[API_LEADS_POST_ERROR]", error);

    // Handle unexpected server errors (HTTP 500)
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
