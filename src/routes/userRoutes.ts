import express from 'express';
import { Request, Response } from 'express';
import session from 'express-session';
import { checkSchema } from 'express-validator';
const {createUser,getAllUsers,deleteUser,updateUser} = require('../controllers/UserController')
const {validateCookie} = require('../services/AuthService');
const router = express.Router();
const {body, check, validationResult} = require('express-validator');

router.get('/get', getAllUsers);

router.get('/signin',(req: Request, res: Response) => {
    res.cookie('session_id',123456);
    res.status(200).json({msg: "Signed in!"});

})

router.get('/protected',validateCookie,(req:Request,res:Response) => {
    res.status(200).json({msg:"You are Authorized"});
});

router.post('/login', (req:Request, res:Response) => {
    console.log(req.sessionID);
    const {username, password} = req.body;
    console.log(req.body);
    let session = req.session;
  
    if(username && password){
        if(req.session.authenticated){
            res.json(req.session);
        }else{
            if(password === '123'){
                req.session.authenticated = true;
                req.session.user = {
                    username,password
                };
                res.json(req.session);
            } else{
                res.status(403).json({msg:"bad credentials"});
            }
        }
    }
    else{
        res.status(403).json({ msg: "bad credentials" });
    }


})

router.post('/',[
    body('username').notEmpty().withMessage("Username can't be empty"),
    body('password').notEmpty().withMessage("Password can't be empty").isLength({min: 6}).withMessage("Password must be atleast 6 characters long"),
    check('email').isEmail().withMessage("Must use a valid email")

], createUser);

router.delete('/:id',deleteUser )

router.put('/', updateUser)

module.exports = router;