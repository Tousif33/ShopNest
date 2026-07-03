import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { MultipleUpload } from "../middleware/multer.js";
import { addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, MultipleUpload, addProduct);
router.get("/getallproducts", getAllProduct);
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProduct);
router.put(
  "/update/:productId",
  isAuthenticated,
  isAdmin,
  MultipleUpload,
  updateProduct,
);
router.post("/add-to-cart", isAuthenticated, addToCart);

export default router;
