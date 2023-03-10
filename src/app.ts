import { getEnvironmentVariable } from "./helpers";
import { startServer } from "./ports/adapters/http";

const PORT = Number(getEnvironmentVariable("SERVER_PORT"));
const HOST = getEnvironmentVariable("SERVER_HOST");

startServer(PORT, HOST);
