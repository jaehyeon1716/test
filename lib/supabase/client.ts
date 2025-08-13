import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type SurveyResponse = {
  id?: string
  created_at?: string
  question_1: number
  question_2: number
  question_3: number
  question_4: number
  question_5: number
  question_6: number
  question_7: number
  question_8: number
  question_9: number
  participant_age?: number
  participant_gender?: string
  additional_comments?: string
}
