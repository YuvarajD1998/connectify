const router = require("express").Router();
const User = require("../model/User");
// const jwt = require("jsonwebtoken");
// const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var fetchuser = require("../middleware/fetchuser");
const { json } = require("react-router-dom");

const JWT_SECRET = "valarmorghulis";
//get the user

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete the user
router.delete("/delete", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    console.log(userId)
    if (!userId) {
      return res.status(404).send("Not Found");
    }
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({ Success: "Note has been deleted", user: user });
  } catch (error) {}
});

//update an existing user
router.put("/updateuser/:id",fetchuser, async (req, res) => {
  if(req.user.id===req.params.id){
  let user = await User.findById(req.params.id);
  console.log(user)
  if (!user) {
    return res.status(404).send("Not Found");
  }

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ "Account has been updated": "success", user: user });

}
else{
    return res.status(403).json("You can update only your account!");
}
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilephoto} = friend;
      friendList.push({ _id, username, profilephoto });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});


//get all users
router.get("/allusers", async (req, res) => {

  try {
    const user=await User.find({}).select('-password');
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Check if current user follows a specific user
router.get('/:id/followed', async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id); // Assuming you're using JWT and the user ID is in req.user.id
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    const isFollowed = user.followers.includes(currentUser._id);
    res.status(200).json(isFollowed);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports=router;