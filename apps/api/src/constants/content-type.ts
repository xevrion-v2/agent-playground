export const contentTypes = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded',
  multipart: 'multipart/form-data',
  text: 'text/plain',
  html: 'text/html',
} as const;

export type ContentType = typeof contentTypes[keyof typeof contentTypes];

export const contentTypeValues = Object.values(contentTypes);