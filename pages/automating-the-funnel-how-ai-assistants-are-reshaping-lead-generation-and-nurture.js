import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function automating_the_funnel_how_ai_assistants_are_reshaping_lead_generation_and_nurturePage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('automating-the-funnel-how-ai-assistants-are-reshaping-lead-generation-and-nurture');

  return {
    props: {
      anchor
    }
  };
}
