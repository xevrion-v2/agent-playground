import express from "express";
import usersRouter from "./routes/users";
export function createApp(): express.Application {
  const app = express();
  app.disable("x-powered-by");
  app.set("etag",false);
  app.use(express.json({limit:process.env.BODY_LIMIT??"100kb"}));
  app.get("/health",(_req,res)=>{ res.setHeader("Cache-Control","no-store"); res.json({status:"ok",data:{service:"taskflow-api"}}); });
  app.use("/users",usersRouter);
  app.use((_req,res)=>res.status(404).json({error:{code:"NOT_FOUND",message:"endpoint not found"}}));
  return app;
}
export default createApp;
