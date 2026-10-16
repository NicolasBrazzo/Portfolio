/**
 * Gruppi della scheda competenze, nell'ordine in cui appaiono.
 * `highlighted` mette in risalto la colonna (strumenti AI).
 */
export const SKILL_GROUPS = [
  {
    id: 'core',
    title: 'Uso ogni giorno',
    items: ['React', 'JavaScript', 'Tailwind', 'Figma', 'HTML & CSS', 'Git & GitHub'],
  },
  {
    id: 'comfort',
    title: 'Con sicurezza',
    items: ['TypeScript', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'learning',
    title: 'Sto imparando',
    items: ['GraphQL', 'AWS', 'Python', 'Rust', 'Go'],
  },
  {
    id: 'ai',
    title: 'Strumenti AI',
    items: ['Claude', 'ChatGPT', 'Lovable', 'Gemini'],
    highlighted: true,
  },
]
