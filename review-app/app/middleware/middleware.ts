// import { NextRequest, NextResponse } from "next/server";
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export async function POST(req:NextRequest,res:NextResponse) {
//     const supabase = createRouteHandlerClient({ cookies });
  
// const {
//     data: { user },
//   } = await supabase.auth.getUser();
  
//   const role = user?.user_metadata?.role;
  
//   if (!role) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
  
//   // Example usage
//   if (req.nextUrl.pathname.startsWith('/') && role !== 'super_admin') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   if (req.nextUrl.pathname.startsWith('/business')) {
//     if (role !== 'super_admin') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   // Protect Business Admin Routes
//   if (req.nextUrl.pathname.startsWith('/business-admin')) {
//     if (role !== 'business_admin' && role !== 'super_admin') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   // Protect Customer Routes (optional — if you have customer-only areas)
//   if (req.nextUrl.pathname.startsWith('/customer')) {
//     if (role !== 'customer') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   return res;
// }

// export const config = {
//   matcher: [
//     '/business/:path*',
//     '/business-admin/:path*',
//     '/customer/:path*',
//     '/:path*',
//   ],
// };
// export default function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   return POST(req, res);
// }