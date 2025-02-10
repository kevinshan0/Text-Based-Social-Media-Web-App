import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email().min(2).max(50),
		password: z.string().min(8).max(32),
		confirm: z.string().min(8).max(32)
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match"
	});

export const signinSchema = z.object({
	email: z.string().email().min(2).max(50),
	password: z.string().min(8).max(32)
});

export type RegisterSchema = typeof registerSchema;
export type SigninSchema = typeof signinSchema;
