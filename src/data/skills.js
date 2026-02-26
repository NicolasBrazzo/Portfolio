/**
 * Dati delle skill.
 * Aggiorna le percentuali e aggiungi/rimuovi skill in base al tuo profilo reale.
 *
 * Campi:
 * - name       → nome della tecnologia/skill
 * - percent    → livello di padronanza (0–100)
 * - category   → 'frontend' | 'design' | 'tools'
 */

export const skills = [
  /* ── Frontend ─────────────────────────────── */
  { name: 'React',          percent: 90, category: 'frontend' },
  { name: 'JavaScript',     percent: 95, category: 'frontend' },
  { name: 'TypeScript',     percent: 50, category: 'frontend' },
  { name: 'Tailwind CSS',   percent: 92, category: 'frontend' },
  { name: 'HTML & CSS',     percent: 95, category: 'frontend' },
  { name: 'GSAP',           percent: 80, category: 'frontend' },

  /* ── Design ────────────────────────────────── */
  { name: 'Figma',          percent: 90, category: 'design'   },
  { name: 'UI Design',      percent: 85, category: 'design'   },
  { name: 'Design System',  percent: 80, category: 'design'   },
  { name: 'Motion Design',  percent: 65, category: 'design'   },

  /* ── Tools & Other ─────────────────────────── */
  { name: 'Git & GitHub',   percent: 95, category: 'tools'    },
  { name: 'Node.js',        percent: 80, category: 'tools'    },
  { name: 'Supabase',       percent: 80, category: 'tools'    },
]

/**
 * Categorie disponibili con label e ordine di visualizzazione.
 */
export const skillCategories = [
  { id: 'frontend', label: 'Frontend'       },
  { id: 'design',   label: 'Design'         },
  { id: 'tools',    label: 'Tools & Other'  },
]
