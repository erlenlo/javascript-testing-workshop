import express from "express";
import articles from "./articles";
import bodyParser from "body-parser";
import cors from "cors";
import authorize from "./authorize";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(authorize());

app.get("/articles", articles.getAllArticles);
app.get("/articles/:id", articles.getArticle);
app.post("/articles", articles.newArticle);
app.post("/articles/:id/favorite", articles.favorite);
app.put("/articles/:id", articles.updateArticle);
app.delete("/articles/:id/favorite", articles.unfavorite);
app.delete("/articles/:id", articles.deleteArticle);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
