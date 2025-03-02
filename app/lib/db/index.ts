import { supabase } from '../supabase';
import type { User } from '../../models/user';
import type { Mod } from '../../models/mod';

// Helper functions using Supabase
export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data as User;
}

export async function getMod(id: string): Promise<(Mod & { author: User, ratings: any[] }) | null> {
    const { data, error } = await supabase
        .from('mods')
        .select(`
            *,
            author:users!mods_authorId_fkey(*),
            ratings(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching mod:', error);
        return null;
    }
    return data as (Mod & { author: User, ratings: any[] });
}

export async function createUser(data: {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
}): Promise<any> {
  const { data: newUser, error } = await supabase
    .from('users')
    .insert([data])
    .select()

  if (error) {
    console.error('Error creating user:', error);
    return null
  }
  return newUser[0];
}

export async function createMod(data: {
  id: string;
  name: string;
  description: string;
  authorId: string;
  version: string;
}): Promise<any> {
  const { data: newMod, error } = await supabase
    .from('mods')
    .insert([data])
      .select();

  if (error) {
    console.error('Error creating mod:', error);
    return null;
  }

  return newMod[0];
}
