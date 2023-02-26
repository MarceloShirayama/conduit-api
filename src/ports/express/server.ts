import express, { Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import { register } from "../../adapters/use-cases/user/register-adapter";
import { userRegister } from "../../adapters/ports/db";

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

app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));

function getError(errors: string) {
  return {
    errors: {
      body: errors.split(":::"),
    },
  };
}
