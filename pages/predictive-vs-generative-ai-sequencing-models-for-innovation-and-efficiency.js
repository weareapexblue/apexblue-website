import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function predictive_vs_generative_ai_sequencing_models_for_innovation_and_efficiencyPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('predictive-vs-generative-ai-sequencing-models-for-innovation-and-efficiency');

  return {
    props: {
      anchor
    }
  };
}
