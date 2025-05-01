import { createTransport } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  //send email
  const info = await transporter.sendMail({
    from: "AppSalon <accounts@appsalon.com>",
    to: email,
    subject: "AppSalon - Verify your Account",
    html: `<div style="background-color: #1e293b; padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; color: white; text-align: center;">
      <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 20px;">Hi ${name},</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">
        Welcome to <strong>AppSalon</strong>! 🎉<br/>
        Your account is almost ready.
      </p>
      <p style="font-size: 18px; margin-bottom: 30px;">
        Please confirm your email by clicking the button below:
      </p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}"
         style="background-color: #3b82f6; color: white; padding: 12px 24px; font-size: 18px; font-weight: bold; border-radius: 8px; text-decoration: none; display: inline-block; margin-bottom: 30px;">
         Confirm Account
      </a>
      <p style="font-size: 16px; margin-top: 40px;">
        If you did not create this account, you can safely ignore this message.
      </p>
      <p style="margin-top: 60px; font-size: 16px;">
        Thanks,<br/>
        The AppSalon Team
      </p>
    </div>`
  })


}

export async function sendEmailPasswordReset({ name, email, token }) {
  const transporter = createTransport(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  //send email
  const info = await transporter.sendMail({
    from: "AppSalon <accounts@appsalon.com>",
    to: email,
    subject: "AppSalon - Reset Your Password",
    html: `<div style="background-color: #1e293b; padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; color: white; text-align: center;">
      <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 20px;">Hi ${name},</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">
        We received a request to reset your <strong>AppSalon</strong> account password. 🔐
      </p>
      <p style="font-size: 18px; margin-bottom: 30px;">
        You can reset your password by clicking the button below:
      </p>
      <a href="${process.env.FRONTEND_URL}/auth/forgot-password/${token}"
         style="background-color: #3b82f6; color: white; padding: 12px 24px; font-size: 18px; font-weight: bold; border-radius: 8px; text-decoration: none; display: inline-block; margin-bottom: 30px;">
         Reset Password
      </a>
      <p style="font-size: 16px; margin-top: 40px;">
        If you did not request this change, you can safely ignore this email.
      </p>
      <p style="margin-top: 60px; font-size: 16px;">
        Thanks,<br/>
        The AppSalon Team
      </p>
    </div>`
  })


}