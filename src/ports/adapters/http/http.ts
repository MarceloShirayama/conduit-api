export function getError(error: string) {
  return {
    errors: {
      body: error.split(":::"),
    },
  };
}
