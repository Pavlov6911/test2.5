export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture: string | null;
  bio: string | null;
  theme: string;
  created_at: string;
}
