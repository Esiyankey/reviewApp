const {NextResponse,NextRequest} = require("next/server");
const supabase = require('@/lib/supabaseServerClient'); 



export async function POST(req) {
    try{
        

        const body = await req.json();

        const { business_name,subcription, description,qr_code } = body;

        
    }
    catch(error){
        console.error("Error during business profile registration:", error);
        return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
        );
    }
}


