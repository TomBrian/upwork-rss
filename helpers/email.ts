import nodemailer from "nodemailer";

export namespace Email {
  /**
   * Sends an email
   * @param to
   * @param subject
   * @param text
   */
  export async function sendEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      requireTLS: true,
      logger: true,
      debug: true,
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });
    if (to === "") return;
    const recipientAddresses = to.split(",");
    const mailOptions = {
      from: process.env.SMTP_USER || "",
      to: recipientAddresses[0],
      cc: recipientAddresses.slice(1)[0],
      subject,
      html: text,
    };
    // console.log(process.env.SMTP_USER, process.env.SMTP_PASS);
    await transporter.sendMail(mailOptions);
  }
}
