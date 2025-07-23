# Aethel: System Architecture & Design Decisions

## Overview
This file contains the architectural decisions and design patterns for the Aethel dark fantasy DSA education platform.

## Core Architectural Decisions

### Story-First Educational Architecture
- **Decision**: Integrate LeetCode-style DSA challenges directly into narrative flow from prologue
- **Implementation**: Three-path prologue system teaching different algorithmic foundations
- **Rationale**: Immediate challenge integration prevents false expectations and establishes "Pattern-Touched" character identity

### Progressive Complexity Curriculum
- **Decision**: Structure difficulty progression through story chapters (Easy → Medium → Hard)  
- **Implementation**: Prologue (Two Sum, Sudoku 4x4, Course Schedule) → Chapter 1 (Binary Search) → Chapter 2+ (Advanced algorithms)
- **Rationale**: Natural learning curve tied to character development and story progression

### Dark Fantasy Integration
- **Decision**: Use Shadow Slave/Lord of the Mysteries atmosphere with mathematical corruption themes
- **Implementation**: Pattern-sight abilities come with isolation, NPCs fear player's growing power
- **Rationale**: Creates emotional stakes and memorable context for algorithmic learning

## Technical Architecture

### Frontend (Next.js 15)
- **Framework**: Next.js 15 with App Router for modern React patterns
- **Styling**: Tailwind CSS for rapid development with dark fantasy theme
- **UI Pattern**: RPG-style floating orb navigation system for unique gaming experience
- **Performance**: Intersection observer lazy loading, code splitting, service worker caching
- **Deployment**: Vercel for optimal Next.js performance and edge distribution

### Backend (Cloudflare Workers + Hono)
- **API Framework**: Hono for lightweight, fast edge computing
- **Type Safety**: oRPC for end-to-end type safety from database to UI
- **Database**: PostgreSQL with Drizzle ORM for complex relational data
- **Authentication**: Clerk for comprehensive user management
- **Deployment**: Cloudflare Workers for global edge performance

### Development Infrastructure
- **Monorepo**: Turborepo for efficient parallel builds and caching
- **Package Manager**: PNPM for fast, efficient dependency management
- **Workspace**: Clear separation between frontend and backend with shared types
- **Edge-First**: Optimized for global low-latency access

## Educational Architecture Patterns

### Challenge Integration Pattern
- **Narrative Embedding**: DSA problems emerge naturally from story events
- **Progressive Difficulty**: Chapter-based complexity progression (Easy → Medium → Hard)
- **Function Templates**: Proper LeetCode-style Python coding challenges
- **Context Preservation**: Fantasy language wrapper around technical problems

### Character Development Pattern  
- **Algorithmic Specialization**: Three prologue paths establish different problem-solving approaches
- **Consequence System**: NPCs react realistically to player's growing mathematical abilities
- **Skill Progression**: Character advancement tied to algorithmic domain mastery

### Content Organization Pattern
- **Modular Chapters**: Self-contained story segments with embedded challenges
- **Cross-References**: Character arcs and design decisions maintained centrally
- **Version Control**: Modular structure enables focused editing and collaborative development

## Design Considerations

- Fixed achievement API endpoint to use existing getUnlockedAchievements method
- Restructured dashboard to separate story progress from analytics
- Implemented horizontal resizable bento grid for better space utilization
- Maintained consistent UI patterns while improving layout flexibility



- Fixed broken API endpoint by using correct getUserInventory method
- Implemented resizable sidebar for better space utilization
- Restored story progress as main dashboard content
- Added PvP arena back to game navigation
- Ensured proper API data fetching with error handling



- Eliminate information redundancy between dashboard and other pages
- Ensure each page serves a unique purpose with distinct value
- Implement proper API data fetching instead of static demos
- Maintain consistent UI/UX patterns across the application
- Focus dashboard on actionable information and quick access
- Profile page should be the definitive source for detailed character information



- Avoid information redundancy across pages
- Ensure each page has a distinct purpose and value proposition
- Implement proper data fetching patterns for user information
- Maintain consistent UI/UX patterns across the application



- Migration contains orphaned 'todo' table that's not in schema
- Missing composite indexes for performance optimization
- No soft delete strategy for critical game data
- Missing data validation constraints at database level
- No partitioning strategy for high-volume tables
- Missing audit trails for sensitive operations



- Better Auth cookies are automatically shared with proper CORS setup
- nextCookies() plugin enables seamless frontend-backend session sharing
- Session middleware automatically attaches user context to all backend routes



