/**
 * Configurazione del sito: navigazione, contatti, servizi esterni.
 * I testi delle sezioni stanno in src/data.
 */

export const OWNER = 'Nicolas Brazzo'

export const EMAIL = 'nicolasbrazzo8@gmail.com'

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqejgpyg'

export const CV_FILENAME = 'Nicolas Brazzo — Frontend Developer.pdf'

/** Voci della navbar: l'id coincide con quello della sezione. */
export const NAV_LINKS = [
  { index: '01', label: 'Lavori', id: 'lavori' },
  { index: '02', label: 'Competenze', id: 'competenze' },
  { index: '03', label: 'Percorso', id: 'percorso' },
  { index: '04', label: 'Contatti', id: 'contatti' },
]

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/NicolasBrazzo' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicolas-brazzo-a91509286/' },
]

export const NAV_COPY = {
  status: 'Disponibile',
  openMenu: 'Apri il menu',
  closeMenu: 'Chiudi il menu',
}
