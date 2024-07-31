// imported express
const express = require("express");
//created a router
const router = express.Router();
//used job schema by this line
const jobmodelData = require("./Models/jobmodel");
//used user schema by this line
const usermodelData = require("./Models/usermodel");
//used application schema by this line
const applicationmodelData = require("./Models/applicationmodel");

//Get Basic Information of API
router.get("/", async (req, res) => {
  return res
    .status(200)
    .send(
      "<h1>Welcome This is Job Portal API</h1>  <h3>If you want to get data regarding users, use /users</h3>  <h3>If you want to send user data to database, use /register</h3> " +
        "<h3>If you want to send multiple users data to database, use /registerusers</h3> <h3>If you want to get user data based on specific roleType, use /users/:roleType</h3> " +
        "<h3>If you want to update user data, use /updateuser/:userName</h3> <h3>If you want to delete user data, use /deleteuser/:userName</h3>"
    );
});

//Register Multiple Users
router.post("/registerusers", async (req, res) => {
  let usersdata = req.body.users;
  const createdUsers = [];
  const errors = [];
  try {
    for (const userdata of usersdata) {
      let data = await usermodelData.findOne({ userName: userdata.userName });
      if (data == null) {
        let user = new usermodelData(userdata);
        console.log(user,"user")
        try {
          const savedUser = await user.save();
          createdUsers.push(savedUser);
        } catch (err) {
          errors.push({ userdata, err: err.message });
        }
      }
      else {
        errors.push("User exists with same UserName of "+userdata.userName)
      }
    }
    return res.status(201).json({ createdUsers, errors });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

//Add User Data or Register User
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let data = await usermodelData.findOne({ userName: req.body.userName });
    console.log(data);
    if (data == null) {
      let user = new usermodelData(req.body);
      await user.save();
      return res.status(200).send("Successfully registered");
    } else {
      return res.status(409).send("User Already Exists with Same UserName");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//User Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let data = await usermodelData.findOne({ userName: req.body.userName });
    console.log(data);
    if (data != null) {
      if (
        req.body.password === data.password &&
        req.body.email === data.email &&
        req.body.roleType === data.roleType
      ) {
        return res.status(200).send("Successfully Loggedin");
      } else {
        return res.status(401).send("Trying to Login with Wrong Credentials");
      }
    } else {
      return res
        .status(404)
        .send("User Doesn't Exists. Please Register Yourself");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//Get User Data
router.get("/users", async (req, res) => {
  try {
    var result = await usermodelData.find({});
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//Get User Data by roleType
router.get("/users/:roleType", async (req, res) => {
  try {
    var result = await usermodelData.find({ roleType: req.params.roleType });
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//Update User Data
router.put("/updateuser/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const { password, email, roleType } = req.body;
    // Find the user by ID and update the profile
    const user = await usermodelData.findOneAndUpdate(
      { userName },
      { password, email, roleType },
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete User Data
router.delete("/deleteuser/:userName", async (req, res) => {
  const userName = req.params.userName;
  let data = await usermodelData.findOne({ userName: userName });
  console.log(data);
  if (data != null) {
    const deletedUser = await usermodelData.findOneAndDelete({ userName });
    if (!deletedUser) {
      console.log(`User with userName ${userName} not found`);
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`Successfully deleted user with userName: ${userName}`);
    res.json({ message: "User deleted successfully" });
  } else {
    return res.status(404).send("User Doesn't Exists");
  }
});

//Add Job Data
router.post("/addjob", async (req, res) => {
  console.log(req.body);
  try {
    let data = await jobmodelData.findOne({
      title: req.body.title,
      companyName: req.body.companyName,
    });
    console.log(data);
    if (data == null) {
      let user = new jobmodelData(req.body);
      await user.save();
      return res.status(200).send("Successfully added");
    } else {
      return res
        .status(409)
        .send("Job Already Exists with Same JobName and Company");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
});

//Add Multiple Jobs Data
router.post("/addjobs", async (req, res) => {
  console.log(req.body);
  try {
    let data = await jobmodelData.findOne({
      title: req.body.title,
      companyName: req.body.companyName,
    });
    console.log(data);
    if (data == null) {
      let user = new jobmodelData(req.body);
      await user.save();
      return res.status(200).send("Successfully added");
    } else {
      return res
        .status(409)
        .send("Job Already Exists with Same JobName and Company");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
});

//Get Jobs Data
router.get("/jobs", async (req, res) => {
  try {
    var result = await jobmodelData.find({});
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//Get Jobs Data By Job Name and Company Name
router.get("/jobs/:title/:companyName", async (req, res) => {
  try {
    var result = await jobmodelData.find({
      title: req.params.title,
      companyName: req.params.companyName,
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
