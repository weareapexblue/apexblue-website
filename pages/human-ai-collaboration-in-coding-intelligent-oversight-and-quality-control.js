import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function human_ai_collaboration_in_coding_intelligent_oversight_and_quality_controlPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('human-ai-collaboration-in-coding-intelligent-oversight-and-quality-control');

  return {
    props: {
      anchor
    }
  };
}
