import { Application } from "express";

export function disableEtags(app: Application): void {
  app.set("etag", false);
}

export default disableEtags;
