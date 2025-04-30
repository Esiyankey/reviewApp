import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseServerClient";



export async function POST(req) {
    try{}
    catch(error){
        console.error("Error during business subscription registration:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
    const body = await req.json();
    const {subscription_planId,start_date,end_date,business_id}= body;
    const {data,error} = await supabase.from("subscriptionTable").insert({
        business_id: business_id,
        subscription_planId: subscription_planId,
        start_date: start_date,
        end_date: end_date,
        updated_at: new Date().toISOString(),
    })

    if (error) {
        console.error("Error inserting business subscription:", error);
        return NextResponse.json(
            { message: "Database insert failed" },
            { status: 500 }
        );
    }
    if (!data) {
        return NextResponse.json(
            { message: "Business subscription not created" },
            { status: 400 }
        );
    }
    return NextResponse.json(
        { message: "Business subscription created", data },
        { status: 201 }
    );
}