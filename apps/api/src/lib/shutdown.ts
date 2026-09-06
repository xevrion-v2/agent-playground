import { Server } from "http";
export function registerShutdownHandlers(server:Server,timeoutMs=10000):void{
  const g=(sig:string)=>{
    console.log(`[${sig}] closing server`);
    server.close(()=>process.exit(0));
    setTimeout(()=>process.exit(1),timeoutMs).unref();
  };
  process.once("SIGTERM",()=>g("SIGTERM"));
  process.once("SIGINT",()=>g("SIGINT"));
}
export default registerShutdownHandlers;
