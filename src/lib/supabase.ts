// src/lib/supabase.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client only if configured
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface QuizResponseDB {
  id: string;
  sector?: string;
  company_size?: string;
  region?: string;
  age_range?: string;
  score_workload: number;
  score_autonomy: number;
  score_recognition: number;
  score_balance: number;
  score_relations: number;
  score_meaning: number;
  score_management: number;
  score_security: number;
  score_total: number;
  profile_type: string;
  created_at: string;
  shared: boolean;
  shared_at?: string;
}

// File-based storage for development (when Supabase is not configured)
const DEV_STORAGE_FILE = path.join(process.cwd(), '.dev-quiz-data.json');

function readDevStorage(): Record<string, QuizResponseDB> {
  try {
    if (fs.existsSync(DEV_STORAGE_FILE)) {
      const data = fs.readFileSync(DEV_STORAGE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('[DEV MODE] Error reading storage:', error);
  }
  return {};
}

function writeDevStorage(data: Record<string, QuizResponseDB>): void {
  try {
    fs.writeFileSync(DEV_STORAGE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('[DEV MODE] Error writing storage:', error);
  }
}

export async function saveQuizResult(data: Omit<QuizResponseDB, 'id' | 'created_at' | 'shared' | 'shared_at'>): Promise<string | null> {
  // Use Supabase if configured
  if (supabase) {
    const { data: result, error } = await supabase
      .from('quiz_responses')
      .insert([data])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving quiz result:', error);
      return null;
    }
    return result?.id || null;
  }

  // Fallback: file-based storage for development
  const id = generateId();
  const fullData: QuizResponseDB = {
    ...data,
    id,
    created_at: new Date().toISOString(),
    shared: false,
  };

  const storage = readDevStorage();
  storage[id] = fullData;
  writeDevStorage(storage);

  console.log('[DEV MODE] Quiz result saved:', id);
  return id;
}

export async function getQuizResult(id: string): Promise<QuizResponseDB | null> {
  // Use Supabase if configured
  if (supabase) {
    const { data, error } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching quiz result:', error);
      return null;
    }
    return data;
  }

  // Fallback: file-based storage for development
  const storage = readDevStorage();
  const result = storage[id];

  if (!result) {
    console.log('[DEV MODE] Quiz result not found:', id);
    return null;
  }

  console.log('[DEV MODE] Quiz result retrieved:', id);
  return result;
}

export async function markAsShared(id: string): Promise<boolean> {
  // Use Supabase if configured
  if (supabase) {
    const { error } = await supabase
      .from('quiz_responses')
      .update({ shared: true, shared_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error marking as shared:', error);
      return false;
    }
    return true;
  }

  // Fallback: file-based storage for development
  const storage = readDevStorage();
  const result = storage[id];

  if (result) {
    result.shared = true;
    result.shared_at = new Date().toISOString();
    storage[id] = result;
    writeDevStorage(storage);
    console.log('[DEV MODE] Quiz marked as shared:', id);
    return true;
  }
  return false;
}

// Generate a simple unique ID for development
function generateId(): string {
  return `dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
