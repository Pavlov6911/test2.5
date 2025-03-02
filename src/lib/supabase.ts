import { createClient } from '@supabase/supabase-js';
import type { Provider } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we're in development and no env vars are set, use fallback values
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase URL or Anon Key. Using mock client.');
}

// Create client with validation to prevent "Invalid URL" error
export const supabase = createClient(
  // Ensure URL is valid by providing a fallback
  supabaseUrl || 'https://placeholder-project.supabase.co',
  // Ensure key is not empty
  supabaseAnonKey || 'placeholder-key'
);

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
      emailRedirectTo: `${import.meta.env.VITE_BASE_URL || window.location.origin}/dashboard`
    }
  });

  if (error) {
    console.error("Signup Error:", error);
    throw error;
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

// Get current session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Get Session Error:", error);
    throw error;
  }
  return data.session;
}

// Get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Get User Error:", error);
    throw error;
  }
  return data.user;
}
