import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Send } from 'lucide-react'
import { useReveal } from '../../../hooks/useReveal'
import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { CopyButton } from '../../ui/CopyButton'
import { Field } from '../../ui/Field'
import { Label } from '../../ui/Label'
import { Section } from '../../ui/Section'
import { CONTACT_SECTION } from '../../../data/home'
import { EMAIL, FORMSPREE_ENDPOINT, SOCIAL_LINKS } from '../../../constants/site'

/** Invio del form a Formspree con stati idle → sending → success | error. */
function useContactForm(copy) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setError('')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
        return
      }

      const data = await response.json().catch(() => null)
      setError(data?.errors?.[0]?.message || copy.errorGeneric)
      setStatus('error')
    } catch {
      setError(copy.errorNetwork)
      setStatus('error')
    }
  }

  return { status, error, submit }
}

export function Contact() {
  const ref = useRef(null)
  const emailRef = useRef(null)
  useReveal(ref)

  const copy = CONTACT_SECTION
  const { status, error, submit } = useContactForm(copy.form)
  const sending = status === 'sending'

  return (
    <Section id="contatti" ref={ref}>
      <Container>
        <Label className="mb-34 block">{copy.index}</Label>

        <h2 data-reveal className="m-0 font-display text-contact font-extrabold">
          <span className="block">{copy.headline[0]}</span>
          <span className="block lg:pl-[12%]">{copy.headline[1]}</span>
          <span className="u-hand block text-accent">{copy.hand}</span>
        </h2>

        <div className="mt-89 grid grid-cols-12 gap-x-21 gap-y-55 lg:mt-144">
          {/* Contatto diretto */}
          <div data-reveal className="col-span-12 flex flex-col gap-34 lg:col-span-5">
            <p className="m-0 max-w-[44ch] text-fg-2">{copy.intro}</p>

            <div className="flex flex-wrap items-center gap-13">
              <span
                ref={emailRef}
                className="font-display text-xl font-medium tracking-[-0.02em] break-all select-all"
              >
                {EMAIL}
              </span>
              <CopyButton text={EMAIL} targetRef={emailRef} label={copy.copy} copiedLabel={copy.copied} />
            </div>

            <div className="flex flex-wrap items-center gap-21">
              <Label>{copy.socialsLabel}</Label>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-label group inline-flex items-center gap-5 text-fg-2 no-underline transition-colors duration-(--duration-micro) hover:text-accent"
                >
                  {label}
                  <ArrowUpRight
                    aria-hidden
                    size={13}
                    strokeWidth={1.75}
                    className="transition-transform duration-(--duration-micro) ease-out-expo group-hover:-translate-y-2 group-hover:translate-x-2"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div data-reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
            {status === 'success' ? (
              <div role="status" className="flex flex-col gap-13 rounded-md border border-line-strong bg-surface p-34">
                <p className="m-0 inline-flex items-center gap-13 font-display text-xl font-semibold">
                  <Check aria-hidden size={21} strokeWidth={2} className="text-accent" />
                  {copy.form.successTitle}
                </p>
                <p className="m-0 text-fg-2">{copy.form.successText}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-21">
                {/* Honeypot anti-spam, invisibile agli utenti reali */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                <div className="grid grid-cols-1 gap-21 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    name="name"
                    label={copy.form.name.label}
                    placeholder={copy.form.name.placeholder}
                    autoComplete="name"
                    required
                    disabled={sending}
                  />
                  <Field
                    id="contact-email"
                    name="email"
                    type="email"
                    label={copy.form.email.label}
                    placeholder={copy.form.email.placeholder}
                    autoComplete="email"
                    required
                    disabled={sending}
                  />
                </div>
                <Field
                  id="contact-message"
                  name="message"
                  multiline
                  rows={5}
                  label={copy.form.message.label}
                  placeholder={copy.form.message.placeholder}
                  required
                  disabled={sending}
                />

                <div className="flex flex-col items-start gap-13 pt-8">
                  <Button type="submit" icon={sending ? undefined : Send} disabled={sending} magnetic>
                    {sending ? copy.form.sending : copy.form.submit}
                  </Button>
                  {status === 'error' && (
                    <p role="alert" className="m-0 text-sm text-accent">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
