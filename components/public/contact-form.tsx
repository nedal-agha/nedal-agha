import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <form action="/api/contact" method="post" className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
      <Input label="Name" name="name" required />
      <Input label="Email" name="email" type="email" required />
      <Input label="Phone (optional)" name="phone" />
      <Input label="Subject" name="subject" required />
      <Textarea label="Message" name="message" required />
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
