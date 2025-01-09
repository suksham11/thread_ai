import { MailtrapClient } from "mailtrap";

const TOKEN = "e5cb96336e2a90bf34f2aacbb3ae78df";
const SENDER_EMAIL = "hello@demomailtrap.com";
const RECIPIENT_EMAIL = "sukshamk170@gmail.com";

if (!TOKEN) {
  throw new Error("MAILTRAP_TOKEN environment variable is not set");
}

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "MAiltrap Test", email: SENDER_EMAIL };

client
  .send({
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from mailtrap",
    text: "welcome to threadai",
  })
  .then(console.log)
  .catch(console.error);
