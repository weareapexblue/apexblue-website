import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function ai_ready_seo_optimizing_your_website_for_ai_assistants_and_generative_searchPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('ai-ready-seo-optimizing-your-website-for-ai-assistants-and-generative-search');

  return {
    props: {
      anchor
    }
  };
}
