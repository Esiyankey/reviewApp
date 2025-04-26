import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseServerClient'; // same lib setup


export async function POST(req) {
  const body = await req.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

    if (error) {
      throw error;
    }

    
    const { error: insertError } = await supabase.from('usersTable').insert({
        id: data.user.id,
        name,
        email,
        role:"businessAdmin",
      });
      
      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

    return NextResponse.json({ message: 'User created', user: data.user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
