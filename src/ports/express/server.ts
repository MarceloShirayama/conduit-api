import express, {
  NextFunction,
  Request as ExpressRequest,
  Response,
} from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import {
  addCommentToAnArticle,
  createArticle,
  createUser,
} from "../adapters/db";
import { JwtPayload, verifyToken } from "../adapters/jwt";
import { registerArticleAdapter } from "../../core/article/use-cases";
import { addCommentToAnArticleAdapter } from "../../core/comment/use-cases";
import { registerUserAdapter } from "../../core/user/use-cases";
import { getEnvironmentVariable } from "../../helpers";

type Request = { auth?: JwtPayload } & ExpressRequest;

const PORT = getEnvironmentVariable("PORT");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");
app.disable("etag");

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    registerUserAdapter(createUser),
    TE.map((result) => res.status(201).json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("authorization")?.split("Bearer ")[1] ?? "";
    const payload = await verifyToken(token);

    req.auth = payload;
    next();
  } catch (error) {
    res.status(401).json(getError("Unauthorized"));
  }
};

app.post("/api/articles", auth, async (req: Request, res: Response) => {
  const payload = req.auth ?? {};
  const data = { ...req.body.article, authorId: payload.id };

  pipe(
    data,
    registerArticleAdapter(createArticle),
    TE.map((result) => res.status(201).json(result)),
    TE.mapLeft((error) => res.status(400).json(getError(error.message)))
  )();
});

app.post(
  "/api/articles/:slug/comments",
  auth,
  async (req: Request, res: Response) => {
    const payload = req.auth ?? {};

    const { slug } = req.params;
    const { comment } = req.body;
    const data = {
      ...comment,
      authorId: payload.id,
      articleSlug: slug,
    };

    pipe(
      data,
      addCommentToAnArticleAdapter(addCommentToAnArticle),
      TE.map((result) => res.status(201).json(result)),
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
