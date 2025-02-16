import { z } from 'zod';

export const registerSchema = z.object({
		email: z.string().email().min(2).max(50),
		password: z.string().min(8).max(32),
		confirm: z.string().min(8).max(32)
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match"
	});

export const signinSchema = z.object({
	email: z.string().email().min(2).max(50),
	password: z.string().min(8).max(32),
});

export const onboardSchema = z.object({
    first_name: z.string().min(1).max(50),
    last_name: z.string().min(1).max(50),
    username: z.string().min(2).max(50),
    birthdate: z.string().date().refine((v) => v, { message: "A date of birth is required." }),
});

export type RegisterSchema = typeof registerSchema;
export type SigninSchema = typeof signinSchema;
export type OnboardSchema = typeof onboardSchema;
