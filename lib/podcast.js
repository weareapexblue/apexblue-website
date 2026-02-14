import { episodes, podcastSeries } from '@/data/podcast';

export function getPodcastSeriesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: podcastSeries.name,
    description: podcastSeries.description,
    url: podcastSeries.url,
    inLanguage: podcastSeries.language,
    publisher: {
      '@type': 'Organization',
      name: 'Apex Blue'
    },
    author: {
      '@type': 'Organization',
      name: podcastSeries.author
    }
  };
}

export function getPodcastEpisodeSchema(episode) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    datePublished: episode.datePublished,
    description: episode.description,
    timeRequired: episode.duration,
    episodeNumber: episode.episodeNumber,
    inLanguage: 'en-US',
    url: `https://apex.blue/episodes/${episode.slug}/`,
    sameAs: episode.canonical,
    mainEntityOfPage: episode.canonical,
    isPartOf: {
      '@type': 'PodcastSeries',
      name: podcastSeries.name,
      url: podcastSeries.url
    },
    author: {
      '@type': 'Organization',
      name: 'Apex Blue'
    }
  };
}

export function getEpisodeBySlug(slug) {
  return episodes.find((episode) => episode.slug === slug) || null;
}
