import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
      <Input label="Email" name="email" type="email" required />
      <Input label="Password" name="password" type="password" required />
      <Button type="submit">Sign In</Button>
    </form>
  );
}
