import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { signinSchema } from '$lib/formSchema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signinSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signinSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const email = form.data.email;
        const password = form.data.password;

		const { error } = await event.locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
            redirect(303, '/auth/confirm');
        }
	}
};
