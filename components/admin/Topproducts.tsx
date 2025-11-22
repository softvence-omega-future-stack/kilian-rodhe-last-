"use client";

import React from "react";

const products = [
  {
    rank: 1,
    name: "Premium Custom T-Shirt",
    sales: "156 sales",
    price: "€5,458",
  },
  {
    rank: 2,
    name: "AI Design Hoodie",
    sales: "89 sales",
    price: "€4,894",
  },
  {
    rank: 3,
    name: "Custom Mug",
    sales: "234 sales",
    price: "€4,680",
  },
  {
    rank: 4,
    name: "Letter Design Cap",
    sales: "112 sales",
    price: "€2,799",
  },
];

export default function TopProducts() {
  return (
    <div className="bg-white border border-[#E8E3DC] rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>

      <div className="divide-y divide-gray-200">
        {products.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#7B614E] text-white text-sm font-semibold">
                {item.rank}
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.sales}</p>
              </div>
            </div>

            <div className="text-right font-medium text-gray-800">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
