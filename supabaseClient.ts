// services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// 👇 1. Supabase에서 복사한 Project URL
const supabaseUrl = 'https://yeowdcddxgbcwyeoicyu.supabase.co';

// 👇 2. Supabase에서 복사한 API Key (anon/public)
const supabaseKey = 'sb_publishable_T17zlKGeISgJTVSbZDWGyg_CfdaYaa0';

export const supabase = createClient(supabaseUrl, supabaseKey);