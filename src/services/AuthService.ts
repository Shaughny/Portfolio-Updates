import { Request,Response,NextFunction } from "express"
const validateCookie = (req:Request, res:Response, next:NextFunction) =>{
    const {cookies} = req;
    if('session_id' in cookies){
        console.log("Session ID exists");
        if(cookies.session_id === '123456'){
            next();
        }else{
            res.status(403).send({msg: "Not Authorized"});
        }
    }else{
        res.status(403).send({ msg: "Not Authorized" });
    }
}


const validateUser = (req:Request, res:Response, next:NextFunction) => {
    
}

module.exports = {

    validateCookie
}