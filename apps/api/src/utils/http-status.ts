export const httpStatus = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  validationError: 422,
  internalServerError: 500,
} as const;

export type HttpStatusName = keyof typeof httpStatus;