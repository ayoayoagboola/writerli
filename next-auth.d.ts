import { type DefaultSession } from 'next-auth';

// added next-auth.d.ts

export type ExtendedUser = DefaultSession["user"] & {
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    supabaseAccessToken: string;
}; 

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;

    }
}
