# 3D Portfolio — Samurai Edition

A personal developer portfolio with a cinematic samurai theme, a procedurally built 3D katana, and scroll-driven motion design.

**Live:** [deepanshupf.vercel.app](https://deepanshupf.vercel.app)

---

## Features

### Visual & theme
- **Samurai-inspired design system** — dark palette, red accents, glass panels, and typography built around a warrior / forge aesthetic
- **Japanese section naming** — Michi (道), Shugyō (修行), Buki (武器), Senji (戦事), Renraku (連絡) with red kanji kickers beside each title
- **Hover tooltips** — cursor-following labels reveal the English meaning of section names in the navbar and headings (e.g. Shugyō → Training)
- **Scroll animations** — section entrances, card stagger, and hero text powered by Framer Motion
- **Responsive layout** — mobile-friendly grid and typography scaling across breakpoints

### 3D hero
- **Procedural katana** — blade, tsuba (guard), habaki, tsuka (handle), ito wrap, and fittings built with Three.js `ExtrudeGeometry` and custom shapes (no external 3D model files)
- **React Three Fiber scene** — floating rotation, ember sparkles, environment lighting, and orbit controls on the hero katana
- **PBR-style materials** — metalness and roughness tuned for steel, iron, and bronze fittings

### Content sections
- **Hero** — name, role kicker, CTAs, and interactive 3D avatar
- **Michi (The Path)** — education and IIT Delhi leadership timeline
- **Shugyō (Training)** — full-width internship cards (Mindcase / DataSense, IIT Delhi VR game dev)
- **Buki (Arsenal)** — languages, frameworks, and developer tools
- **Senji (Campaigns)** — project showcase with tags and GitHub links
- **Renraku (Contact)** — email, GitHub, LinkedIn, and LeetCode

### Interaction & polish
- **Background music** — ambient track with a floating mute/unmute toggle (respects browser autoplay policies)
- **Sticky navbar** — transparent on load, blurred backdrop after scroll
- **Animated scroll indicator** on the hero
- **Interactive cards** — hover lifts, accent borders, and link affordances on projects and panels

---

## How I Made This

### 1. Foundation
I scaffolded the project with **Vite + React** for fast dev builds and a lean production bundle. The app is a single-page layout composed of focused components (`Hero`, `About`, `Internship`, `Skills`, `Projects`, `Contact`) wired together in `App.jsx`.

### 2. Theme & layout
I defined global design tokens in CSS (`--color-accent`, `--color-bg`, heading/body fonts) and built each section with a shared **glass-panel** style and consistent spacing. The samurai naming came from wanting something more distinctive than generic labels like “About” or “Projects”—each section maps to a traditional concept (path, training, weapons, campaigns, contact).

### 3. The 3D katana
The katana is the centerpiece. Instead of importing a `.glb` model, I modeled it in code:

- **Blade** — `THREE.Shape` profile with bezier curves for taper and sori (curve), extruded along the correct axis
- **Tsuba** — oval guard with a center hole via `ExtrudeGeometry` + `Shape` holes
- **Handle & fittings** — boxes, cylinders, and layered meshes for fuchi, kashira, samegawa panels, and ito wrap bands

The scene uses **@react-three/fiber** for the React renderer and **@react-three/drei** for `Float`, `Sparkles`, `Environment`, and `OrbitControls`. A `useFrame` loop drives slow Y-rotation and subtle tilt. Camera distance, scale, and FOV were tuned so the sword reads large in the hero without clipping during rotation.

### 4. Motion & UX
**Framer Motion** handles `whileInView` fades and slides so content reveals as you scroll. I added a custom **HoverTooltip** component (portal-rendered, viewport-aware positioning) so Japanese titles stay thematic while remaining accessible to visitors who do not read kanji.

### 5. Content & structure
Portfolio copy, internships, leadership roles, skills, and projects live as structured data inside each component. Project and internship cards link out to GitHub where repos exist. The internship section uses a horizontal full-width card layout—intro on the left, bullet highlights on the right on desktop.

### 6. Audio & deployment
A looping background track (`public/kaze-no-kata.mp3`) plays after the user’s first click or keypress to satisfy autoplay restrictions. The site is deployed on **Vercel** as a static Vite build.

---

## Tech Stack

| Layer | Tools |
|-------|--------|
| Framework | React 19 |
| Build | Vite 8 |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion |
| Icons | Lucide React |
| Styling | CSS (custom properties, no UI framework) |

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
src/
├── components/
│   ├── Avatar3D.jsx      # Procedural katana + R3F canvas
│   ├── Hero.jsx          # Hero layout and CTAs
│   ├── About.jsx         # Education & leadership
│   ├── Internship.jsx    # Shugyō — internship cards
│   ├── Skills.jsx        # Buki — tech stack
│   ├── Projects.jsx      # Senji — project grid
│   ├── Contact.jsx       # Renraku — contact & socials
│   ├── Navbar.jsx / Footer.jsx
│   ├── SectionTitle.jsx  # Title + kanji kicker pattern
│   └── HoverTooltip.jsx  # English label on hover
├── App.jsx
└── index.css             # Global tokens & shared styles
```

---

## Author

**Deepanshu** — IIT Delhi · Energy Engineering  
[GitHub](https://github.com/deepanshu210306) · [LinkedIn](https://www.linkedin.com/in/deephisariya/) · [Email](mailto:deepanshu210306@gmail.com)

---

## License

Personal portfolio project. Feel free to fork for inspiration; please do not copy the design verbatim without attribution.
