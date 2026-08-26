export interface BookEntity {
  isbn: string;
  title: string;
  author: string;
  status: "Currently Reading" | "Re-reading" | "Foundational";
  note: string;
  coverUrl?: string;
  pageCount?: number;
  publishYear?: string;
}

export interface AboutPageEntity {
  title: string;
  image?: string;
  imageAlt?: string;
  content: string;
  books?: BookEntity[];
}

