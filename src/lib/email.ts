import { Resend } from "resend";

// ── Read Resend Configuration from Environment Variables ──────
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Sender address supported by Resend (default testing domain: onboarding@resend.dev)
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Shylesh Circuits & Engineering <onboarding@resend.dev>";

// Business Owner recipient email address
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "info@sceconstruction.com";

interface LeadEmailData {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  projectType: string;
  location: string;
  budget?: string | null;
  message?: string | null;
  preferredContactMethod?: string | null;
  createdAt: Date | string;
}

/**
 * Sends notification emails after a new lead is saved.
 * 1. Owner Notification Email -> NOTIFICATION_EMAIL
 * 2. Customer Confirmation Email -> Customer Email (if provided)
 *
 * Safe execution: Errors are logged completely and caught so lead creation is NEVER failed.
 * Works identically regardless of preferredContactMethod ("Phone Call", "WhatsApp", etc.).
 */
export async function sendLeadNotificationEmails(lead: LeadEmailData): Promise<void> {
  console.log(`[EMAIL_SERVICE] 📧 Initiating email dispatch for Lead ID: ${lead.id}`);
  console.log(`[EMAIL_SERVICE] 📋 Lead Details:`, {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    projectType: lead.projectType,
    preferredContactMethod: lead.preferredContactMethod || "Phone Call",
  });

  if (!resend) {
    console.warn(
      "[EMAIL_SERVICE] ⚠️ RESEND_API_KEY is not configured in environment variables. Skipping email dispatch."
    );
    return;
  }

  const contactMethodDisplay = lead.preferredContactMethod || "Phone Call";

  const formattedDate = new Date(lead.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  // ── 1. Owner Notification Email ──────────────────────────
  try {
    const ownerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Website Enquiry</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0B1220; color: #F9FAFB; margin: 0; padding: 30px 15px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(212,160,23,0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0B1220 0%, #1F2937 100%); padding: 30px; text-align: center; border-bottom: 2px solid #D4A017;">
            <h1 style="color: #D4A017; font-size: 22px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
              Shylesh Circuits & Engineering
            </h1>
            <p style="color: #94A3B8; font-size: 13px; margin-top: 6px; text-transform: uppercase; letter-spacing: 2px;">
              New Website Lead Enquiry
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">
            <p style="font-size: 15px; color: #CBD5E1; margin-bottom: 20px;">
              A new project enquiry has been submitted on the website:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; width: 35%;">Full Name</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-weight: 600;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Phone Number</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB;">
                  <a href="tel:+91${lead.phone}" style="color: #D4A017; text-decoration: none; font-weight: 600;">+91 ${lead.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Email Address</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB;">${lead.email ? `<a href="mailto:${lead.email}" style="color: #60A5FA; text-decoration: none;">${lead.email}</a>` : '<span style="color: #94A3B8; font-style: italic;">Not provided</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Project Type</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-weight: 600;">${lead.projectType}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Location</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB;">${lead.location}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Estimated Budget</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB;">${lead.budget || '<span style="color: #94A3B8; font-style: italic;">Not specified</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Preferred Contact Method</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-weight: 600;">${contactMethodDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017;">Submitted At</td>
                <td style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #CBD5E1; font-size: 13px;">${formattedDate}</td>
              </tr>
            </table>

            ${lead.message ? `
              <div style="background-color: #1F2937; border-left: 4px solid #D4A017; padding: 16px; border-radius: 8px; margin-bottom: 25px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #D4A017; font-weight: 700; letter-spacing: 1px;">Customer Message:</p>
                <p style="margin: 0; font-size: 14px; color: #F9FAFB; line-height: 1.6; whitespace-pre-wrap;">${lead.message}</p>
              </div>
            ` : ''}

            <!-- Quick Action Buttons -->
            <div style="text-align: center; margin-top: 25px;">
              <a href="tel:+91${lead.phone}" style="display: inline-block; background-color: #D4A017; color: #0B1220; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; margin-right: 10px;">Call Client</a>
              <a href="https://wa.me/91${lead.phone}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none;">WhatsApp Client</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #0B1220; padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #94A3B8;">
            © ${new Date().getFullYear()} Shylesh Circuits & Engineering. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    console.log(`[EMAIL_SERVICE] 📤 Sending Admin Notification Email to: ${NOTIFICATION_EMAIL}`);
    const { data: ownerData, error: ownerError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New Website Enquiry - ${lead.name} (${contactMethodDisplay})`,
      html: ownerHtml,
    });

    if (ownerError) {
      console.error("[EMAIL_SERVICE] ❌ Owner notification email failed:", ownerError);
    } else {
      console.log(`[EMAIL_SERVICE] ✅ Owner notification sent successfully to ${NOTIFICATION_EMAIL} (ID: ${ownerData?.id})`);
    }
  } catch (error) {
    console.error("[EMAIL_SERVICE] ❌ Exception caught sending owner email:", error);
  }

  // ── 2. Customer Confirmation Email (only if email provided) ──
  if (lead.email && lead.email.trim().length > 0) {
    try {
      const customerHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You for Contacting Us</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #F8FAFC; color: #111827; margin: 0; padding: 30px 15px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1220 0%, #1F2937 100%); padding: 35px 30px; text-align: center;">
              <h1 style="color: #D4A017; font-size: 22px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                Shylesh Circuits & Engineering
              </h1>
              <p style="color: #CBD5E1; font-size: 13px; margin-top: 6px; text-transform: uppercase; letter-spacing: 2px;">
                Builders & Developers
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 16px;">
                Dear ${lead.name},
              </h2>

              <p style="font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 16px;">
                Thank you for contacting <strong>Shylesh Circuits & Engineering</strong>. We have successfully received your enquiry regarding <strong>${lead.projectType}</strong>.
              </p>

              <p style="font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 24px;">
                Our engineering and project management team is currently reviewing your requirements and will reach out to you shortly via <strong>${contactMethodDisplay}</strong>.
              </p>

              <div style="background-color: #F1F5F9; border-left: 4px solid #D4A017; padding: 18px; border-radius: 8px; margin-bottom: 28px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Your Enquiry:</h3>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Project Type:</strong> ${lead.projectType}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Location:</strong> ${lead.location}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Preferred Contact Method:</strong> ${contactMethodDisplay}</p>
                ${lead.budget ? `<p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Budget:</strong> ${lead.budget}</p>` : ''}
              </div>

              <p style="font-size: 15px; color: #334155; margin-bottom: 30px;">
                If you have any urgent queries, feel free to call us directly at <a href="tel:+910000000000" style="color: #B8860B; font-weight: 600; text-decoration: none;">+91 00000 00000</a>.
              </p>

              <div style="border-top: 1px solid #E2E8F0; padding-top: 20px;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Regards,</p>
                <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 700; color: #B8860B;">Shylesh Circuits & Engineering</p>
                <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748B;">Builders & Developers — Madurai, Tamil Nadu</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #F8FAFC; padding: 20px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8;">
              This is an automated confirmation of your enquiry.
            </div>
          </div>
        </body>
        </html>
      `;

      console.log(`[EMAIL_SERVICE] 📤 Sending Customer Confirmation Email to: ${lead.email}`);
      const { data: customerData, error: customerError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: lead.email,
        subject: "Thank You for Contacting Shylesh Circuits & Engineering",
        html: customerHtml,
      });

      if (customerError) {
        console.error("[EMAIL_SERVICE] ❌ Customer confirmation email failed:", customerError);
      } else {
        console.log(`[EMAIL_SERVICE] ✅ Customer confirmation sent successfully to ${lead.email} (ID: ${customerData?.id})`);
      }
    } catch (error) {
      console.error("[EMAIL_SERVICE] ❌ Exception caught sending customer email:", error);
    }
  } else {
    console.log(`[EMAIL_SERVICE] ℹ️ Customer email not provided. Skipping customer confirmation email dispatch.`);
  }
}
