import { Response } from "express";
import { User } from "../domain";

const MAX_TITLE_LENGTH = 280;
const MAX_TEXT_LENGTH = 5000;
const MAX_NUMBER_OF_TAGS = 50;
const MAX_TAG_LENGTH = 30;
const MAX_USERNAME_LENGTH = 30;

export const validateArticle = (
  article: any | undefined,
  res: Response,
  consume: (Article: any) => void
): void => {
  if (!article) {
    res.status(400).send("Article is missing");
  } else if (!article.title) {
    res.status(400).send("Article title missing");
  } else if (!isString(article.title)) {
    res.status(400).send("Article title must be a string");
  } else if (!hasMaxLength(article.title, MAX_TITLE_LENGTH)) {
    res.status(400).send("Article title too long");
  } else if (article.text && !isString(article.text)) {
    res.status(400).send("Article text must be a string");
  } else if (article.text && !hasMaxLength(article.text, MAX_TEXT_LENGTH)) {
    res.status(400).send("Article text is too long");
  } else if (article.tags && !(article.tags instanceof Array)) {
    res.status(400).send("Article tags must be an array");
  } else if (article.tags && !hasMaxLength(article.tags, MAX_NUMBER_OF_TAGS)) {
    res.status(400).send("Article has too many tags");
  } else if (article.tags && !article.tags.every(tagIsValid)) {
    res.status(400).send("One or more tags are invalid");
  } else {
    consume({
      title: article.title,
      tags: article.tags || [],
      text: article.text || "",
    });
  }
};

const tagIsValid = (tag: any): boolean =>
  isString(tag) && tag && hasMaxLength(tag, MAX_TAG_LENGTH);

const isString = (s: any) => typeof s === "string";

export const validateUsername = (
  username: string | undefined,
  res: Response,
  consume: (user: User) => void
): void => {
  if (!username) {
    res.status(400).send("Missing username");
  } else if (!hasMaxLength(username, MAX_USERNAME_LENGTH)) {
    res.status(400).send("Username too long");
  } else {
    consume({ username });
  }
};

const hasMaxLength = (iterable: string | any[], len: number): boolean =>
  iterable.length <= len;
