import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseServerClient'; 

export async function POST(req) {
    try {
        const body = await req.json();
        const {subscription,}

    }catch(error){
        console.error("Error during business subscription registration:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

}