- Better Auth provides built-in security best practices
- Framework-agnostic design works well with Hono backend
- Type-safe authentication with excellent developer experience



- Security implications of client-side vs server-side auth
- Code maintainability and separation of concerns
- Performance and user experience impact
- Consistency with Hono backend architecture
- Token management and session handling



- Database scalability for growing user base
- Real-time updates for leaderboards and achievements
- Security for user data and progress tracking
- Performance optimization for complex queries
- Mobile-first API design for responsive experience



- Must balance world-building appeal with story preservation
- Clearance system needs intuitive layer naming convention
- Article-based content structure allows modular expansion
- Visual design must support both revealed and hidden information states



- Topic distribution must remain balanced across all 420 chapters to prevent learner fatigue
- Each chapter requires 3 problems (Easy/Medium/Hard) naturally integrated into story flow
- Mobile-first design essential for commute-based learning sessions
- Story pacing must sustain engagement across 1.5-2 years of content
- AI generation must maintain narrative coherence while covering technical curriculum
- Reality layer revelations must feel earned and meaningful, not arbitrary
- Multiple storylines must enhance rather than complicate the core educational experience



- Topic distribution must remain balanced across all 420 chapters to prevent learner fatigue
- Each chapter requires 3 problems (Easy/Medium/Hard) naturally integrated into story flow
- Mobile-first design essential for commute-based learning sessions
- Story pacing must sustain engagement across 1.5-2 years of content
- AI generation must maintain narrative coherence while covering technical curriculum



### Performance & Scalability
- Edge-first deployment for global low-latency access
- Efficient code splitting to minimize initial bundle size
- Database optimization for complex gaming relationship queries
- Caching strategies for frequently accessed story content

### Educational Effectiveness
- Challenge difficulty must feel naturally integrated, not artificially inserted
- Story consequences provide emotional context for algorithmic learning
- Progressive complexity supports learners from beginner to advanced levels
- Multiple specialization paths accommodate different learning styles

### User Experience
- Dark fantasy atmosphere maintained consistently across all interfaces
- RPG navigation patterns create unique differentiation from traditional coding platforms
- Immersive world-building supports sustained engagement over long learning curves
- Community features enable collaborative learning and competitive progression

## System Components

### Story Engine
- **Challenge Integration**: Embed LeetCode-style DSA problems within dark fantasy narrative
- **Character Development**: Manage NPC reactions based on player's algorithmic abilities
- **Story State Management**: Track narrative progress and choice consequences
- **Progressive Curriculum**: Structure learning path from basic to advanced algorithms

### Technical Infrastructure  
- **Frontend**: React-based UI with dark fantasy theming and floating orb navigation
- **Backend**: Lightweight API framework optimized for edge computing
- **Database**: Complex relational data for gaming and educational features
- **Assessment**: Real coding evaluation within narrative context





## Architectural Decisions

- Story Progress remains full-width for better quest card display
- Three analytics components use horizontal resizable panels in bento grid style
- Each resizable panel has minimum 25% width for usability
- Achievement data fetched using getUnlockedAchievements instead of non-existent getUserAchievements



- Use orpc.equipment.getUserInventory instead of non-existent getUserEquipment
- Implement Shadcn resizable component for dashboard sidebar
- Restore story progress as primary dashboard content
- Add PvP arena to navigation menu for competitive features
- Use proper null checking for GSAP animations to prevent errors



- Dashboard serves as central hub with unique real-time information not found elsewhere
- Removed quest details from dashboard (belongs in dedicated /quests page)
- Profile page now fetches real user data via orpc API endpoints
- Game menu streamlined to focus on core features (removed PvP, Quests, Upgrade)
- Added community navigation to game menu for better social features access
- Dashboard emphasizes quick actions and recent activity over detailed information



- Dashboard should serve as a central hub with unique information not duplicated elsewhere
- Game menu needs streamlining to focus on core gameplay features
- Profile page should display real user data instead of static demos



- Database schema follows a clear separation between auth and game domains
- Using Drizzle ORM with PostgreSQL for type safety and migrations
- Implemented comprehensive gamification system with character progression
- Foreign key relationships properly configured with cascade deletes



- Using Better Auth nextCookies() plugin for session sharing
- CORS configured with credentials: true for cookie transmission
- Session middleware automatically validates and attaches user context



- Using Better Auth for authentication - a frontend-first auth solution
- Better Auth handles security, token management, and session persistence
- Current frontend implementation is architecturally correct for Better Auth



- Evaluating authentication architecture: frontend vs backend auth logic placement
- Current implementation uses frontend authClient for sign-up and sign-in operations



