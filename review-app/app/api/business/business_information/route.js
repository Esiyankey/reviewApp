// import { NextResponse } from "next/server";
// import supabase from "@/lib/supabaseServerClient";
// import { getUserFromToken } from "@/lib/middlewares/getUserFromToken";

// export async function POST(req) {
//   const authHeader = req.headers.get("Authorization");
//   const token = authHeader?.replace("Bearer ", "");

//   if (!token) {
//     console.error("Token missing from Authorization header");
//     return new Response(JSON.stringify({ message: "Unauthorized" }), {
//       status: 401,
//     });
//   }

//   try {
//     const body = await req.json();
//     const { business_name, description } = body;

//     const user = await getUserFromToken(token);

//     if (!user) {
//       console.error("User not found for token:", token);
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     const userId = user?.id;
//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Insert into database
//     const { data, error } = await supabase.from("Business").insert({
//       business_name: business_name,
//       description: description,
//       ownerId: userId,
//       updatedAt: new Date().toISOString(),
//     });

//     if (error) {
//       console.error("Insert error:", error);
//       return NextResponse.json({ message: "Insert failed" }, { status: 500 });
//     }
//     console.log("Received body:", body);

//     return NextResponse.json({ message: "Success", data }, { status: 201 });
//   } catch (err) {
//     console.error("Insert error details:", err?.message, err?.details);
//     console.error("Server crash:", err);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req) {
  const authHeader = req.headers.get("Authorization"); // ✅ Fix: use `req` not `request`
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    console.error("Token missing from Authorization header");
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const { business_name, description } = body;

    const user = await getUserFromToken(token);

    if (!user) {
      console.error("User not found for token:", token);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user?.id;

    const { data, error } = await supabase.from("Business").insert({
      business_name,
      description,
      ownerId: userId,
      updatedAt: new Date().toISOString(),
    });

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ message: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (err) {
    console.error("Insert error details:", err?.message, err?.details);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
