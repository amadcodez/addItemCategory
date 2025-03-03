import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Ensure this is your MongoDB connection file

export async function POST(req: Request) {
  try {
    const { storeId, customUserId, itemType } = await req.json();

    if (!storeId || !customUserId || !itemType) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("myDBClass");

    const result = await db.collection("store_item_category").insertOne({
      storeId,
      customUserId,
      itemType,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Item Category Added Successfully", result }, { status: 201 });
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
