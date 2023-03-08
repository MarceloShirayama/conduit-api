import fastify from "fastify";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { getEnvironmentVariable } from "../../helpers";

import { registerUserAdapter } from "../../core/user/use-cases";
import { createUser } from "../adapters/db";
import { CreateUserType, UserType } from "../../core/user/types";

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
    registerUserAdapter(createUser),
    TE.map((result) => reply.code(201).send(result)),
    TE.mapLeft((error) => {
      reply.code(422).send(getError(error.message));
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

function getError(errors: string) {
  return {
    errors: {
      body: errors.split(":::"),
    },
  };
}
