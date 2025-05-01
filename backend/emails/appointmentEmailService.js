import { createTransport } from "../config/nodemailer.js";
export async function sendEmailNewAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: "AppSalon <appointments@appsalon.com>",
        to: "admin@appsalon.com",
        subject: "AppSalon - New Appointment Scheduled",
        html: `<div style="background-color: #1e293b; padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; color: white; text-align: center;">
      <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 20px;">New Appointment Alert</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">
        A new appointment has just been scheduled in <strong>AppSalon</strong>. 🗓️
      </p>
      <p style="font-size: 20px; margin-bottom: 20px;">
        <strong>Date:</strong> ${date}
      </p>
      <p style="font-size: 20px; margin-bottom: 30px;">
        <strong>Time:</strong> ${time}
      </p>
      <p style="font-size: 16px; margin-top: 40px;">
        Please log in to the admin panel for more details.
      </p>
      <p style="margin-top: 60px; font-size: 16px;">
        Thanks,<br/>
        The AppSalon Team
      </p>
    </div>`
    })
}

export async function sendEmailUpdateAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: "AppSalon <appointments@appsalon.com>",
        to: "admin@appsalon.com",
        subject: "AppSalon - Appointment Updated",
        html: `<div style="background-color: #1e293b; padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; color: white; text-align: center;">
      <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 20px;">Appointment Updated</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">
        An existing appointment has been updated in <strong>AppSalon</strong>. ✏️
      </p>
      <p style="font-size: 20px; margin-bottom: 20px;">
        <strong>New Date:</strong> ${date}
      </p>
      <p style="font-size: 20px; margin-bottom: 30px;">
        <strong>New Time:</strong> ${time}
      </p>
      <p style="font-size: 16px; margin-top: 40px;">
        Please check the admin panel for the updated details.
      </p>
      <p style="margin-top: 60px; font-size: 16px;">
        Thanks,<br/>
        The AppSalon Team
      </p>
    </div>`
    })
}

export async function sendEmailCancelledAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const info = await transporter.sendMail({
        from: "AppSalon <appointments@appsalon.com>",
        to: "admin@appsalon.com",
        subject: "AppSalon - Appointment Cancelled",
        html: `<div style="background-color: #1e293b; padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; color: white; text-align: center;">
      <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 20px;">Appointment Cancelled</h2>
      <p style="font-size: 18px; margin-bottom: 30px;">
        A scheduled appointment has been cancelled in <strong>AppSalon</strong>. ❌
      </p>
      <p style="font-size: 20px; margin-bottom: 20px;">
        <strong>Date:</strong> ${date}
      </p>
      <p style="font-size: 20px; margin-bottom: 30px;">
        <strong>Time:</strong> ${time}
      </p>
      <p style="font-size: 16px; margin-top: 40px;">
        Please log in to the admin panel for more details.
      </p>
      <p style="margin-top: 60px; font-size: 16px;">
        Thanks,<br/>
        The AppSalon Team
      </p>
    </div>`
    })
}