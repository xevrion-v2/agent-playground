import { Server } from "http";
export function attachShutdownListeners(server:Server,drainMs=10000):void{
  const stop=(sig:NodeJS.Signals)=>{
    process.stdout.write(`\n[${sig}] graceful shutdown\n`);
    server.close(()=>process.exit(0));
    setTimeout(()=>process.exit(1),drainMs).unref();
  };
  process.once("SIGTERM",stop);
  process.once("SIGINT",stop);
}
export default attachShutdownListeners;
