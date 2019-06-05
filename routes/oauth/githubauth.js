const express = require("express");
const router = express.Router();
const db = require("../../DATA/helpers/usersDb");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/oauth", async (req, res, next) => {
  let user = req.body;
  let password = user.token;
  console.log(password);
  const hash = crypt.hashSync(password, 10);

  const huser = {
    name: user.name,
    email: user.email,
    password: hash
  };
  if (db.getByEmail(huser.email)) {
    const jtoken = jwt.sign(
      {
        sub: user.email,
        name: user.name
      },
      "mysupersecretkey",
      { expiresIn: "3 hours" }
    );

 let user = req.body
 let password = user.token

 
 const hash = crypt.hashSync(password, 10);
 
 
 const huser = {
     name: user.name,
     email: user.email,
     password:hash
    }
    // console.log(huser)

 if (db.getByEmail(huser.email)){
    
    
    const jtoken = jwt.sign({
        sub:user.email,
        name:user.name
   
    },"mysupersecretkey",{expiresIn:"3 hours"})
     
     return res.status(200)
     .send({jtoken});
    }
 try {
 const userO  = await db.insert(huser);
 
 res.status(200).json(userO);
 } catch (error){
     res.status(500).json({
        message: 'Error registering the User try alternative login method'
     })
 }
})

router.post('/login',async (req, res) => {

    let user = req.body
    
    let password = user.token
   
    
    const hash = crypt.hashSync(password, 10);
    
    
    const huser = {
        name: user.name,
        email: user.email,
        password:hash
       }
       // console.log(huser)
   
    if (db.getByEmail(huser.email)){
       
       
       const jtoken = jwt.sign({
           sub:user.email,
           name:user.name
      
       },"mysupersecretkey",{expiresIn:"3 hours"})
        
        return res.status(200)
        .send({jtoken});
       }
    try {
    const userO  = await db.insert(huser);
    
    res.status(200).json(userO);
    } catch (error){
        res.status(500).json({
           message: 'Error registering the User try alternative login method'
        })
    }
   })
    
module.exports = router;