- Implement comprehensive database schema for Aethel platform
- Create user profile system with classes, levels, and stats
- Build quest and achievement tracking
- Implement leaderboard and ranking systems
- Create equipment and inventory management
- Design community features and social interactions



- Progressive Information Architecture: Lore page serves as immersive world-building tool rather than story spoiler
- Clearance-Based Content System: Information access tied to user's story progression layer
- Dynamic Content Revelation: Each layer unlocks new lore articles while preserving narrative mystery
- Classified Information Design Pattern: Use visual obfuscation (blur, redaction) to hint at deeper mysteries



- 420 chapters with 3 problems each for comprehensive coverage
- Balanced topic distribution across all arcs rather than clustering by difficulty
- Mobile-optimized chapter length of 800-1000 words
- 80/20 fantasy/digital balance for immersive education
- 5 refined AI context files for story generation training
- Nested reality layers with multiple storylines integrated through revelation system
- Code Corruption as surface-layer storyline with deeper realities beneath



- 420 chapters with 3 problems each for comprehensive coverage
- Balanced topic distribution across all arcs rather than clustering by difficulty
- Mobile-optimized chapter length of 800-1000 words
- 80/20 fantasy/digital balance for immersive education
- 5 refined AI context files for story generation training



## Components

### Dashboard

Dashboard with full-width story progress and resizable bento grid

**Responsibilities:**

- Display story progress component full-width at the top
- Show resizable bento grid with three analytics components below
- Provide horizontal resizable panels for Progress Summary, Today's Session, and System Status
- Enable users to customize their dashboard layout with resizable panels

### Profile Page

Profile page with corrected API endpoints

**Responsibilities:**

- Use orpc.achievement.getUnlockedAchievements for user achievements
- Display real user inventory via orpc.equipment.getUserInventory
- Show user profile data from orpc.user.getProfile
- Provide comprehensive character information and statistics





### Dashboard

Dashboard with story progress and resizable sidebar

**Responsibilities:**

- Display story progress with quest details and progress bars
- Show progress summary in resizable sidebar
- Display today's session statistics
- Show real-time system status
- Provide main story-focused interface

### GameMenu

Game navigation with PvP arena support

**Responsibilities:**

- Navigate to Dashboard, Dungeons, PvP Arena, Leaderboard, Profile, Community
- Provide floating orb-style navigation interface
- Enable theme switching capabilities
- Support animated transitions with GSAP

### Profile Page

User profile with real API data integration

**Responsibilities:**

- Display real user profile data from API
- Show character statistics and progression
- Display user inventory from equipment API
- Show user achievements from achievement API
- Provide profile management and settings





### Dashboard

Central hub focused on real-time information, quick actions, and community updates

**Responsibilities:**

- Display personal progress summary (level, XP, streaks)
- Provide quick action buttons for common tasks
- Show recent activity feed
- Display community announcements and platform news
- Show active session statistics
- Real-time system status monitoring

### GameMenu

Streamlined navigation component focused on core gameplay features

**Responsibilities:**

- Navigate to main game sections (Dashboard, Dungeons, Leaderboard, Profile, Community)
- Exclude redundant features (removed Quests, PvP, Upgrade)
- Provide theme switching capabilities
- Display current user status indicators

### Profile Page

Comprehensive user profile displaying real user data

**Responsibilities:**

- Display actual user statistics from API
- Show character information (class, level, experience)
- Display equipment and achievements from database
- Provide profile management capabilities
- Show real user progress and statistics
- Enable account settings management





### Dashboard

Central hub showing real-time system status, recent activities, and quick access to important features

**Responsibilities:**

- Display real-time notifications and system status
- Show recent user activities and progress summary
- Provide quick actions for common tasks
- Display community highlights and announcements

### GameMenu

Navigation component for core game features

**Responsibilities:**

- Provide navigation to main game sections
- Display current user status indicators
- Offer quick access to community features

### Profile Page

Comprehensive user profile with real data

**Responsibilities:**

- Display actual user statistics and progress
- Show character information and achievements
- Provide profile management capabilities
- Display social connections and activity history





### Authentication Schema

Handles user authentication, sessions, and OAuth accounts

**Responsibilities:**

- User identity management
- Session lifecycle
- OAuth provider integration
- Email verification

### Game Schema

Complete gamification system for coding education platform

**Responsibilities:**

- Character progression and classes
- Quest and challenge management
- Achievement system
- Equipment and inventory
- Community events
- Analytics and statistics

