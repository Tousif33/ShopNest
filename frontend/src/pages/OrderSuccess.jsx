import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          No Order Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-5">
      <div className="bg-white shadow rounded-xl p-8 text-center">

        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4">
          Thank you for shopping with us.
        </p>

        <div className="mt-8 text-left space-y-3">

          <p>
            <strong>Order ID:</strong> {order._id}
          </p>

          <p>
            <strong>Payment ID:</strong> {order.paymentId}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Total Paid:</strong> ₹{order.amount}
          </p>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => navigate("/products")}
            className="flex-1 bg-pink-600 text-white py-3 rounded-lg"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="flex-1 border border-pink-600 text-pink-600 py-3 rounded-lg"
          >
            My Orders
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;