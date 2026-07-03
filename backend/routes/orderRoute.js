import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import { createOrder } from "../controllers/orderController.js";
import { getMyOrders } from "../controllers/orderController.js";
import { getSalesStats } from "../controllers/orderController.js";
import { getOrdersByUserId } from "../controllers/orderController.js";
import { getAllOrders } from "../controllers/orderController.js";
import { updateOrderStatus } from "../controllers/orderController.js";
const router = express.Router();

router.post("/create", isAuthenticated, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);
router.get("/sales", isAuthenticated, isAdmin, getSalesStats);
router.get("/user-orders/:userId", isAuthenticated, isAdmin, getOrdersByUserId);
router.get("/all-orders", isAuthenticated, isAdmin, getAllOrders);
router.put(
  "/update-status/:orderId",
  isAuthenticated,
  isAdmin,
  updateOrderStatus,
);

export default router;
