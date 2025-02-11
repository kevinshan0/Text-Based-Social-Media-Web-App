import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { onboardSchema } from "$lib/formSchema.js";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(onboardSchema)),
  };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(onboardSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const username = form.data.username;
        const birthdate = form.data.birthdate;

        const { error } = await event.locals.supabase.auth.updateUser({
            data: { 
                username,
                birthdate
             }
        })


        if (error) {
            console.error(error);
            redirect(303, '/onboard/error');
        } else {
            redirect(303, '/');
        }
    }
};