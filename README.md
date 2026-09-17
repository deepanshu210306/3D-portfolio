# 3D Portfolio — Samurai Edition

A personal developer portfolio with a cinematic samurai theme: a katana-slash opening sequence, a procedurally built 3D katana you can grab and spin, and scroll-driven motion design throughout.

**Live:** [deepanshupf.vercel.app](https://deepanshupf.vercel.app)

---

## Features

### Opening sequence
- **Katana-slash reveal** — the kanji 侍 emerges out of a blur inside a rotating enso ring, a red guide line traces the blade being drawn, then a white slash rips across in 0.16s
- **The screen gets cut in half** — the kanji tears apart along the slash line and each half is carried off-frame by its own curtain half, revealing the hero underneath
- **Impact detail** — white flash, expanding shockwave along the cut, screen recoil, and 18 embers scattering off the blade
- **Skippable** — any click or keypress jumps straight to the site, and the whole sequence is bypassed for visitors with `prefers-reduced-motion` set

### Visual & theme
- **Samurai-inspired design system** — dark palette, red accents, and typography built around a warrior / forge aesthetic
- **Japanese section naming** — Michi (道), Shugyō (修行), Buki (武器), Senji (戦事), Renraku (連絡) with red kanji kickers beside each title
- **Hover tooltips** — cursor-following labels reveal the English meaning of section names in the navbar and headings (e.g. Shugyō → Training)
- **Hero artwork** — samurai town illustration behind the hero at reduced opacity, with a gradient scrim so text and the navbar stay legible over it
- **Custom favicon** — hand-written SVG of a katana against a rising sun
- **Responsive layout** — fluid typography and layouts that reflow rather than shrink across breakpoints

### 3D hero
- **Procedural katana** — blade, tsuba (guard), habaki, tsuka (handle), ito wrap, and fittings built with Three.js `ExtrudeGeometry` and custom shapes (no external 3D model files)
- **Drag to rotate** — grab the sword and spin it freely through a full 360° of yaw and ±72° of pitch, with momentum that carries after you let go
- **Idle motion that yields** — slow auto-spin, breathing, and sway that blend out the instant you grab the blade, and blend back in when you release
- **PBR-style materials** — metalness and roughness tuned separately for steel, iron, and bronze fittings, plus ember sparkles and environment lighting

### Content sections
- **Hero** — name, role kicker, CTAs, and the interactive katana
- **Michi (The Path)** — education and leadership as two horizontal milestone paths, from schooling through to IIT Delhi and Overall Coordinator
- **Shugyō (Training)** — full-width internship cards (Mindcase, DataSense, IIT Delhi game development)
- **Buki (Arsenal)** — languages, frameworks, and developer tools
- **Senji (Campaigns)** — circular coverflow carousel of projects with auto-rotation, side arrows, and dot navigation
- **Renraku (Contact)** — email, GitHub, LinkedIn, and LeetCode

### Interaction & polish
- **Background music** — ambient track with a floating mute/unmute toggle, started on first interaction to satisfy autoplay policies
- **Sticky navbar** — transparent over the hero artwork, blurred backdrop once you scroll
- **Coverflow carousel** — front card sits fully opaque and forward while neighbours recede and dim; auto-advances every 4s and pauses on hover
- **Milestone paths** — arrows and nodes stagger in as each track scrolls into view, with the current position marked by a filled, glowing node

---

## How I Made This

### 1. Foundation
I scaffolded the project with **Vite + React** for fast dev builds and a lean production bundle. The app is a single-page layout composed of focused components (`Intro`, `Hero`, `About`, `Internship`, `Skills`, `Projects`, `Contact`) wired together in `App.jsx`.

### 2. Theme & layout
I defined global design tokens in CSS (`--color-accent`, `--color-bg`, heading/body fonts) and gave each section consistent spacing and title treatment via a shared `SectionTitle` component. The samurai naming came from wanting something more distinctive than generic labels like "About" or "Projects" — each section maps to a traditional concept (path, training, weapons, campaigns, contact).

### 3. The 3D katana
The katana is the centerpiece. Instead of importing a `.glb` model, I modeled it in code:

- **Blade** — `THREE.Shape` profile with bezier curves for taper and sori (curve), extruded along the correct axis
- **Tsuba** — oval guard with a center hole via `ExtrudeGeometry` + `Shape` holes
- **Handle & fittings** — boxes, cylinders, and layered meshes for fuchi, kashira, samegawa panels, and ito wrap bands

The scene uses **@react-three/fiber** for the React renderer and **@react-three/drei** for `Environment` and `Sparkles`.

### 4. Making the sword feel good to hold
This took the most iteration. I started with drei's `OrbitControls`, then `PresentationControls`, and neither felt right — the sword snapped back to center on release, the rotation range felt boxed in, and the damping made dragging feel laggy. I ended up writing the interaction directly against **@use-gesture/react**: pointer deltas map straight onto rotation with no interpolation layer, so it tracks the cursor exactly, and released momentum decays on its own instead of springing home.

The idle animation was the subtle part. Cutting it dead on grab caused a visible twitch, so there's an `idleBlend` value that fades the ambient motion out over a few frames and syncs the rotation target to the currently displayed rotation at drag start, which removes the jump entirely.

### 5. The opening sequence
The reveal is two curtain halves with complementary `clip-path` polygons that slide apart along the slash line. To make the kanji *tear*, the centre mark is rendered inside **both** halves — each copy gets clipped to its own side, so when they separate each carries away half the character.

The halves have to overlap slightly or a hairline gap shows between them, but the mark's glow and text-shadow are semi-transparent, so that overlap band double-composites into a visible stripe. The fix is a swap: a single seamless layer during the build-up, replaced by the two clipped halves at the exact frame the blade finishes crossing, hidden under the impact flash. After the strike that overlap reads as the hot glowing edge of a fresh cut, which is what you want anyway.

### 6. Motion & UX
**Framer Motion** handles `whileInView` fades and slides so content reveals as you scroll. I added a custom **HoverTooltip** component (portal-rendered, viewport-aware positioning) so Japanese titles stay thematic while remaining readable to visitors who don't read kanji.

### 7. Content & structure
Portfolio copy, internships, leadership roles, skills, and projects live as structured data at the top of each component, so adding a milestone or a project is a one-line change rather than a markup edit.

### 8. Performance & deployment
The hero artwork started as a 2.7 MB PNG, which is far too heavy for a background sitting at 50% opacity — converting it to JPEG brought it to 365 KB with no perceptible difference at that opacity, and a `preload` hint in `index.html` gets it fetched early. The site deploys on **Vercel** as a static Vite build.

---

## Things that took debugging

A few problems in here were non-obvious enough to be worth writing down:

**Framer Motion keyframe arrays override `initial`.** An `animate={{ opacity: [0.8, 0] }}` with a 3s delay does *not* respect `initial={{ opacity: 0 }}` — it snaps to the first keyframe immediately and holds there for the whole delay. This left the intro's impact shockwave visible as a stray light streak from the first frame. Every keyframe array now starts at its resting value.

**React Three Fiber measures its canvas with `getBoundingClientRect`, which includes CSS transforms.** The hero's 3D wrapper was animating `scale` from 0.9 to 1, so the canvas sized its drawing buffer and camera aspect to the mid-animation scale and then visibly snapped when it re-measured. The entrance animation uses translation instead — same effect, no distorted measurement.

**Locking body scroll changes the page width.** The intro sets `overflow: hidden` to prevent scrolling, which removes the scrollbar; restoring it reflowed the page by ~15px and resized the 3D canvas a second time. `scrollbar-gutter: stable` on `html` reserves that space permanently so the lock is layout-neutral.

---

## Tech Stack

| Layer | Tools |
|-------|--------|
| Framework | React 19 |
| Build | Vite 8 |
| 3D | Three.js 0.183, React Three Fiber 9, Drei 10 |
| Gestures | @use-gesture/react |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Styling | CSS (custom properties, no UI framework) |
| Hosting | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

---

## Project Structure

```
public/
├── favicon.svg           # Katana + rising sun
├── samurai-town.jpg      # Hero background artwork
└── kaze-no-kata.mp3      # Ambient background track

src/
├── components/
│   ├── Intro.jsx         # Katana-slash opening sequence
│   ├── Avatar3D.jsx      # Procedural katana + R3F canvas + drag interaction
│   ├── Hero.jsx          # Hero layout and CTAs
│   ├── About.jsx         # Michi — education & leadership paths
│   ├── Internship.jsx    # Shugyō — internship cards
│   ├── Skills.jsx        # Buki — tech stack
│   ├── Projects.jsx      # Senji — coverflow carousel
│   ├── Contact.jsx       # Renraku — contact & socials
│   ├── Navbar.jsx / Footer.jsx
│   ├── SectionTitle.jsx  # Title + kanji kicker pattern
│   └── HoverTooltip.jsx  # English label on hover
├── App.jsx               # Intro gating, audio, section composition
└── index.css             # Global tokens & shared styles
```

---

## Author

**Deepanshu** — IIT Delhi · Energy Engineering  
[GitHub](https://github.com/deepanshu210306) · [LinkedIn](https://www.linkedin.com/in/deephisariya/) · [Email](mailto:deepanshu210306@gmail.com)

---

## License

Personal portfolio project. Feel free to fork for inspiration; please do not copy the design verbatim without attribution.
