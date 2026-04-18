import { z } from "zod";

export const authValidator = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(128),
});
