import React, { useState } from "react";
import api from "../api/axios"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("UPI");

  const accessToken = localStorage.getItem("accessToken");

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await api.post(
        "/order/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Payment Successful");
        dispatch(
          setCart({
            items: [],
            totalPrice: 0,
          }),
        );

        navigate("/order-success", {
          state: {
            order: res.data.order,
          },
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-5">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Payment</h1>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />
            UPI
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={method === "Card"}
              onChange={() => setMethod("Card")}
            />
            Credit / Debit Card
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={method === "NetBanking"}
              onChange={() => setMethod("NetBanking")}
            />
            Net Banking
          </label>
        </div>

        <button
          disabled={loading}
          onClick={handlePayment}
          className="w-full mt-8 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg"
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
