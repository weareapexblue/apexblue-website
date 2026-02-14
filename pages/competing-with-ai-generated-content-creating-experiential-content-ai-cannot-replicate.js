import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function competing_with_ai_generated_content_creating_experiential_content_ai_cannot_replicatePage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('competing-with-ai-generated-content-creating-experiential-content-ai-cannot-replicate');

  return {
    props: {
      anchor
    }
  };
}
