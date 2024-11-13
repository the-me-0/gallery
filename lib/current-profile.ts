import { Profile } from "@prisma/client";
import { auth } from '@/auth';
import { getProfileById } from '@/lib/actions/profile';
import {redirect} from 'next/navigation';

type ValidationFailedProfile = { status: 'failed', message: string };
type ValidatedProfile = { status: 'success', profile: Profile };

// if (noredirect === true) then failed status can be returned
// if (noredirect === false) then failed status won't be sent but rather redirection executed
export const currentProfile = async (noRedirect: boolean = false): Promise<ValidationFailedProfile | ValidatedProfile> => {
    let session = await auth();

    if (!session && !noRedirect) {
        redirect('/auth/login');
    } else if (!session) {
        return { status: 'failed', message: 'You are not logged in. Please log-in to access this route.' };
    }

    // @ts-ignore
    session = (session && session.isAuthenticated) ? session : null;

    if (!session && !noRedirect) {
        redirect('/logout');
    } else if (!session) {
        return { status: 'failed', message: 'User session is not valid. Please logout and log back in.' };
    }

    // User is not connected, redirect to the login/sign-in page
    if (!session.user) throw new Error('User not connected');

    // Look for a profile that matches user's id
    const profile = await getProfileById(session.user.id || '');

    if (!profile && !noRedirect) {
        console.error('[CURR_PROFILE]', 'No profile found for user', session.user.id);
        redirect('/logout');
    } else if (!profile) {
        return { status: 'failed', message: 'User session failed to link to a user. Please logout and log back in.' };
    }

    return { status: 'success', profile };
}