import express from "express";
import { userController } from "../routes";
import { uploadMiddleWare } from "../utils/formidable";
import { isLoggedInApi } from "../utils/guard";

export const userRoutes = express.Router();

userRoutes.post("/login", userController.login)
userRoutes.put("/logout", isLoggedInApi, userController.logout)
// userRoutes.put("/logoutCheck", userController.logout)

userRoutes.post("/register", userController.register)

userRoutes.get("/profile", isLoggedInApi, userController.getProfileInfo)

userRoutes.put("/updateProfile", isLoggedInApi, uploadMiddleWare, userController.updateUserInfo)
