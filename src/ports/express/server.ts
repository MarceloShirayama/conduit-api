import cors from "cors";
import express, {
  NextFunction,
  Request as ExpressRequest,
  Response,
} from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { registerArticleAdapter } from "../../core/article/use-cases";
import { addCommentToAnArticleAdapter } from "../../core/comment/use-cases";
import { getEnvironmentVariable } from "../../helpers";
import { addCommentToAnArticle, createArticle } from "../adapters/db";
import { getError } from "../adapters/http";
import {
  loginUserHttpAdapter,
  registerUserHttpAdapter,
} from "../adapters/http/modules";
import { JwtPayload, verifyToken } from "../adapters/jwt";

type Request = { auth?: JwtPayload } & ExpressRequest;

const PORT = getEnvironmentVariable("PORT");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");
app.disable("etag");

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    registerUserHttpAdapter,
    TE.map((result) => res.status(201).json(result)),
    TE.mapLeft((error) => res.status(422).json(error))
  )();
});

app.post("/api/users/login", async (req: Request, res: Response) => {
  const data = req.body.user;
  pipe(
    data,
    loginUserHttpAdapter,
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(422).json(error))
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

export const startServer = () => {
  app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));
};
