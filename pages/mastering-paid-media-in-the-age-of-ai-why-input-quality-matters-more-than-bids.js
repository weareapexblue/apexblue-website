import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function mastering_paid_media_in_the_age_of_ai_why_input_quality_matters_more_than_bidsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('mastering-paid-media-in-the-age-of-ai-why-input-quality-matters-more-than-bids');

  return {
    props: {
      anchor
    }
  };
}
