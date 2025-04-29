import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseServerClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { business_name, description } = body;
    const { data, error } = await supabase.from("businessTable").Insert({
      business_name: business_name,
      description: description,
      ownerId : userMetaData.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.error("Error inserting business profile:", error);
      return NextResponse.json(
        { message: "Database insert failed" },
        { status: 500 }
      );
    }
    if (!data) {
      return NextResponse.json(
        { message: "Business profile not created" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Business profile created", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during business profile registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
