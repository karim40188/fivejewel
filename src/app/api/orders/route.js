import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// POST request to create an order
export async function POST(request) {
  try {
    const data = await request.json();

    // إضافة الطلب إلى Supabase مع الحالة الافتراضية 'pending'
    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          name: data.name,
          phone: data.phone,
          service: data.service,
          address: data.address,
          delivery: data.delivery,
          status: data.status || "pending", // استخدام الحالة التي تم إرسالها أو الافتراضية
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ message: "Order created successfully", order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// GET request to fetch all orders
export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*");

    if (error) throw error;

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
