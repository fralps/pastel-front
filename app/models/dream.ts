export type Dream = {
  id: number
  title: string
  description: string
  sleep_type: 'dream' | 'nightmare' | 'lucid' | 'erotic' | 'sleep_paralysis' | 'sleep_talking' | 'sleep_apnea' | 'sleep_walking'
  date: string
  current_mood: string
  tags_attributes: { id: number; name: string }[]
};
