import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseServerClient";
import { getUserFromToken } from "@/lib/middlewares/getUserFromToken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { business_name, description } = body;

    const userId = await getUserFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Insert into database
    const { data, error } = await supabase.from("businessTable").insert({
      businessName: business_name,
      description: description,
      ownerId: userId,
      updatedAt: new Date().toISOString(),
    });

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ message: "Insert failed" }, { status: 500 });
    }
    console.log("Received body:", body);

    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (err) {
    console.error("Insert error details:", err?.message, err?.details);
    console.error("Server crash:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
