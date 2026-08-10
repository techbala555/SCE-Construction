import { Resend } from "resend";

// ── Read Resend Configuration from Environment Variables ──────
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Sender address supported by Resend (default testing domain: onboarding@resend.dev)
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Shylesh Circuits & Engineering <onboarding@resend.dev>";

// Business Owner recipient email address
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "info@sceconstruction@gmail.com";

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
 * Fully logged & audited. Logs complete Resend API responses and error objects.
 */
export async function sendLeadNotificationEmails(lead: LeadEmailData): Promise<void> {
  console.log(`[EMAIL_SERVICE] 📧 Initiating email dispatch for Lead ID: ${lead.id}`);
  console.log(`[EMAIL_SERVICE] 📋 Lead Input Data:`, {
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email || "(None Provided)",
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
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Website Lead Enquiry</title>
        <style type="text/css">
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          @media only screen and (max-width: 600px) {
            .outer-container { padding: 12px 8px !important; }
            .wrapper-table { width: 100% !important; max-width: 100% !important; border-radius: 12px !important; }
            .header-td { padding: 24px 16px !important; }
            .mobile-heading { font-size: 19px !important; line-height: 25px !important; }
            .mobile-subheading { font-size: 11px !important; }
            .content-td { padding: 20px 16px !important; }
            .mobile-stack-tr { display: block !important; width: 100% !important; }
            .mobile-label { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 10px 14px 4px 14px !important; background-color: #1F2937 !important; border-bottom: none !important; }
            .mobile-value { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 0 14px 12px 14px !important; background-color: #111827 !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
            .btn-container { text-align: center !important; }
            .btn-mobile { display: block !important; width: 100% !important; box-sizing: border-box !important; margin: 0 0 12px 0 !important; text-align: center !important; padding: 14px 16px !important; min-height: 48px !important; }
          }
        </style>
      </head>
      <body style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; background-color: #0B1220; color: #F9FAFB; margin: 0; padding: 0; width: 100% !important;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="outer-container" style="background-color: #0B1220; width: 100%; padding: 30px 15px;">
          <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="600" class="wrapper-table" style="width: 100%; max-width: 600px; background-color: #111827; border: 1px solid rgba(212,160,23,0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <tr>
                  <td align="center" class="header-td" style="background: linear-gradient(135deg, #0B1220 0%, #1F2937 100%); padding: 30px; text-align: center; border-bottom: 2px solid #D4A017;">
                    <h1 class="mobile-heading" style="color: #D4A017; font-size: 22px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1px; line-height: 28px;">
                      Shylesh Circuits & Engineering
                    </h1>
                    <p class="mobile-subheading" style="color: #94A3B8; font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
                      New Website Lead Enquiry
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="content-td" style="padding: 30px;">
                    <p style="font-size: 15px; color: #CBD5E1; margin: 0 0 20px 0; line-height: 1.6;">
                      A new project enquiry has been submitted on the website:
                    </p>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; width: 38%; word-break: break-word; overflow-wrap: break-word;">Full Name</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-weight: 600; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">${lead.name}</td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Phone Number</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">
                          <a href="tel:+91${lead.phone}" style="color: #D4A017; text-decoration: none; font-weight: 700;">+91 ${lead.phone}</a>
                        </td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Email Address</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">
                          ${lead.email ? `<a href="mailto:${lead.email}" style="color: #60A5FA; text-decoration: none;">${lead.email}</a>` : '<span style="color: #94A3B8; font-style: italic;">Not provided</span>'}
                        </td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Project Type</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-weight: 600; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">${lead.projectType}</td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Location</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">${lead.location}</td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Estimated Budget</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">${lead.budget || '<span style="color: #94A3B8; font-style: italic;">Not specified</span>'}</td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Preferred Contact Method</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F9FAFB; font-weight: 700; font-size: 15px; word-break: break-word; overflow-wrap: break-word;">${contactMethodDisplay}</td>
                      </tr>
                      <tr class="mobile-stack-tr">
                        <td class="mobile-label" style="padding: 12px 16px; background-color: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; color: #D4A017; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">Submitted At</td>
                        <td class="mobile-value" style="padding: 12px 16px; background-color: #111827; border-bottom: 1px solid rgba(255,255,255,0.08); color: #CBD5E1; font-size: 13px; word-break: break-word; overflow-wrap: break-word;">${formattedDate}</td>
                      </tr>
                    </table>

                    ${lead.message ? `
                      <div style="background-color: #1F2937; border-left: 4px solid #D4A017; padding: 16px; border-radius: 8px; margin-bottom: 25px; word-break: break-word; overflow-wrap: break-word;">
                        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #D4A017; font-weight: 700; letter-spacing: 1px;">Customer Message:</p>
                        <p style="margin: 0; font-size: 14px; color: #F9FAFB; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${lead.message}</p>
                      </div>
                    ` : ''}

                    <div class="btn-container" style="text-align: center; margin-top: 25px;">
                      <a href="tel:+91${lead.phone}" class="btn-mobile" style="display: inline-block; background-color: #D4A017; color: #0B1220; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 15px; text-decoration: none; margin-right: 12px; min-height: 48px; box-sizing: border-border;">Call Client</a>
                      <a href="https://wa.me/91${lead.phone}" class="btn-mobile" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 15px; text-decoration: none; min-height: 48px; box-sizing: border-border;">WhatsApp Client</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="background-color: #0B1220; padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #94A3B8;">
                    © ${new Date().getFullYear()} Shylesh Circuits & Engineering. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    console.log(`[EMAIL_SERVICE] 📤 Dispatching Admin Email -> From: "${FROM_EMAIL}" | To: "${NOTIFICATION_EMAIL}"`);
    const ownerRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New Website Enquiry - ${lead.name} (${contactMethodDisplay})`,
      html: ownerHtml,
    });

    console.log(`[EMAIL_SERVICE] 📥 Resend API Raw Response (Admin Email):`, JSON.stringify(ownerRes, null, 2));

    if (ownerRes.error) {
      console.error(`[EMAIL_SERVICE] ❌ Admin Email Failed (Code ${ownerRes.error.name}):`, JSON.stringify(ownerRes.error, null, 2));
    } else {
      console.log(`[EMAIL_SERVICE] ✅ Admin Email Sent Successfully (ID: ${ownerRes.data?.id})`);
    }
  } catch (error) {
    console.error("[EMAIL_SERVICE] 💥 Exception sending Admin Email:", error);
  }

  // ── 2. Customer Confirmation Email (only if email provided) ──
  if (lead.email && lead.email.trim().length > 0) {
    const customerRecipient = lead.email.trim();

    try {
      const customerHtml = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Thank You for Contacting Us</title>
          <style type="text/css">
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            @media only screen and (max-width: 600px) {
              .outer-container { padding: 12px 8px !important; }
              .wrapper-table { width: 100% !important; max-width: 100% !important; border-radius: 12px !important; }
              .header-td { padding: 24px 16px !important; }
              .mobile-heading { font-size: 19px !important; line-height: 25px !important; }
              .mobile-subheading { font-size: 11px !important; }
              .content-td { padding: 24px 16px !important; }
              .mobile-text { font-size: 15px !important; line-height: 23px !important; }
              .summary-box { padding: 14px 14px !important; }
              .summary-item { font-size: 13px !important; margin: 6px 0 !important; }
            }
          </style>
        </head>
        <body style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #111827; margin: 0; padding: 0; width: 100% !important;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="outer-container" style="background-color: #F8FAFC; width: 100%; padding: 30px 15px;">
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="wrapper-table" style="width: 100%; max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                  <tr>
                    <td align="center" class="header-td" style="background: linear-gradient(135deg, #0B1220 0%, #1F2937 100%); padding: 35px 30px; text-align: center;">
                      <h1 class="mobile-heading" style="color: #D4A017; font-size: 22px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1px; line-height: 28px;">
                        Shylesh Circuits & Engineering
                      </h1>
                      <p class="mobile-subheading" style="color: #CBD5E1; font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
                        Builders & Developers
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="content-td" style="padding: 35px 30px;">
                      <h2 class="mobile-text" style="font-size: 20px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 16px;">
                        Dear ${lead.name},
                      </h2>

                      <p class="mobile-text" style="font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 16px; word-break: break-word;">
                        Thank you for contacting <strong>Shylesh Circuits & Engineering</strong>. We have successfully received your enquiry regarding <strong>${lead.projectType}</strong>.
                      </p>

                      <p class="mobile-text" style="font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 24px; word-break: break-word;">
                        Our engineering and project management team is currently reviewing your requirements and will reach out to you shortly via <strong>${contactMethodDisplay}</strong>.
                      </p>

                      <div class="summary-box" style="background-color: #F1F5F9; border-left: 4px solid #D4A017; padding: 18px; border-radius: 8px; margin-bottom: 28px; word-break: break-word; overflow-wrap: break-word;">
                        <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Your Enquiry:</h3>
                        <p class="summary-item" style="margin: 5px 0; font-size: 13px; color: #475569; line-height: 1.5;"><strong>Project Type:</strong> ${lead.projectType}</p>
                        <p class="summary-item" style="margin: 5px 0; font-size: 13px; color: #475569; line-height: 1.5;"><strong>Location:</strong> ${lead.location}</p>
                        <p class="summary-item" style="margin: 5px 0; font-size: 13px; color: #475569; line-height: 1.5;"><strong>Preferred Contact Method:</strong> ${contactMethodDisplay}</p>
                        ${lead.budget ? `<p class="summary-item" style="margin: 5px 0; font-size: 13px; color: #475569; line-height: 1.5;"><strong>Budget:</strong> ${lead.budget}</p>` : ''}
                      </div>

                      <p class="mobile-text" style="font-size: 15px; color: #334155; margin-bottom: 30px; line-height: 1.6;">
                        If you have any urgent queries, feel free to call us directly at <a href="tel:+919842229272" style="color: #B8860B; font-weight: 600; text-decoration: none;">+91 98422 29272</a>.
                      </p>

                      <div style="border-top: 1px solid #E2E8F0; padding-top: 20px;">
                        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Regards,</p>
                        <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 700; color: #B8860B;">Shylesh Circuits & Engineering</p>
                        <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748B;">PMR Nagar, TVS Nagar, Coimbatore, Tamil Nadu – 641025</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #F8FAFC; padding: 20px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8;">
                      This is an automated confirmation of your enquiry.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      console.log(`[EMAIL_SERVICE] 📤 Dispatching Customer Email -> From: "${FROM_EMAIL}" | To: "${customerRecipient}"`);
      const customerRes = await resend.emails.send({
        from: FROM_EMAIL,
        to: customerRecipient,
        subject: "Thank You for Contacting Shylesh Circuits & Engineering",
        html: customerHtml,
      });

      console.log(`[EMAIL_SERVICE] 📥 Resend API Raw Response (Customer Email):`, JSON.stringify(customerRes, null, 2));

      if (customerRes.error) {
        console.error(`[EMAIL_SERVICE] ❌ Customer Confirmation Email Failed (Code ${customerRes.error.name}):`, JSON.stringify(customerRes.error, null, 2));
      } else {
        console.log(`[EMAIL_SERVICE] ✅ Customer Confirmation Email Sent Successfully to ${customerRecipient} (ID: ${customerRes.data?.id})`);
      }
    } catch (error) {
      console.error("[EMAIL_SERVICE] 💥 Exception sending Customer Email:", error);
    }
  } else {
    console.log(`[EMAIL_SERVICE] ℹ️ Customer email not provided in form. Skipping customer confirmation email.`);
  }
}
