import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function democratizing_development_empowering_non_developers_with_agentic_ai_toolsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('democratizing-development-empowering-non-developers-with-agentic-ai-tools');

  return {
    props: {
      anchor
    }
  };
}
