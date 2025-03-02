import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Provider } from '@supabase/supabase-js';


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SignUpOptions {
  email: string;
  password: string;
}

interface SignInOptions {
  email: string;
  password?: string;
  provider?: Provider;
}

// Signup with email and password
export async function signUpWithEmail(options: SignUpOptions) {
    const { data, error } = await supabase.auth.signUp({
      email: options.email,
      password: options.password,
      options: {
        emailRedirectTo: `${process.env.BASE_URL}/dashboard`
      }
    });

    if (error) {
      console.error("Signup Error:", error);
      throw error; // Re-throw the error for the calling function to handle
    }
    return data;
}

// Signin with email and password or provider
export async function signInWithEmail(options: SignInOptions) {
  const { data, error } = await supabase.auth.signInWithPassword({
      email: options.email,
      password: options.password
  });

  if (error) {
    console.error("Signin Error:", error);
    throw error;
  }
  return data;
}

// Signout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
      console.error("Signout Error:", error);
      throw error;
  }
}
