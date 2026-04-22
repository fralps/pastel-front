type Intensity = 'very_clear' | 'clear' | 'unclear' | 'very_unclear';
type Happened = 'falling_asleep' | 'sleeping' | 'waking_up' | 'napping';
type SleepType =
  | 'dream'
  | 'nightmare'
  | 'lucid'
  | 'erotic'
  | 'sleep_paralysis'
  | 'sleep_talking'
  | 'sleep_apnea'
  | 'sleep_walking';

export type Sleep = {
  id?: number | null;
  title: string | null;
  description: string | null;
  sleep_type: SleepType | null;
  happened: Happened | null;
  intensity: Intensity | null;
  date: Date | null;
  current_mood: string | null;
  tags_attributes: { id?: number; name: string; _destroy?: boolean }[] | null;
  analysis?: string | null;
  analysis_status?: 'not_started' | 'in_progress' | 'done' | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type SleepTotals = {
  totals: {
    dream: number;
    lucid: number;
    nightmare: number;
    sleep_paralysis: number;
    sleep_walking: number;
    sleep_talking: number;
    sleep_apnea: number;
    erotic: number;
  };
};
