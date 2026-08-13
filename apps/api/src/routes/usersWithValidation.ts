import { Router } from "express";
const router=Router();
const EM=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const bad=(res:any,msg:string)=>res.status(400).json({error:{code:"VALIDATION_ERROR",message:msg}});
router.get("/",(_, res)=>res.json({data:[]}));
router.post("/",(req,res)=>{
  const {name,email}=req.body??{};
  if(typeof name!=="string"||!name.trim()) return bad(res,"name required");
  if(typeof email!=="string"||!EM.test(email)) return bad(res,"valid email required");
  res.status(201).json({data:{id:"stub",name:name.trim(),email:email.toLowerCase()}});
});
export default router;
