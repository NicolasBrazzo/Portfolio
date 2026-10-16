import { Marquee } from '../../ui/Marquee'
import { MARQUEE } from '../../../data/home'

export function HomeMarquee() {
  return <Marquee items={MARQUEE.items} label={MARQUEE.label} />
}
