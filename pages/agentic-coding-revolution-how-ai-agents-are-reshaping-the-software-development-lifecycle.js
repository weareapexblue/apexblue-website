import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function agentic_coding_revolution_how_ai_agents_are_reshaping_the_software_development_lifecyclePage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('agentic-coding-revolution-how-ai-agents-are-reshaping-the-software-development-lifecycle');

  return {
    props: {
      anchor
    }
  };
}
