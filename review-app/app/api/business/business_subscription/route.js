import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseServerClient'; 

export async function POST(req) {
    try {
        const body = await req.json();
        const {subscription,qr_code,business_id} = body;

        const {data,error} = await supabase.from("businessTable").update({
            subscription: subscription,
            qr_code: qr_code,
            updated_at: new Date().toISOString(),
        }).eq("id", business_id);

        if (error) {
            console.error("Error updating business subscription:", error);
            return NextResponse.json(
                { message: "Database update failed" },
                { status: 500 }
            );
        }
        if (!data) {
            return NextResponse.json(
                { message: "Business subscription not updated" },
                { status: 400 }
            );
        }

    }catch(error){
        console.error("Error during business subscription registration:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

}

