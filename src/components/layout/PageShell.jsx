import { BackgroundGrid } from './BackgroundGrid'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Cornice comune a tutte le pagine: griglia di sfondo, navbar, footer. */
export function PageShell({ children }) {
  return (
    <>
      <BackgroundGrid />
      <Navbar />
      <main id="top">{children}</main>
      <Footer />
    </>
  )
}
