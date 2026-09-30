// Keys of landing FAQ items, resolved through `landing.faqSection.items.<key>.{question,answer}`
export const landingFaqKeys = [
  'whatIsPastel',
  'isFree',
  'dreamTypes',
  'aiAnalysis',
  'privacy',
  'voiceDictation',
  'mobileLanguages'
] as const;

export type LandingFaqKey = (typeof landingFaqKeys)[number];
