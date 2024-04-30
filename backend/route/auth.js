const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "valarmorghulis";

//create a new user
router.post(
  "/register",
  [
    body("username", "Invalid name").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
    
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password,profilephoto,coverphoto,desc,city,from,relationship } = req.body;
      //verify if the user with same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(password, salt);
      //create a new user
      user = new User({ username, email, password: hashpass,profilephoto,coverphoto,desc,city,from,relationship});
      await user.save();

      let data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.status(200).json(authtoken);
      console.log(authtoken);
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send("Error adding data to MongoDB");
    }
  }
);
//login the user
router.post('/login',[
    body("email", "Invalid email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ], 
    async(req,res)=>{
        //validate error from body
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try {
        let user = await User.findOne({email});
        if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
      const comparepass=await bcrypt.compare(password,user.password)
      if(!comparepass){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
      const data={
        user:{id:user.id}
      }
      const authtoken=jwt.sign(data,JWT_SECRET)
      // res.status(200).json({authtoken})
      res.status(200).json(user)

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        
    }
  }



)




module.exports = router;
