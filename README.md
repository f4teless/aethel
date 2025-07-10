# ⚔️ Aethel

**Aethel** is a **gamified, story-driven coding RPG** where players fight enemies by solving coding challenges. It blends dynamic, code-based combat with AI-generated storytelling—letting players pick coding archetypes, explore branching narratives, dive into dungeons, and duel in real-time PvP solve-offs.

> *“The thief blocks your path with an encrypted sigil — solve this or lose his trail.”*

---

## ✨ Features

* **AI-Driven Narrative** — Gemini 2.5 Pro generated branching storylines with reactive choices.
* **Code-as-Combat** — Solve real algorithmic challenges to attack, progress, or unlock paths.
* **Domain-Based Class System**:

  * 🛡️ **Array Knight** — Arrays, Strings, Sliding Window
  * 🔮 **Dynamic Mage** — Dynamic Programming, Recursion
  * 🕷️ **Graph Assassin** — Graphs, BFS/DFS
  * 🔥 **Greedy Ronin** — Greedy, Sorting, Math
  * 🧩 **Bit Sage** — Bitmasking, Binary Tricks
* **Gameplay Modes**:

  * 🧠 **Story Mode** — AI-narrative with embedded coding events.
  * 🏯 **Dungeons** — Optional themed challenges for loot and XP.
  * ⚔️ **PvP Battles** — Real-time code duels with leaderboards.
* **Integrated Monaco Editor** — Code directly inside the game.
* **Progression System** — Unlock passives, perks, and efficiencies per class.

---

## 🌀 Core Gameplay Loop

1. **Narration** — An AI-generated story event is triggered.
2. **Challenge** — A coding puzzle emerges tied to the story.
3. **Solve** — Submit your solution using the Monaco editor.
4. **Outcome** — Branching narrative based on success/failure.
5. **Repeat** — Continue your journey or enter PvP/dungeons.

---

## 🧱 Tech Stack

| Layer         | Technology                                      |
| ------------- | ----------------------------------------------- |
| **Frontend**  | SvelteKit, TailwindCSS, GSAP, shadcn/ui         |
| **Editor**    | Monaco (in-game integration)                    |
| **Backend**   | Hono (running in Cloudflare Workers)            |
| **Database**  | PostgreSQL (via Neon)                           |
| **ORM**       | Drizzle ORM                                     |
| **AI**        | Gemini 2.5 PRO (for narrative)                  |
| **Auth**      | Better-Auth (email/password)                    |
| **Analytics** | Vercel + PostHog                                |
| **Hosting**   | Cloudflare Workers |
| **Optional**  | Chroma / Weaviate (for personalization memory)  |

---

## 📁 Project Structure

```bash
aethel/
├── apps/
│   ├── web/         # Frontend (SvelteKit)
│   └── server/      # Backend (Hono + oRPC)
```

---

## 🛠️ Setup Instructions

### 1. Prerequisites

* **Node.js v20+**
* **pnpm** (Install via `npm i -g pnpm`)
* A PostgreSQL database (local or remote, e.g., Neon)

---

### 2. Install & Start

```bash
git clone https://github.com/your-username/aethel.git
cd aethel

pnpm install
cp .env.example .env  # Then edit with your DB config

pnpm db:push          # Push schema to the database
pnpm dev              # Start dev environment
```

---

### 3. Access the Project

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Development Utilities

```bash
# Lint and format code
pnpm check

# Type checking
pnpm check-types

# Update all dependencies
pnpm dlx taze -r
```

---

## 🚀 Deployment

**Cloudflare Pages (recommended):**

1. Push your code to GitHub.
2. Connect your GitHub repo to Cloudflare Pages.
3. Set build settings:

   * **Framework Preset:** SvelteKit
   * **Build Command:** `pnpm build`
   * **Output Directory:** `.cloudflare`
4. Add your `DATABASE_URL` under Environment Variables.
5. Deploy.

---

## 📜 Useful Commands

| Command            | Description                |
| ------------------ | -------------------------- |
| `pnpm dev`         | Start full dev environment |
| `pnpm dev:web`     | Start frontend only        |
| `pnpm dev:server`  | Start backend only         |
| `pnpm build`       | Build all apps             |
| `pnpm db:push`     | Push schema to DB          |
| `pnpm db:studio`   | Launch Drizzle Studio UI   |
| `pnpm check`       | Run linter + formatter     |
| `pnpm check-types` | Run type checker           |

---

## 🤝 Contributing

We welcome contributions! Feel free to fork the repo, open issues, or submit PRs. Whether it's code, docs, or new challenge ideas—Aethel grows with you.

---

## 📄 License

Licensed under the **Elastic License 2.0**.
See [LICENSE](./LICENSE) for details.