export const FRACTIONAL_GPT_LINKS = {
  aiCio: 'https://chat.openai.com/g/g-fq83xf5G1-ai-cio',
  aiCmo: 'https://chat.openai.com/g/g-1TRH6dT1e-ai-cmo',
  aiCto: 'https://chat.openai.com/g/g-rdWimoEtS-ai-cto'
};

const gpts = [
  {
    name: 'Long-Form SEO Bot',
    category: 'Marketing & Advertising',
    description:
      'Builds SEO-structured long-form content with intent mapping, topical coverage, and conversion-focused sections.',
    useCases: ['Pillar pages', 'SERP expansion', 'Editorial planning'],
    href: 'https://chat.openai.com/g/g-Fw0EYmTtO-long-form-seo-bot'
  },
  {
    name: 'Viral Content Generator GPT',
    category: 'Marketing & Advertising',
    description:
      'Generates social and campaign concepts designed for engagement velocity and audience fit.',
    useCases: ['Content hooks', 'Short-form scripts', 'Campaign ideation'],
    href: 'https://chat.openai.com/g/g-UA1WADDNJ-viral-content-generator-gpt'
  },
  {
    name: 'Trend Predictor GPT',
    category: 'Marketing & Advertising',
    description:
      'Finds emerging content and market themes to help teams publish before topics peak.',
    useCases: ['Trend scanning', 'Topic clustering', 'Editorial timing'],
    href: 'https://chat.openai.com/g/g-RJhTaCGKy-trend-predictor-gpt'
  },
  {
    name: 'Market Discovery',
    category: 'Marketing & Advertising',
    description:
      'Maps customer segments, pain points, and positioning opportunities from market input signals.',
    useCases: ['ICP development', 'Offer positioning', 'Segment discovery'],
    href: 'https://chat.openai.com/g/g-lRSgu3Lea-market-discovery'
  },
  {
    name: 'BuyACall',
    category: 'Marketing & Advertising',
    description:
      'Helps build outreach flows that convert interest into scheduled meetings and sales conversations.',
    useCases: ['Lead outreach', 'Follow-up scripts', 'Booking flow optimization'],
    href: 'https://chat.openai.com/g/g-JXmXsp91K-buyacall'
  },
  {
    name: 'AI-CIO',
    category: 'A.I. C-Suite Executives',
    description:
      'Supports capital strategy, investor matching, valuation logic, and fundraising communication workflows.',
    useCases: ['Investor analysis', 'Valuation prep', 'Fundraising execution'],
    href: FRACTIONAL_GPT_LINKS.aiCio
  },
  {
    name: 'AI-CMO',
    category: 'A.I. C-Suite Executives',
    description:
      'Designs campaign architecture and growth systems with budget discipline and measurable outcomes.',
    useCases: ['Channel strategy', 'Campaign design', 'Performance optimization'],
    href: FRACTIONAL_GPT_LINKS.aiCmo
  },
  {
    name: 'AI-CTO',
    category: 'A.I. C-Suite Executives',
    description:
      'Guides architecture decisions, stack simplification, and automation planning for scalable delivery.',
    useCases: ['Tech stack planning', 'Cost control', 'Automation systems'],
    href: FRACTIONAL_GPT_LINKS.aiCto
  },
  {
    name: 'AI-COO',
    category: 'A.I. C-Suite Executives',
    description:
      'Translates strategy into operational plans, KPI routines, and execution accountability.',
    useCases: ['Execution playbooks', 'KPI governance', 'Operational planning'],
    href: 'https://chat.openai.com/g/g-VmZso30Pb-ai-coo'
  },
  {
    name: 'AI-CFO',
    category: 'A.I. C-Suite Executives',
    description:
      'Assists with financial planning, runway analysis, and scenario decisions for founder teams.',
    useCases: ['Runway scenarios', 'Budget modeling', 'Finance reporting'],
    href: 'https://chat.openai.com/g/g-10Ye5l5MD-ai-cfo'
  },
  {
    name: 'AI-CEO',
    category: 'A.I. C-Suite Executives',
    description:
      'Supports high-level decision framing, strategy alignment, and leadership communication.',
    useCases: ['Strategic decisions', 'Goal alignment', 'Leadership briefs'],
    href: 'https://chat.openai.com/g/g-DfEprsFvc-ai-ceo'
  },
  {
    name: 'Stock News Scanner',
    category: 'Analytics & Forecasting',
    description:
      'Monitors market-moving updates and structures signal summaries for faster decision cycles.',
    useCases: ['Market scans', 'Signal summaries', 'Watchlist monitoring'],
    href: 'https://chat.openai.com/g/g-GoruYEZxg-stock-news-scanner'
  },
  {
    name: 'Skill Matcher',
    category: 'Analytics & Forecasting',
    description:
      'Matches talent or team capability needs to practical skill paths and role-fit insights.',
    useCases: ['Role mapping', 'Skill gap analysis', 'Team planning'],
    href: 'https://chat.openai.com/g/g-rNIwPNtKo-skill-matcher'
  },
  {
    name: 'GPT TimeCapsule',
    category: 'Analytics & Forecasting',
    description:
      'Captures historical milestones and context to inform long-term strategic planning.',
    useCases: ['History capture', 'Milestone analysis', 'Strategic retrospectives'],
    href: 'https://chat.openai.com/g/g-3YTIOxSHZ-gpt-timecapsule-the-personal-history-narrator'
  },
  {
    name: 'GPT Dreamscape',
    category: 'Creativity & Design',
    description:
      'Transforms abstract creative concepts into interpretive narratives and themed directions.',
    useCases: ['Creative ideation', 'Narrative concepts', 'Campaign moodboarding'],
    href: 'https://chat.openai.com/g/g-k1rybwNw4-gpt-dreamscape-the-dream-interpreter'
  },
  {
    name: 'Emohaiku Artisan GPT',
    category: 'Creativity & Design',
    description:
      'Creates poetic copy variants and emotionally tuned micro-content ideas.',
    useCases: ['Brand voice experiments', 'Short-form copy', 'Creative prompts'],
    href: 'https://chat.openai.com/g/g-ymNCkWaku-emohaiku-artisan-gpt'
  },
  {
    name: 'GPT Mindbender',
    category: 'Creativity & Design',
    description:
      'Generates puzzle-style thinking exercises to challenge assumptions and spark new strategy options.',
    useCases: ['Idea expansion', 'Problem reframing', 'Workshop exercises'],
    href: 'https://chat.openai.com/g/g-0cQLmwYva-gpt-mindbender-the-interactive-puzzle-solver'
  },
  {
    name: 'Magic 7 Ball',
    category: 'Creativity & Design',
    description:
      'A lightweight ideation companion for rapid directional prompts and brainstorming.',
    useCases: ['Creative warmups', 'Prompt starters', 'Concept generation'],
    href: 'https://chat.openai.com/g/g-ObfN6eCWZ-magic-7-ball'
  },
  {
    name: 'GPT Chef',
    category: 'Productivity & Lifestyle',
    description:
      'Designs practical meal-planning workflows that fit work schedules and goals.',
    useCases: ['Meal planning', 'Schedule-fit recipes', 'Nutrition prep'],
    href: 'https://chat.openai.com/g/g-tUCizEEMX-gpt-chef'
  },
  {
    name: 'GPT Fit',
    category: 'Productivity & Lifestyle',
    description:
      'Supports routine-based fitness planning for consistent health execution.',
    useCases: ['Workout schedules', 'Progress routines', 'Habit planning'],
    href: 'https://chat.openai.com/g/g-NmxpMliux-gpt-fit'
  },
  {
    name: 'FitBuddy Trainer GPT',
    category: 'Productivity & Lifestyle',
    description:
      'Provides adaptive training suggestions based on current goals and constraints.',
    useCases: ['Training suggestions', 'Routine adjustments', 'Goal tracking'],
    href: 'https://chat.openai.com/g/g-HoA3sEOwn-fitbuddy-trainer-gpt'
  },
  {
    name: 'MindEase Therapist GPT',
    category: 'Productivity & Lifestyle',
    description:
      'Offers reflection prompts and supportive check-ins for stress management and focus.',
    useCases: ['Reflection prompts', 'Stress support', 'Mindset routines'],
    href: 'https://chat.openai.com/g/g-HmVOGnkYD-mindease-therapist-gpt'
  },
  {
    name: 'Always Optimistic',
    category: 'Productivity & Lifestyle',
    description:
      'Helps teams reframe constraints and keep momentum with constructive planning prompts.',
    useCases: ['Mindset reframing', 'Team morale prompts', 'Daily momentum cues'],
    href: 'https://chat.openai.com/g/g-x2cmyGDqR-always-optimistic'
  },
  {
    name: 'EcoAdvisor GPT',
    category: 'Productivity & Lifestyle',
    description:
      'Supports practical sustainability decisions across work and home processes.',
    useCases: ['Sustainability choices', 'Resource planning', 'Impact-aware routines'],
    href: 'https://chat.openai.com/g/g-0C8SEwbVl-ecoadvisor-gpt'
  },
  {
    name: 'C-Suite',
    category: 'A.I. C-Suite Executives',
    description:
      'A broad executive copilot combining strategy, operations, and growth prompts for leadership teams.',
    useCases: ['Executive planning', 'Cross-functional decisions', 'Leadership prompts'],
    href: 'https://chat.openai.com/g/g-GYTFiwD0e-c-suite'
  },
  {
    name: 'Iron Butterfly',
    category: 'Analytics & Forecasting',
    description:
      'A specialized assistant for options strategy framing and scenario awareness.',
    useCases: ['Options scenarios', 'Risk framing', 'Decision support'],
    href: 'https://chat.openai.com/g/g-qgzYk1GkD-iron-butterfly'
  }
];

export default gpts;
