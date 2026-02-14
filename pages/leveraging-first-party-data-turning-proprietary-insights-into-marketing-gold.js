import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function leveraging_first_party_data_turning_proprietary_insights_into_marketing_goldPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('leveraging-first-party-data-turning-proprietary-insights-into-marketing-gold');

  return {
    props: {
      anchor
    }
  };
}
