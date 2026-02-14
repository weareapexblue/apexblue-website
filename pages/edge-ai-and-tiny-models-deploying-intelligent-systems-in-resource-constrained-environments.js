import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function edge_ai_and_tiny_models_deploying_intelligent_systems_in_resource_constrained_environmentsPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('edge-ai-and-tiny-models-deploying-intelligent-systems-in-resource-constrained-environments');

  return {
    props: {
      anchor
    }
  };
}
