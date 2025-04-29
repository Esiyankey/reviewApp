import { NextResponse } from "next/server";

import supabase from "@/lib/supabaseServerClient";

export  const fetchSubscriptionPlans = async () => {
  try {
    const { data, error } = await supabase
      .from("subscriptionPlanTable")
      .select("*");

    if (data) {
        console.log("Fetched subscription plans:", data);
        return NextResponse.json(data, { status: 200 });
    }
    else if (error) {
        console.error("Error fetching subscription plans:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } else {
        return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
