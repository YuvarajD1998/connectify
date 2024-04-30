const express=require('express')
const app=express()
const helmet=require('helmet')
const morgan=require('morgan')
const mongoose =require('mongoose')
const auth=require('./route/auth')
const users=require('./route/users')
const posts=require('./route/posts')
const cors=require('cors')
const multer = require("multer");
const path=require("path")

const port=5000
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/connectify')
.then(() => console.log('Connected to MongoDb!'));

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use('/api/auth',auth)
app.use('/api/users',users)
app.use('/api/posts',posts)




app.listen(port,()=>{
    console.log(`localhost:${port}`)
})