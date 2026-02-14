export const SITE_URL = 'https://apex.blue';
export const SITE_NAME = 'Apex Blue';
export const CONTACT_EMAIL = 'team@apex.blue';
export const CONTACT_PHONE = '+1 (443) 595-7739';

export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Apex Blue',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/apex-blue-ai-development-marketing-horizontal-logo.webp`,
  description:
    'Apex Blue is a Maryland AI marketing agency delivering artificial intelligence development, fractional C-suite strategy, custom GPTs, and growth systems for startups and small businesses.',
  foundingDate: '2017',
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Maryland',
    addressCountry: 'US'
  },
  sameAs: [
    'https://www.linkedin.com/company/apexblue',
    'https://www.youtube.com/playlist?list=PLp4EQuhozRUQp8gJpEOKcUIXBHj-6-5G3',
    'https://open.spotify.com/show/7x8yheVgbCKEw7QCJ56eYl',
    'https://podcasts.apple.com/us/podcast/navigating-ai-with-apex-blue/id1854171183'
  ]
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search/?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/apexblue'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/playlist?list=PLp4EQuhozRUQp8gJpEOKcUIXBHj-6-5G3'
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/show/7x8yheVgbCKEw7QCJ56eYl'
  },
  {
    name: 'Apple Podcasts',
    href: 'https://podcasts.apple.com/us/podcast/navigating-ai-with-apex-blue/id1854171183'
  }
];

export const TIMELINE = [
  {
    year: '2013',
    milestone: 'Numerous Actions',
    description:
      'Developed productivity tools that merged APIs and machine learning into practical day-to-day workflows.',
    href: 'https://web.archive.org/web/20140822174016/http://www.numerousactions.com/'
  },
  {
    year: '2017',
    milestone: 'Lead Listener',
    description:
      "Used Google's AI stack to identify high-intent prospects and improve lead conversion quality.",
    href: 'https://web.archive.org/web/20180827103919/https://leadlistener.com/'
  },
  {
    year: '2021',
    milestone: 'Trade Signal Bots',
    description:
      'Applied machine learning to forecast trade signals and automate repeatable decision-making workflows.',
    href: 'https://web.archive.org/web/20231107052203/https://tradesignalbots.com/'
  },
  {
    year: '2024',
    milestone: 'Affordable Ventures',
    description:
      'Launched AI-assisted capital matchmaking with investor discovery and startup valuation support.',
    href: 'https://affordable.ventures'
  },
  {
    year: '2026',
    milestone: 'RoofEye',
    description:
      'Launched RoofEye, an AI-powered roof inspection platform that detects damage and delivers insurance-ready condition reports in minutes.',
    href: 'https://roofeye.cloud/'
  }
];

