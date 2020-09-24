import { Request, Response } from "express";
import { Article, Tag } from "../domain";
import { validateArticle } from "./validation";
const MAX_ARTICLES = 100;

let id = 0;
const articles: Article[] = [];

const getAllArticles = (req: Request, res: Response): void => {
  const tag = req.params.tag as Tag | undefined;

  const response = tag
    ? articles.filter((art) => art.tags.includes(tag))
    : articles;

  res.send(response);
};

const getArticle = (req: Request, res: Response): void =>
  withArticle(req.params.id, res, (article) => res.send(article));

const newArticle = (req: Request, res: Response): void =>
  validateArticle(req.body, res, (article) => {
    articles.push({
      ...article,
      id: `${id++}`,
      author: { username: username(req) },
      favoritedBy: [],
      createdAt: new Date(Date.now()),
    });

    if (articles.length > MAX_ARTICLES) {
      articles.splice(0, 1);
    }

    res.send(articles[articles.length - 1]);
  });

const favorite = (req: Request, res: Response): void =>
  withArticle(req.params.id, res, (article) => {
    const user = username(req);
    article.favoritedBy = [
      ...article.favoritedBy.filter((u) => u.username !== user),
      { username: user },
    ];

    res.send(article);
  });

const updateArticle = (req: Request, res: Response): void =>
  withArticle(req.params.id, res, (article) =>
    validateArticle(req.body, res, (newArticle) => {
      if (article.author.username === username(req)) {
        articles.splice(
          articles.findIndex((art) => art.id === article.id),
          1
        );

        articles.push({
          ...article,
          ...newArticle,
        });

        res.send(articles[articles.length - 1]);
      } else {
        res.status(401).send("Cannot update other user's article");
      }
    })
  );

const unfavorite = (req: Request, res: Response): void =>
  withArticle(req.params.id, res, (article) => {
    const index = article.favoritedBy.findIndex(
      (user) => user.username === username(req)
    );

    if (index >= 0) {
      article.favoritedBy.splice(index, 1);
      res.send(article);
    } else {
      res.status(400).send("Article not favorited by user");
    }
  });

const deleteArticle = (req: Request, res: Response): void =>
  withArticle(req.params.id, res, (article) => {
    if (article.author.username == username(req)) {
      articles.splice(
        articles.findIndex((art) => art.id === article.id),
        1
      );

      res.send(article);
    } else {
      res.status(401).send("Cannot delete another user's article");
    }
  });

const username = (req: Request): string => {
  if (!req.headers.authorization) {
    throw new Error("Expected user to be authorized at this point");
  }
  return req.headers.authorization;
};

const withArticle = (
  id: string | undefined,
  res: Response,
  consume: (article: Article) => void
) => {
  const article = articles.find((art) => art.id === id);

  if (article) consume(article);
  else res.status(404).send("Article not found");
};

export default {
  getAllArticles,
  getArticle,
  newArticle,
  favorite,
  updateArticle,
  unfavorite,
  deleteArticle,
};
