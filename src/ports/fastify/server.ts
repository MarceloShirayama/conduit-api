import fastify from "fastify";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { getEnvironmentVariable } from "../../helpers";

import { CreateUserType } from "../../core/user/types";
import { registerUserHttpAdapter } from "../adapters/http/modules";

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

export const startServer = () => {
  try {
    app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
