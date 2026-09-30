import { landingFaqKeys, type LandingFaqKey } from '@/constants';

export interface LandingFaqItem {
  key: LandingFaqKey;
  question: string;
  answer: string;
}

// Translated landing FAQ, shared by the FAQ section and the FAQPage JSON-LD
export const useLandingFaq = () => {
  const { t } = useI18n();

  return computed<LandingFaqItem[]>(() =>
    landingFaqKeys.map((key) => ({
      key,
      question: t(`landing.faqSection.items.${key}.question`),
      answer: t(`landing.faqSection.items.${key}.answer`)
    }))
  );
};
