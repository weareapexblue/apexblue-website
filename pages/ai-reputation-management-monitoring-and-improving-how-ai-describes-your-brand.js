import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function ai_reputation_management_monitoring_and_improving_how_ai_describes_your_brandPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('ai-reputation-management-monitoring-and-improving-how-ai-describes-your-brand');

  return {
    props: {
      anchor
    }
  };
}
