type Intensity = 'very_clear' | 'clear' | 'unclear' | 'very_unclear'
type Happened = 'falling_asleep' | 'sleeping' | 'waking_up' | 'napping'
type SleepType = 'dream' | 'nightmare' | 'lucid' | 'erotic' | 'sleep_paralysis' | 'sleep_talking' | 'sleep_apnea' | 'sleep_walking' | 'other'

export type Dream = {
  id?: number
  title: string
  description: string
  sleep_type: SleepType
  happened: Happened
  intensity: Intensity
  date: Date
  current_mood: string
  tags_attributes: { id?: number; name: string }[]
};
