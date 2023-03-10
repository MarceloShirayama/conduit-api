export type ResponseError = {
  errors: {
    body: string[];
  };
};

export function getError(error: string): ResponseError {
  return {
    errors: {
      body: error.split(":::"),
    },
  };
}
