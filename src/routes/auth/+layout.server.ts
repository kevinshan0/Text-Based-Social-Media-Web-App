import type { LayoutServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/formSchema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from "@sveltejs/kit";

export const load: LayoutServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema))
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        return {
            form,
        };
    },
};
