import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function building_your_ai_reputation_consistency_across_listings_reviews_and_social_profilesPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('building-your-ai-reputation-consistency-across-listings-reviews-and-social-profiles');

  return {
    props: {
      anchor
    }
  };
}
