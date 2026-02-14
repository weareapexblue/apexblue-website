import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function change_fitness_building_organizational_resilience_for_continuous_ai_transformationPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('change-fitness-building-organizational-resilience-for-continuous-ai-transformation');

  return {
    props: {
      anchor
    }
  };
}
