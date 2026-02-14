import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function your_ai_marketing_stack_choosing_and_integrating_tools_for_2026Page({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('your-ai-marketing-stack-choosing-and-integrating-tools-for-2026');

  return {
    props: {
      anchor
    }
  };
}
