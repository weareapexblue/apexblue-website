import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function long_running_agents_building_complete_applications_with_minimal_supervisionPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('long-running-agents-building-complete-applications-with-minimal-supervision');

  return {
    props: {
      anchor
    }
  };
}
