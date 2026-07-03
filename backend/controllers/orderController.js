import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate prices
    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const tax = Math.round(subtotal * 0.05);

    const shipping = subtotal >= 300 ? 0 : 50;

    const total = subtotal + tax + shipping;

    // Reduce stock
    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `${item.productId.productName} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.productName} is out of stock`,
        });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    // Fake Payment Id
    const paymentId = "PAY_" + Date.now();

    const order = await Order.create({
      user: userId,

      products: cart.items.map((item) => ({
        productId: item.productId._id,
        productName: item.productId.productName,
        productImage: item.productId.productImg[0]?.url,
        price: item.price,
        quantity: item.quantity,
      })),

      amount: total,

      tax,

      shipping,

      paymentStatus: "Paid",
      orderStatus: "Pending",

      paymentId,
    });

    // Clear Cart
    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.id,
    })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSalesStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const sales = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalSales = sales.length ? sales[0].totalSales : 0;

    const monthlySales = await Order.aggregate([
      {
        $match: {
      paymentStatus: "Paid",
    },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          totalSales: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const chartData = [
      { month: "Jan", sales: 0 },
      { month: "Feb", sales: 0 },
      { month: "Mar", sales: 0 },
      { month: "Apr", sales: 0 },
      { month: "May", sales: 0 },
      { month: "Jun", sales: 0 },
      { month: "Jul", sales: 0 },
      { month: "Aug", sales: 0 },
      { month: "Sep", sales: 0 },
      { month: "Oct", sales: 0 },
      { month: "Nov", sales: 0 },
      { month: "Dec", sales: 0 },
    ];

    monthlySales.forEach((item) => {
      chartData[item._id.month - 1].sales = item.totalSales;
    });

    return res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      chartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstName lastName email profilePic")
      .populate("products.productId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

   const order = await Order.findByIdAndUpdate(
  orderId,
  { orderStatus },
  { returnDocument: "after" }
);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};