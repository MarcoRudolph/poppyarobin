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
