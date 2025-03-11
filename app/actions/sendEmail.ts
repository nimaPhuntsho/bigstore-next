import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

type DepartmentType = "support" | "welcome";

export async function sendEmail({
  email,
  firstName,
  subject,
  department,
  orderId,
}: {
  email: string;
  firstName: string;
  subject: string;
  department: DepartmentType;
  orderId?: number;
}) {
  const mailerSend = new MailerSend({
    apiKey: process.env.NEXT_MAILERSEND_API_KEY!,
  });

  const sentFrom = new Sender(
    department === "welcome"
      ? "hello@bigstore.nimaphuntsho.com"
      : "support@bigstore.nimaphuntsho.com",
    "Bigstore"
  );

  const recipients = [new Recipient(email, firstName)];

  const welcomeEmail = `<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Our Store</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        margin: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .button {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
      }
      .footer {
        font-size: 12px;
        color: #888;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Welcome to Our Store!</h2>
      <p>Hi <strong>${firstName}</strong>,</p>
      <p>
        Thank you for signing up! We're excited to have you on board. Please
        note that you will need to use this email address when placing an order.
      </p>
      <a href="https://bigstores.nimaphuntsho.com/" class="button"
        >Start Shopping</a
      >
      <p class="footer">
        If you didn’t sign up for this account, you can ignore this email.
      </p>
    </div>
  </body>
</html>`;

  const orderConfirmationEmail = `<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Our Store</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        margin: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .button {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
      }
      .footer {
        font-size: 12px;
        color: #888;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Order confirmation!</h2>
      <p>Hi <strong>${firstName}</strong>,</p>
      <p>
        Thank you for your order! Your order ${orderId}  has been successfully placed.
      </p>
      <a href="https://bigstores.nimaphuntsho.com/login" class="button"
        >Login</a
      >
      <p class="footer">
        If you didn’t sign up for this account, you can ignore this email.
      </p>
    </div>
  </body>
</html>`;

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(department === "welcome" ? welcomeEmail : orderConfirmationEmail);

  await mailerSend.email.send(emailParams);
}
