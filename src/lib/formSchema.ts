import { z } from 'zod';

export const formSchema = z
	.object({
		email: z.string().email().min(2).max(50),
		password: z.string().min(8).max(32),
		confirm: z.string().min(8).max(32).optional()
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match"
	})

export type FormSchema = typeof formSchema;
