export type SupabaseUser = {
  full_name: string;
  username?: string;
  website?: string;
  avatar_url?: string;
};

export type JDOrder = {
  id: string;
  date: string;
  dueTime: string;
  items: JDItem[];
  coordinator: string;
};

export type JDItem = {
  name: string;
  ingredients: string[];
  price: number;
};