# Portfolio — Nicolas Brazzo

Portfolio personale: una pagina singola che raccoglie progetti, casi studio e
percorso professionale, costruita con React e animata con GSAP.

**Live** → [brzportfolio.vercel.app](https://brzportfolio.vercel.app)

---

## Stack

| | |
|---|---|
| **Framework** | React 19 + Vite |
| **Stile** | Tailwind CSS |
| **Animazioni** | GSAP (ScrollTrigger) |
| **Form** | Formspree |
| **Deploy** | Vercel |

---

## Struttura

Single page application con sezioni ancorate: hero, progetti selezionati,
casi studio, processo di lavoro, competenze, percorso e contatti.

```
src/
├── components/   # componenti UI e sezioni della pagina
├── assets/       # immagini e risorse statiche
└── main.jsx      # entry point
```

---

## Avvio in locale

```bash
git clone https://github.com/NicolasBrazzo/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Il sito parte su `http://localhost:5173`.

| Comando | Descrizione |
|---|---|
| `npm run dev` | Server di sviluppo con HMR |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Anteprima locale della build |
| `npm run lint` | Controllo ESLint |

---

## Stato

In evoluzione. È in programma una revisione della direzione visiva.

---

## Contatti

[Portfolio](https://brzportfolio.vercel.app) ·
[LinkedIn](https://www.linkedin.com/in/nicolas-brazzo-a91509286/) ·
nicolasbrazzo8@gmail.com