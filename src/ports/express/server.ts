import express, { Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import {
  addCommentToAnArticleInDB,
  createArticleInDB,
  createUserInDB,
} from "../../adapters/ports/db";
import { addCommentToAnArticleAdapter } from "../../adapters/use-cases/article/add-comment-to-an-article-adapter";
import { registerArticleAdapter } from "../../adapters/use-cases/article/register-article-adapter";
import { registerUser } from "../../adapters/use-cases/user/register-user-adapter";
import { getEnvironmentVariable } from "./../../helpers";

const PORT = getEnvironmentVariable("PORT");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    registerUser(createUserInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post("/api/articles", async (req: Request, res: Response) => {
  pipe(
    req.body.article,
    registerArticleAdapter(createArticleInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post(
  "/api/articles/:slug/comments",
  async (req: Request, res: Response) => {
    pipe(
      req.body.comment,
      addCommentToAnArticleAdapter(addCommentToAnArticleInDB),
      TE.map((result) => res.json(result)),
      TE.mapLeft((error) => res.status(400).json(getError(error.message)))
    )();
  }
);

app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));

function getError(errors: string) {
  return {
    errors: {
      body: errors.split(":::"),
    },
  };
}
