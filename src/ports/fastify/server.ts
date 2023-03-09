import fastify from "fastify";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { CreateUserType, LoginUserType } from "../../core/user/types";
import { getEnvironmentVariable } from "../../helpers";
import {
  loginUserHttpAdapter,
  registerUserHttpAdapter,
} from "../adapters/http/modules";

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

export const startServer = () => {
  try {
    app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
