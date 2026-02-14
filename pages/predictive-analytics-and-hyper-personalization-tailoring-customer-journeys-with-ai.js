import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function predictive_analytics_and_hyper_personalization_tailoring_customer_journeys_with_aiPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('predictive-analytics-and-hyper-personalization-tailoring-customer-journeys-with-ai');

  return {
    props: {
      anchor
    }
  };
}
