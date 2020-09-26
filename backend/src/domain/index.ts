export type Tag = string;

export type User = {
  username: string;
};

export type Article = {
  id: string;
  title: string;
  text: string;
  author: User;
  tags: Tag[];
  createdAt: Date;
  favoritedBy: User[];
};
