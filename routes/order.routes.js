import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../controllers/order.controller.js";
import { authUser } from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.get("/seller", authSeller, getAllOrders);
router.get("/user", authUser, getUserOrders);
router.post("/cod", authUser, placeOrderCOD);

export default router;
