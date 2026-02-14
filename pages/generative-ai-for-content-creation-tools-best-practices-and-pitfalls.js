import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function generative_ai_for_content_creation_tools_best_practices_and_pitfallsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('generative-ai-for-content-creation-tools-best-practices-and-pitfalls');

  return {
    props: {
      anchor
    }
  };
}