### Database Layer

Drizzle ORM configuration and connection management

**Responsibilities:**

- Database connection pooling
- Schema management
- Migration execution
- Type-safe query building





### Cross-Domain Session Management

Cookie-based session sharing between Next.js frontend and Hono backend using Better Auth

**Responsibilities:**

- Secure cookie handling
- Session validation across services
- CORS configuration for credentials
- Automatic session attachment to requests





### Better Auth Integration

Frontend authentication using Better Auth library

**Responsibilities:**

- User registration and login
- Session token management
- Type-safe auth state
- Integration with backend validation





### Authentication Layer

Handles user authentication, session management, and security

**Responsibilities:**

- User registration and login
- Session token management
- Security validation
- Auth state persistence





### User Management System

Comprehensive user profiles with character progression, classes, and statistics

**Responsibilities:**

- User authentication and authorization
- Character class selection and progression
- Experience points and leveling system
- User preferences and settings

### Quest & Challenge System

Dynamic quest management with progress tracking and DSA problems integration

**Responsibilities:**

- Quest creation and management
- Progress tracking and validation
- Problem solving verification
- Reward distribution

### Social & Community Features

Leaderboards, rankings, and community interactions

**Responsibilities:**

- PvP rankings and class mastery leaderboards
- Achievement system
- Community events and announcements
- Social features and interactions

### Equipment & Inventory System

Character equipment, items, and rewards management

**Responsibilities:**

- Equipment assignment and stats
- Inventory management
- Item rewards and unlocks
- Character customization

### Analytics & Progress Tracking

Detailed analytics for learning progress and platform metrics

**Responsibilities:**

- Learning analytics and insights
- Performance tracking
- Usage statistics
- Progress visualization data





### Clearance-Gated Lore System

Progressive information revelation based on user's story layer

**Responsibilities:**

- Content filtering by clearance level
- Visual obfuscation of classified information
- Breadcrumb hints for next layer mysteries

### Article Database Structure

Modular lore articles with metadata for targeting

**Responsibilities:**

- Layer-specific content tagging
- Spoiler-safe content management
- Expandable full-page article views

### Progressive Disclosure UI

Interface that hints at hidden content without revealing it

**Responsibilities:**

- Classified text blur/redaction effects
- Clearance level badges and indicators
- Teaser content for locked articles





### AI Story Generation System

Uses 5 comprehensive context files to generate consistent narrative content

**Responsibilities:**

- Generate 420 chapters of story content
- Maintain character consistency across arcs
- Balance educational and narrative objectives
- Ensure topic distribution balance

### Problem Integration Engine

Seamlessly weaves DSA challenges into story context

**Responsibilities:**

- Map 1260+ problems to narrative moments
- Ensure natural problem emergence
- Balance difficulty progression
- Track topic distribution

### Chapter Management System

Delivers mobile-optimized reading experience

**Responsibilities:**

- Serve 800-1000 word chapters
- Track user progress
- Enable offline reading
- Provide resume functionality

### Progress Tracking System

Monitors educational advancement and engagement

**Responsibilities:**

- Track problem completion
- Monitor skill development
- Identify knowledge gaps
- Provide achievement feedback

### Reality Layer System

Manages revelation of nested reality layers as story progresses

**Responsibilities:**

- Control timing of reality revelations
- Maintain narrative coherence across layers
- Enable storyline expansion
- Track player understanding progression

### Multi-Storyline Integration Engine

Integrates multiple storylines through layered revelation mechanics

**Responsibilities:**

- Weave Code Corruption, Memory Architect, Pattern Wars storylines
- Ensure smooth transitions between reality layers
- Maintain character consistency across revelations
- Enable infinite platform expansion





### AI Story Generation System

Uses 5 comprehensive context files to generate consistent narrative content

**Responsibilities:**

- Generate 420 chapters of story content
- Maintain character consistency across arcs
- Balance educational and narrative objectives
- Ensure topic distribution balance

### Problem Integration Engine

Seamlessly weaves DSA challenges into story context

**Responsibilities:**

- Map 1260+ problems to narrative moments
- Ensure natural problem emergence
- Balance difficulty progression
- Track topic distribution

### Chapter Management System

Delivers mobile-optimized reading experience

**Responsibilities:**

- Serve 800-1000 word chapters
- Track user progress
- Enable offline reading
- Provide resume functionality

### Progress Tracking System

Monitors educational advancement and engagement

**Responsibilities:**

- Track problem completion
- Monitor skill development
- Identify knowledge gaps
- Provide achievement feedback



