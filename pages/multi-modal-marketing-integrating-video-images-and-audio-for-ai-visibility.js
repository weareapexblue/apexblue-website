import AnchorPageTemplate from '@/components/anchors/AnchorPageTemplate';
import { getAnchorDataBySlug } from '@/lib/anchors';

export default function multi_modal_marketing_integrating_video_images_and_audio_for_ai_visibilityPage({ anchor }) {
  return <AnchorPageTemplate anchor={anchor} />;
}

export async function getStaticProps() {
  const anchor = await getAnchorDataBySlug('multi-modal-marketing-integrating-video-images-and-audio-for-ai-visibility');

  return {
    props: {
      anchor
    }
  };
}
