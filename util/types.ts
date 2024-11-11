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
  userId: string;
  text: string;
  likes: number;
};

export type ThemaType = {
  id: number;
  name: string;
  vorschlaege: VorschlagType[];
};
