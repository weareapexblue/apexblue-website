import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function ai_marketing_ethics_and_transparency_balancing_personalization_with_privacyPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('ai-marketing-ethics-and-transparency-balancing-personalization-with-privacy');

  return {
    props: {
      anchor
    }
  };
}
