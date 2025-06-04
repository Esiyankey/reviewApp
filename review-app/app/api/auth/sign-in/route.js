import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseServerClient";


export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Attempt to sign in the user
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });


      

    if (authError) {
      return NextResponse.json({ message: authError.message }, { status: 401 });
    }

    // Return success response with user and role
    return NextResponse.json(
      {
        message: "User signed in",
        user: authData.user,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
