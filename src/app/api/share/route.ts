// src/app/api/share/route.ts

import { NextResponse } from 'next/server';
import { markAsShared } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await markAsShared(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Share API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
