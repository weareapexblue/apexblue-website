import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function ai_marketing_automation_for_small_businesses_practical_use_cases_and_roiPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('ai-marketing-automation-for-small-businesses-practical-use-cases-and-roi');

  return {
    props: {
      anchor
    }
  };
}
