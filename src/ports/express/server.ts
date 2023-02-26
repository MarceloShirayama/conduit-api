import express, { Request, Response } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

import {
  OutsideRegisterType,
  register,
} from "../../adapters/user/register-adapter";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const registerOk: OutsideRegisterType = async (data) => {
  return {
    success: true,
    data,
  };
};

app.post("/api/users", async (req: Request, res: Response) => {
  pipe(
    req.body.user,
    register(registerOk),
    TE.map((result) => res.json(result)),
    TE.mapLeft((error) => res.status(400).json({ error: error.message }))
  )();
});

app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));
