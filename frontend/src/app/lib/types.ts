export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  created_at: string;
  author_id: number;
}

export interface User {
  id: number;
  username: string;
}