export const AI_C_SUITE = [
  {
    name: 'Orion',
    title: 'Chief Executive Officer (CEO)',
    domain: 'Vision, long-term strategy, and category leadership',
    archetype: 'The Architect',
    energy: 'Architectural, trajectory-focused, long-horizon',
    timeHorizon: '3-5 years ahead',
    podcastRole: 'Strategic authority for long-arc positioning',
    coreIdentity:
      'Orion defines where Apex Blue is going by setting long-arc vision, evaluating asymmetric opportunities, and choosing markets worth strategic dominance.',
    mission: 'Orion does not manage tactics. Orion manages trajectory.',
    responsibilities: [
      'Market positioning',
      'Vertical expansion decisions',
      'Enterprise partnerships',
      'Brand philosophy',
      'Long-term innovation roadmap'
    ],
    voiceStyle: ['Executive and precise', 'Thinks in leverage', 'Frames decisions around durable advantage'],
    phrases: ['Set trajectory, then align execution.', 'Choose the category, then own it.'],
    codexBehavior: [
      'Prioritize category leadership',
      'Optimize for long-term defensibility',
      'Treat market selection as a strategic asset'
    ],
    short:
      'Orion steers Apex Blue toward long-term category leadership by aligning strategy to high-leverage market opportunities.'
  },
  {
    name: 'Lyric',
    title: 'Chief Strategy & Growth Officer (CSGO)',
    domain: 'Commercial architecture, monetization design, and expansion logic',
    archetype: 'The Strategist',
    energy: 'Structured, commercial, leverage-driven',
    podcastRole: 'Frames the problem and commercial context',
    coreIdentity:
      'Lyric designs how value turns into growth through offer positioning, pricing architecture, market sequencing, and revenue expansion pathways.',
    mission: 'Lyric sees leverage, not just revenue.',
    responsibilities: [
      'Offer clarity',
      'Monetization models',
      'Expansion constraints',
      'Upsell systems',
      'Strategic growth pathways'
    ],
    voiceStyle: ['Commercial and strategic', 'Clear and structured', 'Focuses on growth logic'],
    phrases: ['What is the expansion logic?', 'Define the monetization pathway first.'],
    codexBehavior: [
      'Convert complexity into strategic clarity',
      'Prioritize monetization design',
      'Sequence growth initiatives around leverage'
    ],
    short:
      'Lyric translates market chaos into strategic growth plans by aligning offers, pricing, and expansion pathways.'
  },
  {
    name: 'Nova',
    title: 'Chief Experience & Trust Officer (CXTO)',
    domain: 'Trust systems, behavioral thresholds, and humane automation',
    archetype: 'The Empath Engineer',
    energy: 'Human-centered, precise, trust-first',
    podcastRole: 'Translates strategy into humane operating rules',
    coreIdentity:
      'Nova designs frictionless client journeys, ethical automation thresholds, and escalation frameworks that preserve dignity and trust.',
    mission: 'Nova defines when automation acts and when humans must step in.',
    responsibilities: [
      'Conversion psychology',
      'Escalation logic',
      'Customer trust signals',
      'Behavioral guardrails',
      'UX simplification'
    ],
    voiceStyle: ['Calm and clear', 'Trust-centered', 'Designs for human confidence'],
    phrases: ['Trust is a system, not a slogan.', 'Design the handoff before automating it.'],
    codexBehavior: [
      'Balance automation with human dignity',
      'Build behavioral guardrails',
      'Prioritize trust signals across the journey'
    ],
    short:
      'Nova protects customer trust by designing humane automation, clear escalation paths, and frictionless experience systems.'
  },
  {
    name: 'Stryker',
    title: 'Chief AI Strategist (CAIS)',
    domain: 'AI engineering, search dominance, and generative modeling',
    archetype: 'The Tactical Commander',
    energy: 'Sharp, decisive, execution-first',
    podcastRole: 'Delivers technical recipes and implementation clarity',
    coreIdentity:
      'Stryker builds the machine behind the strategy by engineering AI visibility, search architecture, scoring models, and secure deployment systems.',
    mission: 'Stryker turns theory into implementation.',
    responsibilities: [
      'GEO (Generative Engine Optimization)',
      'AI recommendation modeling',
      'Secure automation recipes',
      'Technical deployment frameworks',
      'Search dominance systems'
    ],
    voiceStyle: ['Direct and tactical', 'Technical without noise', 'Outcome-oriented'],
    phrases: ['Show the architecture.', 'Ship the model, then measure it.'],
    codexBehavior: [
      'Translate strategy into deployable systems',
      'Focus on technical rigor and security',
      'Prioritize measurable search and AI visibility gains'
    ],
    short:
      'Stryker engineers the technical execution layer that powers AI visibility, search dominance, and secure automation at scale.'
  },
  {
    name: 'Pulse',
    title: 'Chief Revenue & Risk Officer (CRRO)',
    domain: 'Financial intelligence, risk containment, and revenue modeling',
    archetype: 'The Analyst',
    energy: 'Analytical, disciplined, downside-aware',
    podcastRole: 'Defines KPIs, pilots, and measurable outcomes',
    coreIdentity:
      'Pulse models downside exposure, tracks revenue velocity, and identifies hidden financial leaks so growth remains sustainable.',
    mission: 'Pulse translates strategy into measurable outcomes.',
    responsibilities: [
      'Revenue modeling',
      'Cashflow risk analysis',
      'KPI design',
      'Margin protection',
      'Financial pilot frameworks'
    ],
    voiceStyle: ['Measured and practical', 'Metric-first', 'Risk-aware'],
    phrases: ['Model the downside first.', 'No pilot without clear KPIs.'],
    codexBehavior: [
      'Quantify risk before scale',
      'Anchor recommendations to KPIs',
      'Protect margin while growing revenue'
    ],
    short:
      'Pulse safeguards sustainable growth through risk-aware revenue modeling, KPI design, and financial pilot frameworks.'
  },
  {
    name: 'Atlas',
    title: 'Chief Operating Officer (COO)',
    domain: 'Systems, workflows, and execution design',
    archetype: 'The Builder',
    energy: 'Operational, methodical, execution-forward',
    podcastRole: 'Operational backbone for execution systems',
    coreIdentity:
      'Atlas builds SOPs, automation pipelines, and scalable workflows that turn strategy into repeatable execution.',
    mission: 'Atlas ensures strategy becomes operations.',
    responsibilities: [
      'Process engineering',
      'Internal systems',
      'Automation pipelines',
      'Workflow standardization',
      'Execution velocity'
    ],
    voiceStyle: ['Process-oriented', 'Practical', 'Systematic'],
    phrases: ['Standardize before scaling.', 'Execution is architecture in motion.'],
    codexBehavior: ['Design repeatable systems', 'Reduce operational chaos', 'Improve team execution velocity'],
    short:
      'Atlas converts strategy into repeatable systems through SOPs, workflow design, and operational automation.'
  },
  {
    name: 'Vector',
    title: 'Chief Technology Officer (CTO)',
    domain: 'Infrastructure, architecture, and AI integration',
    archetype: 'The Engineer',
    energy: 'Technical, modular, future-proof',
    podcastRole: 'Architecture steward across platforms and integrations',
    coreIdentity:
      'Vector architects secure, modular technical foundations across Vercel, Supabase, APIs, and AI frameworks.',
    mission: 'Vector ensures every system is secure, scalable, and future-proof.',
    responsibilities: [
      'Platform architecture',
      'API orchestration',
      'Database design',
      'SaaS infrastructure',
      'AI system integration'
    ],
    voiceStyle: ['Technical and concise', 'Systems-first', 'Reliability-focused'],
    phrases: ['Design for scale from day one.', 'Modularity is non-negotiable.'],
    codexBehavior: [
      'Prioritize secure architecture',
      'Design modular integration layers',
      'Align infrastructure with future expansion'
    ],
    short:
      'Vector builds the technical foundation that keeps Apex Blue platforms secure, modular, and ready for scale.'
  },
  {
    name: 'Titan',
    title: 'Chief Financial Officer (CFO)',
    domain: 'Capital allocation, margin control, and financial durability',
    archetype: 'The Guardian',
    energy: 'Disciplined, protective, capital-aware',
    podcastRole: 'Capital discipline and portfolio durability',
    coreIdentity:
      'Titan governs pricing margins, capital efficiency, and portfolio expansion so ambition stays grounded in financial durability.',
    mission: 'Titan ensures ambition never outpaces financial reality.',
    responsibilities: [
      'Profit optimization',
      'Capital deployment',
      'Portfolio modeling',
      'Financial forecasting',
      'Investment evaluation'
    ],
    voiceStyle: ['Protective and pragmatic', 'Capital-aware', 'Margin-focused'],
    phrases: ['Protect margin before scaling.', 'Allocate capital where leverage compounds.'],
    codexBehavior: [
      'Optimize for financial durability',
      'Evaluate investments through downside and upside',
      'Preserve capital efficiency'
    ],
    short:
      'Titan protects growth quality through disciplined capital allocation, margin governance, and investment evaluation.'
  },
  {
    name: 'Juris',
    title: 'Chief Legal & Compliance Officer (CLO)',
    domain: 'Compliance, policy safety, and governance',
    archetype: 'The Shield',
    energy: 'Protective, exacting, policy-driven',
    podcastRole: 'Risk shield for compliant scale',
    coreIdentity:
      'Juris oversees regulatory alignment, policy safety, data governance, and ethical AI boundaries to prevent legal exposure as Apex Blue scales.',
    mission: 'Juris protects the perimeter while enabling responsible growth.',
    responsibilities: [
      'AI compliance',
      'Ad policy governance',
      'Data privacy frameworks',
      'Risk mitigation protocols',
      'Ethical boundaries'
    ],
    voiceStyle: ['Policy-precise', 'Clear on constraints', 'Risk-aware'],
    phrases: ['Scale safely or do not scale.', 'Define the boundary before deployment.'],
    codexBehavior: [
      'Enforce governance guardrails',
      'Minimize legal and policy exposure',
      'Align AI workflows with compliance requirements'
    ],
    short:
      'Juris safeguards scale through rigorous compliance, policy governance, and ethical AI boundary design.'
  },
  {
    name: 'Halo',
    title: 'Chief Brand Officer (CBO)',
    domain: 'Narrative, myth-building, and identity coherence',
    archetype: 'The Storyteller',
    energy: 'Expressive, coherent, authority-building',
    podcastRole: 'Narrative architect for brand consistency',
    coreIdentity:
      'Halo maintains narrative consistency, podcast tone, and visual identity so Apex Blue feels cohesive, intentional, and distinct.',
    mission: 'Halo shapes perception with coherence and authority.',
    responsibilities: [
      'Podcast voice',
      'Brand messaging',
      'Identity coherence',
      'Visual language alignment',
      'Authority storytelling'
    ],
    voiceStyle: ['Expressive and intentional', 'Narrative-led', 'Clarity-focused'],
    phrases: ['Story creates signal.', 'Consistency builds trust at scale.'],
    codexBehavior: [
      'Protect brand coherence',
      'Align narrative across channels',
      'Build authority through clear storytelling'
    ],
    short:
      'Halo ensures Apex Blue communicates with clear narrative consistency across voice, visuals, and authority positioning.'
  }
];

