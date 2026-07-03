
import React, { useEffect, useState } from "react";
import api from "../api/axios"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShowUserOrders = () => {
   
  const navigate = useNavigate()
  const { userId } = useParams();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await api.get(
        `/order/user-orders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="pl-[350px] py-20">
        <h1 className="text-2xl font-bold">
          This user has not placed any orders.
        </h1>
      </div>
    );
  }

 return (
  <div className="pl-[350px] py-20 pr-10">

    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <Button
        variant="outline"
        onClick={() => navigate("/dashboard/users")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Button>

      <h1 className="text-3xl font-bold">User Orders</h1>

      {/* Empty div keeps the heading centered */}
      <div className="w-32"></div>
    </div>

    {orders.map((order) => (
      <div
        key={order._id}
        className="bg-white rounded-xl shadow-md border p-6 mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-lg">
              Order ID: {order._id}
            </h2>

            <p className="text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            {order.status}
          </span>
        </div>

        <h3 className="font-semibold mb-3">
          Total: ₹{order.amount}
        </h3>

        <div className="space-y-4">
          {order.products.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-5 border rounded-lg p-3"
            >
              <img
                src={item.productId.productImg[0].url}
                alt=""
                className="w-20 h-20 rounded-lg object-cover border"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {item.productId.productName}
                </h3>

                <p className="text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
};

export default ShowUserOrders;