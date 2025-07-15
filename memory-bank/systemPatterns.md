# System Patterns

## Architectural Patterns

### Full-Stack Monorepo Architecture
- **Pattern**: Clear separation of concerns between frontend (Next.js) and backend (Hono) in a monorepo
- **Purpose**: Independent deployment while sharing types and configurations
- **Implementation**: Turborepo orchestration with PNPM workspaces

### Edge-First Deployment Strategy  
- **Pattern**: Frontend on Vercel, Backend on Cloudflare Workers
- **Purpose**: Global low-latency distribution optimized for each platform
- **Implementation**: Platform-specific optimizations and edge computing

### Type-Safe Full-Stack Communication
- **Pattern**: End-to-end type safety from database to UI
- **Purpose**: Eliminate runtime type errors and improve developer experience
- **Implementation**: Drizzle ORM → oRPC → TanStack Query → React components

## Design Patterns

### Repository Pattern with ORM
- **Pattern**: Data access abstraction through Drizzle ORM
- **Purpose**: Decouple business logic from database implementation
- **Implementation**: Modular schema files with type-safe queries

### Middleware Chain Pattern
- **Pattern**: Authentication and authorization middleware pipeline
- **Purpose**: Composable request processing with context enrichment
- **Implementation**: Better Auth → Context creation → oRPC procedures

### Provider Pattern for Client State
- **Pattern**: React Context providers for global state management
- **Purpose**: Share authentication state and UI preferences across components
- **Implementation**: Auth providers, Theme providers, Query client providers

## Common Idioms

### "use client" Directive Pattern
- **Idiom**: Explicit client-side rendering boundaries in Next.js App Router
- **Usage**: Components that need browser APIs or interactivity
- **Example**: `"use client"` at top of components using hooks or event handlers

### Procedure Definition Pattern
- **Idiom**: Consistent oRPC procedure creation with input validation
- **Usage**: `publicProcedure.input(schema).handler(async ({ input }) => {...})`
- **Example**: All API endpoints follow this type-safe pattern

### Conditional Rendering with Loading States
- **Idiom**: React query states for data fetching UI patterns
- **Usage**: `{isLoading ? <Loading /> : isError ? <Error /> : <Data />}`
- **Example**: Consistent loading/error/success state handling

### Asset Import Optimization
- **Idiom**: Static asset imports for Next.js optimization
- **Usage**: `import image from '/path/to/image.webp'` for automatic optimization
- **Example**: All images use Next.js Image component with proper imports

### Utility-First Styling
- **Idiom**: TailwindCSS class composition patterns
- **Usage**: Responsive, state-aware utility combinations
- **Example**: `className="flex items-center space-x-4 hover:bg-gray-100 md:space-x-6"`

## Turborepo Monorepo Structure

Monorepo architecture with clear separation between frontend (web) and backend (server) applications. Uses Turborepo for build orchestration, allowing independent deployment and development while sharing common dependencies and configurations.

### Examples

- apps/web/ - Next.js frontend application
- apps/server/ - Hono backend API
- package.json with workspace configuration
- turbo.json defining build dependencies
- pnpm-workspace.yaml for package management


## oRPC Type-Safe API Communication

Type-safe Remote Procedure Call system using oRPC that provides end-to-end type safety from client to server. Integrates with TanStack Query for reactive data fetching and caching, replacing traditional REST API patterns.

### Examples

- appRouter in server/src/routers/index.ts defining procedures
- orpc client setup in web/src/lib/orpc.ts
- publicProcedure and protectedProcedure patterns
- createQuery(orpc.healthCheck.queryOptions()) usage pattern
- RPCHandler integration with Hono middleware


## Cloudflare Workers Serverless Deployment

Cloudflare Workers runtime environment with specific patterns for serverless deployment. Uses environment variables for configuration, handles CORS properly, and integrates with Cloudflare's edge infrastructure.

### Examples

