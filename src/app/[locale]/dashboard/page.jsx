"use client";

import { supabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const ADMIN_EMAILS = [
  "fivejewels",
  "fivejewels2", 
  "fivejewels3", 
];


const isAdmin = async () => {
  const adminEmail = localStorage.getItem("adminEmail");
  return ADMIN_EMAILS.includes(adminEmail); 
};


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin();
      if (!admin) {
        redirect("/");
        return;
      }

      fetchOrders();
    };

    checkAdmin();

    const channel = supabase
      .channel("orders-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("New order added:", payload);
          setOrders((prevOrders) => [payload.new, ...prevOrders]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === payload.new.id
                ? { ...order, status: payload.new.status }
                : order
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    // التنظيف عند تفريغ المكون
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) throw error;
      setOrders(data); // جلب البيانات وتحديث حالة الطلبات
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrder = await updateOrderStatus(orderId, newStatus);
    if (updatedOrder) {
      // تحديث الواجهة بالحالة الجديدة مباشرة
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) {
        throw error;
      }
      console.log("Order status updated:", data);
      return data; // إرجاع البيانات المُحدثة لتحديث الواجهة
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) throw error;
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Delivery</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">{order.name}</td>
                <td className="px-4 py-2 border">{order.phone}</td>
                <td className="px-4 py-2 border">{order.service}</td>
                <td className="px-4 py-2 border">{order.address}</td>
                <td className="px-4 py-2 border">{order.delivery}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="bg-gray-200 p-2 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
