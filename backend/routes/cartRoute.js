import express from "express";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.get("/", isAuthenticated, getCart);

router.post("/add", isAuthenticated, addToCart);

router.put("/update", isAuthenticated, updateQuantity);

router.delete("/remove", isAuthenticated,removeFromCart);



export default router;  