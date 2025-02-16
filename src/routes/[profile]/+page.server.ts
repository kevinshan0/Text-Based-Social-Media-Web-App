import type { PageServerLoad } from './$types';
import { error as loadErrorPage } from '@sveltejs/kit';

type Data = {
    
}

export const load: PageServerLoad = async ({ params, locals: { supabase }}) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select()
        .eq('username', `${params.profile}`)
        .limit(1)
        .single()

    if (error) {
        loadErrorPage(404, error);
    }

    return { data };
};