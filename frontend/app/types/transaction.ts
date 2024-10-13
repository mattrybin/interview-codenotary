import { z } from "zod"
import { accountSchema } from "./account"

export const TransactionTypeSchema = z.enum(["receiving", "sending"])

export const TransactionSchema = z.object({
  id: z.string(),
  createdDate: z.string().datetime(),
  iban: z.string(),
  address: z.string(),
  amount: z.number(),
  transactionType: TransactionTypeSchema,
  accountName: accountSchema.shape.accountName,
  accountEmail: accountSchema.shape.email,
  accountId: accountSchema.shape.id,
  accountType: accountSchema.shape.type
})

export type TransactionType = z.infer<typeof TransactionSchema>
