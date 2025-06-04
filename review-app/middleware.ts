// // middleware.ts
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(req:NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   // This loads the user's session from cookies
//   await supabase.auth.getSession();

//   return res;
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Apply to all routes
// };

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'; 
import { NextRequest, NextResponse } from 'next/server'; 

export async function middleware(req: NextRequest) { 
    const res = NextResponse.next(); 
    const supabase = createMiddlewareClient({ req, res }); 

    // Fetch session
    const { data: { session }, error } = await supabase.auth.getSession(); 

    // Check if session exists
    if (error || !session) {
        console.error("Session error:", error);
        // return NextResponse.redirect('/login'); // Redirect if not authenticated
    }

    return res; 
} 

export const config = { 
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Apply to all routes 
};