import fastify from "fastify";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { verifyToken } from "../../ports/adapters/jwt";

import {
  ArticleType,
  AuthorIdType,
  CreateArticleType,
} from "../../core/article/types";
import { CreateUserType, LoginUserType } from "../../core/user/types";
import { getEnvironmentVariable } from "../../helpers";
import {
  addCommentToAnArticleHttpAdapter,
  createArticleHttpAdapter,
  loginUserHttpAdapter,
  registerUserHttpAdapter,
} from "../adapters/http/modules";
import { CommentType } from "../../core/comment/types";

declare module "fastify" {
  interface FastifyRequest {
    auth?: { id: AuthorIdType; exp?: number };
  }
}

const app = fastify({ logger: true });

const PORT = Number(getEnvironmentVariable("PORT"));

type CreateUserApi = {
  Body: {
    user: CreateUserType;
  };
};

app.post<CreateUserApi>("/api/users", (req, reply) => {
  pipe(
    req.body.user,
    registerUserHttpAdapter,
    TE.map((result) => reply.code(201).send(result)),
    TE.mapLeft((result) => {
      reply.code(422).send(result);
    })
  )();
});

type LoginUserApi = {
  Body: {
    user: LoginUserType;
  };
};

app.post<LoginUserApi>("/api/users/login", (req, reply) => {
  pipe(
    req.body.user,
    loginUserHttpAdapter,
    TE.map((result) => reply.send(result)),
    TE.mapLeft((error) => reply.code(422).send(error))
  )();
});

app.addHook("preValidation", async (req, reply) => {
  const url = req.raw.url ?? "";
  if (
    /^\/api\/articles/.test(url) ||
    /^\/api\/articles\/([a-z|-]+)\/comments/gm.test(url)
  ) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "") ?? "";
      const payload = await verifyToken(token);
      req.auth = payload;
    } catch (error) {
      reply.code(401).send("Unauthorized");
    }
  }
});

type CreateArticleApi = {
  Body: {
    article: ArticleType;
  };
};

app.post<CreateArticleApi>("/api/articles", async (req, reply) => {
  const auth = req.auth;
  if (auth) {
    const data: CreateArticleType = {
      ...req.body.article,
      authorId: auth.id,
    };
    return pipe(
      data,
      createArticleHttpAdapter,
      TE.map((result) => reply.code(201).send(result)),
      TE.mapLeft((error) => reply.code(400).send(error))
    )();
  }
});

type AddCommentApi = {
  Body: {
    comment: CommentType;
  };
  Params: {
    slug: string;
  };
};

app.post<AddCommentApi>("/api/articles/:slug/comments", async (req, reply) => {
  const auth = req.auth;
  const slug = req.params.slug;
  const { comment } = req.body;
  if (auth) {
    const data = {
      ...comment,
      authorId: auth.id,
      articleSlug: slug,
    };
    return pipe(
      data,
      addCommentToAnArticleHttpAdapter,
      TE.map((result) => reply.code(201).send(result)),
      TE.mapLeft((error) => reply.code(400).send(error))
    )();
  }
});

export const startServer = () => {
  try {
    app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
