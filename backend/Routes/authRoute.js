const express = require("express")
const route =express.Router();
const authRouter= require("../controllers/authController")

route.post("/register",authRouter.register);
route.post("/login",authRouter.login);

module.exports=route;