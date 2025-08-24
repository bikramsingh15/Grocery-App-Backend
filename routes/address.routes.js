import express from "express";
import { addAddress, getAddress } from "../controllers/address.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();

router.get("/get", authUser, getAddress);
router.post("/add", authUser, addAddress);

export default router;
