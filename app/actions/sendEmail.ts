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

  const personalization = [
    {
      email: email,
      data: {
        name: firstName,
        account: {
          name: department === "welcome" ? "On Board" : "Service",
        },
        order_number: orderId,
        support_email:
          department === "welcome"
            ? "onboard@bigstore.nimaphuntsho.com"
            : "serviced@bigstore.nimaphuntsho.com",
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setTemplateId(
      department === "welcome" ? "zr6ke4n7vy3gon12" : "z86org8rw9n4ew13"
    )
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);
}
