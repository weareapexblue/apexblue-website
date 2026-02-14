import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function from_implementer_to_orchestrator_the_changing_role_of_software_engineersPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('from-implementer-to-orchestrator-the-changing-role-of-software-engineers');

  return {
    props: {
      anchor
    }
  };
}
