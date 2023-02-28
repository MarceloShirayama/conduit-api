import express, { Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import * as db from "../../adapters/ports/db";
import * as article from "../../adapters/use-cases/article";
import * as user from "../../adapters/use-cases/user";
import * as helpers from "./../../helpers";

const PORT = helpers.getEnvironmentVariable("PORT");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    user.registerUser(db.createUserInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post("/api/articles", async (req: Request, res: Response) => {
  pipe(
    req.body.article,
    article.registerArticleAdapter(db.createArticleInDB),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post(
  "/api/articles/:slug/comments",
  async (req: Request, res: Response) => {
    pipe(
      req.body.comment,
      article.addCommentToAnArticleAdapter(db.addCommentToAnArticleInDB),
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
