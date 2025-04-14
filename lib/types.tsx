export type Game = {
  id: string;
  title: string;
  description: string;
  icon: string | { url: string };
};

export type Photo = {
  id: string;
  url: Array<{ url: string }>;
  game: { 
    id: string;
    title: string;
  };
  tags?: string[];
};