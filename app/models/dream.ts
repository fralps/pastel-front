export type Dream = {
  id: string
  title: string
  content: string
  type: 'dream' | 'nightmare' | 'lucid'
  date: string
  mood: string
  tags: string[]
};
