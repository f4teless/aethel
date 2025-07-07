# ⚔️ Fated

**Fated** is a gamified, story-driven coding RPG where players fight enemies by solving coding challenges. It blends dynamic code-based combat with AI-generated storytelling, letting players pick coding-based classes, explore branching narratives, dive into dungeons, and duel in real-time PvP solve-offs.

> _“The thief blocks your path with an encrypted sigil — solve this or lose his trail.”_

## Features

- **AI-Driven Narrative** with GPT-4o generated branching storylines.
- **Code-Based Combat** where you solve problems to attack, progress, or unlock paths.
- **Class System** with five domain-driven archetypes:
  - 🛡️ **Array Knight** — Arrays, Strings, Sliding Window  
  - 🔮 **Dynamic Mage** — Dynamic Programming, Recursion  
  - 🕷️ **Graph Assassin** — Graphs, BFS/DFS  
  - 🔥 **Greedy Ronin** — Greedy, Sorting, Math  
  - 🧩 **Bit Sage** — Bitmasking, Binary Tricks  
- **Gameplay Modes**:
  - 🧠 **Story Mode** — AI-narrative with embedded coding events.
  - 🏯 **Dungeons** — Optional themed challenges for loot and XP.
  - ⚔️ **PvP Battles** — Real-time code duels with modifiers and leaderboards.
- **Dynamic Monaco Editor** for solving problems directly inside the scene.
- **Progression System** that unlocks passives, perks, and efficiencies per class.

## Core Gameplay Loop

1. **Narration** — AI-generated event appears.
2. **Challenge** — A coding puzzle triggers.
3. **Solve** — Code is submitted through the Monaco editor.
4. **Outcome** — Success or failure branches the story.
5. **Repeat** — Continue narrative or choose PvP/Dungeons.

## Tech Stack

- **Frontend**: SvelteKit, TailwindCSS, GSAP, shadcn/ui
- **Editor**: Monaco
- **Backend**: Hono, oRPC
- **Database**: PostgreSQL (via Neon)
- **ORM**: Drizzle
- **AI**: Gemini 2.5 PRO
- **Authentication**: Better-Auth (email/password)
- **Analytics**: Vercel, Posthog
- **Hosting**: Vercel (frontend), Cloudflare Workers (backend)
- **Optional**: Chroma/Weaviate for personalization memory

## Project Structure

```

fated/
├── apps/
│   ├── web/         # Frontend (SvelteKit)
│   └── server/      # Backend (Hono + oRPC)

````

## Setup Instructions

### Install & Start

```bash
pnpm install
pnpm dev
````

Access the project at:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Ensure PostgreSQL is running and `.env` is configured:
2. Run:

```bash
pnpm db:push
pnpm db:studio
```

### Development Utilities

```bash
# Lint and format
pnpm check

# Type checking
pnpm check-types

# Update dependencies
pnpm dlx taze -r
```

### Deployment

```bash
cd apps/web && pnpm deploy
```

## Useful Commands

| Command            | Description                |
| ------------------ | -------------------------- |
| `pnpm dev`         | Start full dev environment |
| `pnpm build`       | Build all apps             |
| `pnpm dev:web`     | Start only frontend        |
| `pnpm dev:server`  | Start only backend         |
| `pnpm db:push`     | Apply DB schema            |
| `pnpm db:studio`   | Open DB UI                 |
| `pnpm check`       | Format + lint              |
| `pnpm check-types` | Type check everything      |

## License

Licensed under the Elastic License. See [LICENSE](./LICENSE) for details.
