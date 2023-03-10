declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      SERVER_HOST: string;
      JWT_SECRET: string;
    }
  }
}

export {};
