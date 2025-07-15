# MemoriPilot: System Architect

## Overview
This file contains the architectural decisions and design patterns for the MemoriPilot project.

## Architectural Decisions

- Migrated from SvelteKit to Next.js for better React ecosystem support
- Selected Vercel for frontend deployment to optimize Next.js performance
- Implemented oRPC for end-to-end type safety replacing traditional REST APIs
- Extended Better Auth with Google authentication alongside GitHub
- Adopted Drizzle ORM for type-safe database operations
- Implemented Turborepo for efficient monorepo build management
- Chose PostgreSQL for relational data with complex gaming relationships
- Used TailwindCSS for rapid UI development with consistent design system
- Maintained Cloudflare Workers for backend due to global edge performance



- Chosen SvelteKit over Next.js for performance and bundle size benefits
- Selected Cloudflare Workers for global edge deployment and low latency
- Implemented oRPC for end-to-end type safety replacing traditional REST APIs
- Used Better Auth for comprehensive authentication with social providers
- Adopted Drizzle ORM for type-safe database operations
- Implemented Turborepo for efficient monorepo build management
- Chose PostgreSQL for relational data with complex gaming relationships
- Used TailwindCSS for rapid UI development with consistent design system



1. **Decision 1**: Description of the decision and its rationale.
2. **Decision 2**: Description of the decision and its rationale.
3. **Decision 3**: Description of the decision and its rationale.



## Design Considerations

- Cloudflare Workers have specific runtime limitations and cold start considerations
- Database connections need to be optimized for serverless environment
- Type safety across client-server boundary is critical for development velocity
- Progressive Web App features need careful implementation for offline capability
- Gaming features require real-time updates consideration
- Educational content progression needs careful UX design
- Scalability considerations for competitive leaderboards and PvP features
- Migration from SvelteKit to Next.js requires careful component refactoring
- Vercel deployment optimizations for Next.js performance



- Cloudflare Workers have specific runtime limitations and cold start considerations
- Database connections need to be optimized for serverless environment
- Type safety across client-server boundary is critical for development velocity
- Progressive Web App features need careful implementation for offline capability
- Gaming features require real-time updates consideration
- Educational content progression needs careful UX design
- Scalability considerations for competitive leaderboards and PvP features



## Components

### Web Client

Next.js frontend application with React components, routing, and client-side logic

**Responsibilities:**

- User interface rendering with React
- Client-side routing with App Router
- State management with React hooks
- API communication via oRPC
- Authentication flows
- Progressive Web App features

### API Server

Hono-based API server running on Cloudflare Workers

**Responsibilities:**

- HTTP request handling
- API route management
- Authentication middleware
- Database operations
- oRPC procedure handling
- CORS management

### Database Layer

PostgreSQL database with Drizzle ORM for data persistence

**Responsibilities:**

- User data storage
- Session management
- Game state persistence
- Leaderboard data
- Todo/task management
- Authentication records

### oRPC Layer

Type-safe RPC communication layer between client and server

**Responsibilities:**

- API type safety
- Client-server communication
- Request/response validation
- Integration with TanStack Query
- Error handling

### Auth System

Authentication and authorization system using Better Auth with multiple providers

**Responsibilities:**

- User registration/login
- Session management
- Social authentication (Google, GitHub)
- Protected route access
- JWT token handling





### Web Client

SvelteKit frontend application with routing, components, and client-side logic

**Responsibilities:**

- User interface rendering
- Client-side routing
- State management
- API communication
- Authentication flows
- Progressive Web App features

### API Server

Hono-based API server running on Cloudflare Workers

**Responsibilities:**

- HTTP request handling
- API route management
- Authentication middleware
- Database operations
- oRPC procedure handling
- CORS management

### Database Layer

PostgreSQL database with Drizzle ORM for data persistence

**Responsibilities:**

- User data storage
- Session management
- Game state persistence
- Leaderboard data
- Todo/task management
- Authentication records

### oRPC Layer

Type-safe RPC communication layer between client and server

**Responsibilities:**

- API type safety
- Client-server communication
- Request/response validation
- Integration with TanStack Query
- Error handling

### Auth System

Authentication and authorization system using Better Auth

**Responsibilities:**

- User registration/login
- Session management
- Social authentication (GitHub)
- Protected route access
- JWT token handling



