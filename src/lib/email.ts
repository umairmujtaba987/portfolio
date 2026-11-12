import nodemailer from "nodemailer";

export function getMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    console.warn("SMTP credentials not fully configured.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export interface SendMailParams {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

export async function sendContactEmail(params: SendMailParams): Promise<boolean> {
  const transporter = getMailTransporter();
  if (!transporter) return false;

  const fromName = process.env.EMAIL_FROM_NAME || "Portfolio Transmission";
  const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const toEmail = process.env.EMAIL_TO || process.env.SMTP_USER || "umairmujtaba987@gmail.com";

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: toEmail,
    replyTo: params.email,
    subject: `[Portfolio Inquiry] from ${params.name} (${params.company || "Direct"})`,
    text: `New Portfolio Message received from: ${params.name}
Email: ${params.email}
Company: ${params.company || "N/A"}
Budget / Scope: ${params.budget || "N/A"}

Message:
${params.message}
`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #07080b; color: #f3f4f6; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); padding: 24px;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #00f2fe; margin: 0; font-size: 20px;">[PORTFOLIO TRANSMISSION RECEIVED]</h2>
          <p style="color: #9ca3af; font-size: 13px; margin: 4px 0 0 0;">Inquiry from umair-mujtaba portfolio dispatch console</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="color: #6b7280; padding: 6px 0; width: 120px;">Sender:</td>
            <td style="color: #ffffff; font-weight: bold;">${params.name}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 6px 0;">Email:</td>
            <td><a href="mailto:${params.email}" style="color: #00f2fe; text-decoration: none;">${params.email}</a></td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 6px 0;">Company:</td>
            <td style="color: #d1d5db;">${params.company || "N/A"}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 6px 0;">Budget / Scope:</td>
            <td style="color: #10b981; font-weight: 600;">${params.budget || "N/A"}</td>
          </tr>
        </table>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-top: 16px;">
          <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px;">Message Payload:</div>
          <p style="color: #e5e7eb; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${params.message}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; color: #6b7280; text-align: center;">
          Sent from Umair Mujtaba Portfolio Console &bull; High-Throughput Node
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email dispatched successfully. MessageId:", info.messageId);
    return true;
  } catch (err) {
    console.error("Nodemailer dispatch error:", err);
    return false;
  }
}
