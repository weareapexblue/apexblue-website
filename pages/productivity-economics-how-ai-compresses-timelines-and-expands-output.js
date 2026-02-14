import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function productivity_economics_how_ai_compresses_timelines_and_expands_outputPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('productivity-economics-how-ai-compresses-timelines-and-expands-output');

  return {
    props: {
      anchor
    }
  };
}
