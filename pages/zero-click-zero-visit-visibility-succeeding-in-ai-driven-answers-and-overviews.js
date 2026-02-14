import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function zero_click_zero_visit_visibility_succeeding_in_ai_driven_answers_and_overviewsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('zero-click-zero-visit-visibility-succeeding-in-ai-driven-answers-and-overviews');

  return {
    props: {
      anchor
    }
  };
}
