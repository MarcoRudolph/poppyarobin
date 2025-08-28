// util/types.ts
export type VorschlagType = {
  id: number;
  themaId: number;
  text: string;
  ueberschrift: string;
  likes: number;
  comments: number;
};

export type CommentType = {
  id: number;
  vorschlagId: number;
  userId: number; // Changed from string to number
  text: string;
  likes: number;
  userName: string | null;
  userImage?: string | null;
};

export type ThemaType = {
  id: number;
  name: string;
  vorschlaege: VorschlagType[];
};

// Supabase Auth types
export interface SupabaseUser {
  id: string;
  email: string | null;
  // Add more fields as needed from Supabase user object
}

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  // Add more fields as needed from Supabase session object
}
