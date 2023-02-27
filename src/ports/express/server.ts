import express, { Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { register } from "../../adapters/use-cases/user/register-user-adapter";
import {
  userRegister,
  articleRegister as createArticleInDB,
} from "../../adapters/ports/db";
import { registerArticle } from "../../adapters/use-cases/article/register-article-adapter";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    register(userRegister),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post("/api/articles", async (req: Request, res: Response) => {
  pipe(
    req.body.article,
    registerArticle(createArticleInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));

function getError(errors: string) {
  return {
    errors: {
      body: errors.split(":::"),
    },
  };
}