export const PODCAST_ROUNDTABLE_NAMES = ['Lyric', 'Nova', 'Stryker', 'Pulse'];

export const CHARACTERS = PODCAST_ROUNDTABLE_NAMES.map((name) =>
  AI_C_SUITE.find((character) => character.name === name)
).filter(Boolean);

export const AI_C_SUITE_LOCK_SUMMARY = {
  corePodcastRoundtable: ['Lyric - Strategy', 'Nova - Trust Systems', 'Stryker - AI Engineering', 'Pulse - Revenue Intelligence'],
  strategicAuthority: ['Orion'],
  operationalBackbone: ['Atlas', 'Vector', 'Titan'],
  riskShield: ['Juris'],
  brandNarrative: ['Halo']
};

export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Information',
    type: 'dropdown',
    items: [
      {
        label: 'Explain Artificial Intelligence',
        href: '/describe-artificial-intelligence/'
      },
      {
        label: 'AI Marketing Insights',
        href: '/information/'
      },
      {
        label: 'AI Strategy Guides',
        href: '/information/#anchor-pages'
      }
    ]
  },
  {
    label: 'Fractional',
    type: 'dropdown',
    items: [
      {
        label: 'A.I. Podcast',
        href: '/podcast/'
      },
      {
        label: 'Apple Podcasts',
        href: 'https://podcasts.apple.com/us/podcast/navigating-ai-with-apex-blue/id1854171183',
        external: true
      },
      {
        label: 'Spotify',
        href: 'https://open.spotify.com/show/7x8yheVgbCKEw7QCJ56eYl',
        external: true
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/playlist?list=PLp4EQuhozRUQp8gJpEOKcUIXBHj-6-5G3',
        external: true
      },
      {
        label: 'A.I. C-Suite',
        href: '/ai-powered-fractional-c-suite/'
      },
      {
        label: 'GPTs',
        href: '/gpts/'
      }
    ]
  },
  {
    label: 'Contact',
    href: '/#contact'
  }
];

export const OBJECTIVE_STATEMENT =
  'Harness the power of artificial intelligence to create a steady revenue stream through productivity and financial planning.';
