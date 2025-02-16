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

        const { supabase } = event.locals;
        const id = (await supabase.auth.getUser()).data.user?.id;
        
        const { error } = await supabase
            .from('user_profiles')
            .update(form.data)
            .eq('id', id);

        if (error) {
            console.error(error);
            redirect(303, '/onboard/error');
        } else {
            redirect(303, '/');
        }
    }
};