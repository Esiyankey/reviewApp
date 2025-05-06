// import { NextResponse } from "next/server";
// import { cookies } from 'next/headers';


// export async function POST(req) {

//   const supabase = createRouteHandlerClient({ cookies });
//   const {
//     data: { user },
//   } = await supabase.auth.getUser(); // This now works!

//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const { business_name, description } = body;

//     const {
//       data: { user },
//       error: userError
//     } = await supabase.auth.getUser();

//     if (userError) {
//       console.error("Error fetching user:", userError);
//       return NextResponse.json(
//         { message: "User not found" },
//         { status: 401 }
//       );
//     }
//     const { data, error } = await supabase.from("businessTable").insert({
//       businessName: business_name,
//       description: description,
//       ownerId:user.id,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     });
//     if (error) {
//       console.error("Error inserting business profile:", error);
//       return NextResponse.json(
//         { message: "Database insert failed" },
//         { status: 500 }
//       );
//     }
//     if (!data) {
//       return NextResponse.json(
//         { message: "Business profile not created" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Business profile created", data },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error during business profile registration:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const body = await req.json();
    const { business_name, description } = body;

    const { data, error } = await supabase.from("businessTable").insert({
      businessName: business_name,
      description: description,
      ownerId: user.id, // this line now works
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ message: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (err) {
    console.error("Server crash:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
