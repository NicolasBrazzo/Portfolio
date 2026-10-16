import { PageShell } from '../components/layout/PageShell'
import { Hero } from '../components/sections/home/Hero'
import { HomeMarquee } from '../components/sections/home/HomeMarquee'
import { Approach } from '../components/sections/home/Approach'
import { Projects } from '../components/sections/home/Projects'
import { Skills } from '../components/sections/home/Skills'
import { Journey } from '../components/sections/home/Journey'
import { Contact } from '../components/sections/home/Contact'

export function Home() {
  return (
    <PageShell>
      <Hero />
      <HomeMarquee />
      <Approach />
      <Projects />
      <Skills />
      <Journey />
      <Contact />
    </PageShell>
  )
}
