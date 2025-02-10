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

        const formData = await event.request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await event.locals.supabase.auth.signUp({ email, password })

        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        } else {
            redirect(303, '/')
        }
    },
};
