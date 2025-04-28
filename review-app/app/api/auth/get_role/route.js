import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseServerClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('usersTable')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ role: data.role }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
