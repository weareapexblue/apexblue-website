import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function dynamic_staffing_and_onboarding_how_ai_compresses_project_timelinesPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('dynamic-staffing-and-onboarding-how-ai-compresses-project-timelines');

  return {
    props: {
      anchor
    }
  };
}
