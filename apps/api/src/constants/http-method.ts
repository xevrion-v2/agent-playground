export const httpMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
} as const;

export type HttpMethod = (typeof httpMethods)[keyof typeof httpMethods];
