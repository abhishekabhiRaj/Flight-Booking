export interface Blog {
  id: string;
  header: string;
  description: string;
  imageUrl?: string;
  imageFileId?: string;
  category: string;
  readTime?: number;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  shareCount: number;
}

export type BlogFormData = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'shareCount'>; 