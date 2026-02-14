import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function ai_governance_and_security_managing_dual_use_risks_and_ethical_frameworksPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('ai-governance-and-security-managing-dual-use-risks-and-ethical-frameworks');

  return {
    props: {
      anchor
    }
  };
}
