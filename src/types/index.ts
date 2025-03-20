export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  validUntil: string;
  imageUrl?: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
} 