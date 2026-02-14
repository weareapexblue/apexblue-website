import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function interpretable_and_responsible_ai_opening_the_black_box_and_navigating_regulationsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('interpretable-and-responsible-ai-opening-the-black-box-and-navigating-regulations');

  return {
    props: {
      anchor
    }
  };
}
