import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function multi_agent_systems_coordinating_ai_teams_for_complex_software_projectsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('multi-agent-systems-coordinating-ai-teams-for-complex-software-projects');

  return {
    props: {
      anchor
    }
  };
}
