import { z } from "zod"

export const accountSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  email: z.string().email(),
  createdDate: z.string().datetime(),
  type: z.enum(["normal", "professional"])
})

export type AccountType = z.infer<typeof accountSchema>
