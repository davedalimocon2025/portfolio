export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string; // Optional, as it might be null or empty
  published: boolean;
  createdAt: string; // ISO 8601 string for LocalDateTime
  updatedAt: string; // ISO 8601 string for LocalDateTime
}