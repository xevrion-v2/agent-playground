import { RequestHandler } from "express";
const EMAIL_RE=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/;
export const validateCreateUser: RequestHandler=(req,res,next)=>{
  const {name,email}=req.body;
  if(typeof name!=="string"||name.trim().length===0){res.status(400).json({error:{code:"VALIDATION_ERROR",message:"name required"}});return;}
  if(typeof email!=="string"||!EMAIL_RE.test(email)){res.status(400).json({error:{code:"VALIDATION_ERROR",message:"valid email required"}});return;}
  next();
};
export default validateCreateUser;
