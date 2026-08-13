import { Router } from "express";
const router = Router();
const EM=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/;
router.get("/",(_, res)=>res.json({data:[]}));
router.post("/",(req,res)=>{
  const {name,email}=req.body;
  if(typeof name!=="string"||!name.trim()){res.status(400).json({error:{code:"VALIDATION_ERROR",message:"name required"}});return;}
  if(typeof email!=="string"||!EM.test(email)){res.status(400).json({error:{code:"VALIDATION_ERROR",message:"valid email required"}});return;}
  res.status(201).json({data:{id:"stub",name:name.trim(),email}});
});
export default router;
