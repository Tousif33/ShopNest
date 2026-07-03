import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products:[
        {
          productId : { type :mongoose.Schema.Types.ObjectId, ref :"Product" , required : true},
          quantity : {type:Number ,required:true}

        }
    ],
    
    amount: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    currency: { type: String, default: "INR" },
     paymentStatus: {
  type: String,
  enum: ["Pending", "Paid", "Failed", "Refunded"],
  default: "Pending",
},

orderStatus: {
  type: String,
  enum: [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ],
  default: "Pending",
},
    paymentId: { type: String },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
