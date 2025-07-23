# System Patterns

## Core Design Patterns

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

## Code Patterns

### Procedure Definition Pattern
- **Pattern**: Consistent oRPC procedure creation with input validation
- **Usage**: `publicProcedure.input(schema).handler(async ({ input }) => {...})`
- **Example**: All API endpoints follow this type-safe pattern

### Conditional Rendering with Loading States
- **Pattern**: React query states for data fetching UI patterns
- **Usage**: `{isLoading ? <Loading /> : isError ? <Error /> : <Data />}`
- **Example**: Consistent loading/error/success state handling

### Client Directive Pattern
- **Pattern**: Explicit client-side rendering boundaries in Next.js App Router
- **Usage**: Components that need browser APIs or interactivity
- **Example**: `"use client"` at top of components using hooks or event handlers

### Asset Import Optimization
- **Pattern**: Static asset imports for Next.js optimization
- **Usage**: `import image from '/path/to/image.webp'` for automatic optimization
- **Example**: All images use Next.js Image component with proper imports

## UI/UX Patterns

### RPG Floating Orb Navigation Pattern
- **Pattern**: Immersive navigation using mystical floating orb that expands into radial portal menu
- **Purpose**: Unique user experience for game-like coding platform with thematic portals
- **Implementation**: GameMenu.tsx with radial positioning using trigonometry, hover states, XP progression display

### Conditional Game Interface Layout Pattern
- **Pattern**: Route-aware layout component that conditionally renders game interface elements
- **Purpose**: Game atmosphere only on authenticated routes, clean layout for public pages
- **Implementation**: GameLayout.tsx with pathname checking, background particle effects, z-index layering

### Intersection Observer Lazy Loading Pattern
- **Pattern**: Intersection observer-based lazy loading for performance optimization
- **Purpose**: Components loaded only when entering viewport, reducing initial bundle size
- **Implementation**: withIntersectionLoading HOC, dynamic imports with Next.js dynamic(), Suspense boundaries

### Immersive Gaming UI Design
- **Pattern**: Fantasy/cyberpunk themed UI with custom fonts, GSAP animations, particle effects
- **Purpose**: Engaging gaming experience with responsive design
- **Implementation**: Custom font loading, dynamic background system, thematic color schemes, mobile-first approach