- env from cloudflare:workers import
- Hono app with CORS middleware
- wrangler.jsonc configuration
- Environment-based database URL configuration
- RPCHandler with prefix routing



## Next.js React Component Architecture

Component-based UI architecture using Next.js with React and TypeScript. Features React hooks for state management, App Router for routing, and optimized image handling. Uses TailwindCSS for styling with responsive design patterns and accessibility considerations.

### Examples

- Component structure in src/components/
- App Router file organization in src/app/
- Next.js Image optimization with next/image
- React hooks (useState, useEffect, useContext) for state management
- TailwindCSS utility classes with custom fonts
- Layout components with children props pattern
- Server and Client Components distinction


## Modular Database Schema Design

Database schema organization with Drizzle ORM using modular schema files. Separates concerns by feature (auth, todo, etc.) and provides type-safe database operations with PostgreSQL.

### Examples

- schema/auth.ts for authentication tables
- schema/todo.ts for application data
- Drizzle adapter integration with Better Auth
- Type-safe database queries with select(), insert(), update()
- Migration management with drizzle-kit


## Context-Aware Authentication Middleware

Middleware-based authentication using Better Auth with context-aware authorization. Implements public and protected procedure patterns for API access control, with session management and social authentication support.

### Examples

- requireAuth middleware in orpc.ts
- publicProcedure vs protectedProcedure patterns
- Context creation with session data
- Better Auth configuration with Google and GitHub providers
- Session-based route protection


## Immersive Gaming UI Design

Fantasy/cyberpunk themed UI design with immersive lore integration. Uses custom fonts, GSAP animations, particle effects, and dynamic backgrounds to create an engaging gaming experience. Implements responsive design with mobile-first approach.

### Examples

- Custom font loading (Cinzel, Cormorant Garamond, etc.)
- GSAP animation patterns for UI interactions
- Dynamic background image system
- Particle system implementation
- Thematic color schemes and border effects
- Mobile menu with hamburger animation


## Framework Migration Strategy

Strategic approach to framework migration while preserving project history and functionality. Uses Git branching to maintain both versions during transition, allowing for parallel development and gradual migration of features.

### Examples

- main branch maintains SvelteKit version
- master branch contains Next.js migration
- Asset preservation and reorganization during migration
- Package.json transformation for React ecosystem
- Component architecture translation from Svelte to React
- Deployment strategy change from Cloudflare Pages to Vercel


## RPG Floating Orb Navigation Pattern

Immersive navigation system using a mystical floating orb that expands into a radial portal menu. Provides unique user experience for game-like coding platform with hover states, animations, and thematic portals for each section. Includes player status display, XP progression, and day/night cycle theme toggle.

### Examples

- GameMenu.tsx with useState for menu expansion
- Radial positioning using trigonometry for portal placement
- CSS custom properties for consistent RPG theming
- useTheme hook integration for day/night cycle
- Conditional rendering based on authenticated routes
- Portal tooltips with hover state management


## Conditional Game Interface Layout Pattern

Route-aware layout component that conditionally renders game interface elements only on authenticated game routes. Provides ambient background effects, floating particles, and immersive atmosphere while preserving clean layout for public pages.

### Examples

- GameLayout.tsx with pathname checking
- Route array for game-specific paths
- Conditional rendering based on route matching
- Background particle effects with random positioning
- Z-index layering for overlay components
- usePathname hook for route detection


## Intersection Observer Lazy Loading Pattern

Intersection observer-based lazy loading for performance optimization. Components are loaded only when they enter the viewport, reducing initial bundle size and improving page load performance. Includes fallback loading states with themed spinners.

### Examples

- withIntersectionLoading HOC pattern
- Dynamic imports with Next.js dynamic()
- Suspense boundaries with custom loading components
- LazyComponents.tsx with component factory functions
- Viewport threshold configuration (0.1, 0.2)
- Loading spinner with RPG theming
