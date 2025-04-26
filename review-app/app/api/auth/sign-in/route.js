import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseServerClient'; 

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // No need to call getUser again! We have data.user already
    const { data: user, error: roleError } = await supabase
      .from('usersTable')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (roleError) {
      throw roleError;
    }

    return NextResponse.json({
      message: 'User signed in',
      user: data.user,
      role: user?.role, // Include role here
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
