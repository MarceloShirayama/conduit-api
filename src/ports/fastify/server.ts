import fastify from "fastify";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { verifyToken } from "../../ports/adapters/jwt";

import {
  ArticleType,
  AuthorIdType,
  CreateArticleType,
} from "../../core/article/types";
import { CommentType } from "../../core/comment/types";
import { CreateUserType, LoginUserType } from "../../core/user/types";
import {
  addCommentToAnArticleHttpAdapter,
  createArticleHttpAdapter,
  loginUserHttpAdapter,
  registerUserHttpAdapter,
} from "../adapters/http/modules";

const app = fastify({ logger: true });

declare module "fastify" {
  interface FastifyRequest {
    auth?: { id: AuthorIdType; exp?: number };
  }
}

type IncomeMessageBody<T> = {
  Body: T;
};

type IncomeMessageBodyAndParams<T, U> = {
  Body: T;
  Params: U;
};

app.addHook("preValidation", async (req, reply) => {
  const url = req.raw.url ?? "";
  if (
    /^\/api\/articles/.test(url) ||
    /^\/api\/articles\/([a-z|-]+)\/comments/gm.test(url)
  ) {
    try {
      const token = req.headers.authorization?.replace("Token ", "") ?? "";
      const payload = await verifyToken(token);
      req.auth = payload;
    } catch (error) {
      reply.code(401).send("Unauthorized");
    }
  }
});

app.post<IncomeMessageBody<{ user: CreateUserType }>>(
  "/api/users",
  (req, reply) => {
    pipe(
      req.body.user,
      registerUserHttpAdapter,
      TE.map((result) => reply.code(201).send(result)),
      TE.mapLeft((result) => {
        reply.code(422).send(result);
      })
    )();
  }
);

app.post<IncomeMessageBody<{ user: LoginUserType }>>(
  "/api/users/login",
  (req, reply) => {
    pipe(
      req.body.user,
      loginUserHttpAdapter,
      TE.map((result) => reply.send(result)),
      TE.mapLeft((error) => reply.code(422).send(error))
    )();
  }
);

app.post<IncomeMessageBody<{ article: ArticleType }>>(
  "/api/articles",
  async (req, reply) => {
    if (req.auth) {
      const data: CreateArticleType = {
        ...req.body.article,
        authorId: req.auth?.id,
      };
      return pipe(
        data,
        createArticleHttpAdapter,
        TE.map((result) => reply.code(201).send(result)),
        TE.mapLeft((error) => reply.code(400).send(error))
      )();
    }
  }
);

app.post<
  IncomeMessageBodyAndParams<{ comment: CommentType }, { slug: string }>
>("/api/articles/:slug/comments", async (req, reply) => {
  if (req.auth) {
    const data = {
      ...req.body.comment,
      authorId: req.auth?.id,
      articleSlug: req.params.slug,
    };
    return pipe(
      data,
      addCommentToAnArticleHttpAdapter,
      TE.map((result) => reply.code(201).send(result)),
      TE.mapLeft((error) => reply.code(400).send(error))
    )();
  }
});

export const startServer = (port: number, host: string) => {
  try {
    app.listen({ port, host });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
