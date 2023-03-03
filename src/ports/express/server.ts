import express, { NextFunction, Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import * as db from "../../adapters/ports/db";
import * as article from "../../adapters/use-cases/article";
import * as comment from "../../adapters/use-cases/comment";
import * as user from "../../adapters/use-cases/user";
import * as helpers from "./../../helpers";

const PORT = helpers.getEnvironmentVariable("PORT");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");
app.disable("etag");

//public

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    user.registerUserAdapter(db.createUser),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

// private

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   res.json("parou");
// };

app.post("/api/articles", async (req: Request, res: Response) => {
  pipe(
    req.body.article,
    article.registerArticleAdapter(db.createArticle),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post(
  "/api/articles/:slug/comments",
  async (req: Request, res: Response) => {
    pipe(
      req.body.comment,
      comment.addCommentToAnArticleAdapter(db.addCommentToAnArticle),
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
