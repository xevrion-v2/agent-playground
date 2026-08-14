export const contentTypes = {
  json: "application/json",
  form: "application/x-www-form-urlencoded",
  text: "text/plain",
} as const;

export type ContentType = (typeof contentTypes)[keyof typeof contentTypes];
