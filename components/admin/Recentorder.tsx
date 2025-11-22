"use client";

import React from "react";

const orders = [
  {
    id: "#ORD-2847",
    name: "Emma Schmidt",
    product: "Custom T-Shirt",
    status: "Processing",
    price: "€34.99",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "#ORD-2846",
    name: "Lucas Müller",
    product: "AI Design Mug",
    status: "Completed",
    price: "€19.99",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "#ORD-2845",
    name: "Sophie Weber",
    product: "Custom Cap",
    status: "Shipped",
    price: "€24.99",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "#ORD-2844",
    name: "Noah Fischer",
    product: "Letter Design T-Shirt",
    status: "Processing",
    price: "€34.99",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "#ORD-2843",
    name: "Mia Becker",
    product: "AI Art Hoodie",
    status: "Completed",
    price: "€54.99",
    color: "bg-green-100 text-green-700",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white border border-[#E8E3DC] rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>

      <div className="divide-y divide-gray-200">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4"
          >
            <div>
              <p className="font-medium text-gray-800">{order.id}</p>
              <p className="text-gray-600">{order.name}</p>
              <p className="text-gray-500 text-sm">{order.product}</p>
            </div>

            <div className="text-right">
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${order.color}`}
              >
                {order.status}
              </div>
              <p className="mt-2 font-medium text-gray-800">{order.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
