<div align="center">

# 🌟 Muhurat AI (मुहूर्त AI)
### *Autonomous Calendar Intelligence & Vedic Time Optimization*

<p align="center">
  <img src="./muhurat-ai-logo.png" alt="Muhurat AI Logo" width="180" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(20,184,166,0.35);" />
</p>

**Muhurat AI** is a state-of-the-art autonomous calendar assistant inspired by the Vedic principle of *Muhurat* (finding the optimal, conflict-free, and auspicious moment for tasks and meetings). Built with **Google Gemini**, **Mastra AI Agent Framework**, **Descope Outbound Application Tokens**, **PostgreSQL**, and a modern **Next.js 16 + Tailwind CSS** frontend featuring a signature **"Midnight Glass"** and **"Frosted Pearl"** dual-theme design system.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.6_Flash-4285F4?style=flat&logo=google)](https://deepmind.google/technologies/gemini/)
[![Mastra AI](https://img.shields.io/badge/Mastra_AI-Agent_Memory-7928CA?style=flat)](https://mastra.ai)
[![Descope](https://img.shields.io/badge/Descope-Auth_&_Outbound_Apps-FF6B6B?style=flat)](https://descope.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)

---

</div>

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture (High-Level Design)](#️-system-architecture-high-level-design)
- [🧩 Low-Level Design (LLD) & Data Modeling](#-low-level-design-lld--data-modeling)
- [🔄 Complete End-to-End Application Workflows](#-complete-end-to-end-application-workflows)
  - [1. User Authentication & Outbound OAuth Vaulting](#1-user-authentication--outbound-oauth-vaulting)
  - [2. Conversational Prompt to Calendar Mutation Lifecycle](#2-conversational-prompt-to-calendar-mutation-lifecycle)
  - [3. Conflict Detection & Smart Slot Suggestion](#3-conflict-detection--smart-slot-suggestion)
  - [4. Bidirectional Reactive Visual Calendar Synchronization](#4-bidirectional-reactive-visual-calendar-synchronization)
  - [5. Model Context Protocol (MCP) Tool Execution](#5-model-context-protocol-mcp-tool-execution)
- [🎨 Design System & UI Architecture](#-design-system--ui-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📡 API & MCP Reference](#-api--mcp-reference)
- [🔒 Security & Outbound OAuth Vault](#-security--outbound-oauth-vault)
- [📄 License](#-license)

---

## ✨ Key Features

### 1. 🤖 Autonomous Conversational Calendar Agent
- **Natural Language Scheduling**: Book, reschedule, or cancel appointments via natural conversation (e.g. *"Schedule a 45-min sync with team tomorrow at 11 AM"*).
- **Multi-Provider AI Fallback**: Dynamic engine supporting **Google Gemini (`gemini-3.6-flash`)**, **OpenRouter**, and **OpenAI**, with automated key detection and zero-downtime fallback.
- **Smart Agendas & Briefings**: Ask *"What's on today?"* or *"Summarize my week"* for structured briefings with instant Google Meet and Calendar links.

### 2. 🧠 Persistent Working Memory (Mastra Memory)
- Remembers user scheduling habits, preferred meeting durations, working hours, and favorite collaborators across conversations without re-prompting.

### 3. 📅 Interactive Visual Google Calendar System
- **Dual-View & Split-View Mode**: Switch seamlessly between **AI Chat**, **Visual Calendar**, or **⚡ Side-by-Side Split View** on desktop.
- **Multiple Views**: Interactive **Month Grid (7×6)**, **Week Timeline (8 AM – 8 PM)**, and **Day Agenda**.
- **Event Popover Modal**: Displays descriptions, attendee chips, direct **"Join Google Meet"** video buttons, and **"Reschedule with AI"** triggers.
- **Reactive Auto-Sync**: The visual calendar automatically refreshes the moment Muhurat AI completes an action in chat.

### 4. ⚡ Instant Google Meet & Free/Busy Intelligence
- Queries Google Calendar Free/Busy matrices (`calendar.freebusy.query`) to eliminate double bookings.
- Automatically generates real-time Google Meet conference rooms (`hangoutsMeet`) attached to calendar invites.

### 5. 🌓 Dual-Theme Glassmorphic UI System
- **🌙 Midnight Glass (Dark Mode)**: Deep navy backdrop (`#0b101b`) with 24px frosted glass, luminous borders, and radiant teal accents.
- **☀️ Frosted Pearl (Light Mode)**: Pearlescent glass (`oklch(0.975 0.015 210)`), high-contrast slate typography, and emerald highlights.
- Hardware-accelerated transitions with animated Sun ☀️ and Moon 🌙 toggles.

### 6. 🔌 Model Context Protocol (MCP) Server
- Exposes authenticated MCP endpoints (`POST /mcp`) enabling external IDEs (Antigravity IDE, Cursor, Claude Desktop) to invoke calendar tools directly inside developer workflows.

---

## 🏗️ System Architecture (High-Level Design)

Muhurat AI is built on a decoupled, event-driven micro-layer architecture:

```mermaid
graph TD
  User([User Browser / Mobile / IDE]) <-->|Next.js 16 + Tailwind v4| Frontend[Frontend UI / Dashboard]
  Frontend <-->|Descope SDK Auth| DescopeAuth[Descope Identity Provider]
  Frontend <-->|SSE Streaming / REST API| Backend[Express.js Backend API]
  
  subgraph Backend Services
    Backend --> AgentService[Agent Service & Mastra Engine]
    Backend --> CalendarService[Calendar Service / Google API]
    Backend --> ConnectionService[Outbound Connection Service]
    Backend --> McpServer[MCP Mount Endpoint]
  end

  AgentService <-->|Gemini 3.6 Flash / Fallback| LLM[AI Model Provider]
  AgentService <-->|Thread History & Working Memory| Postgres[(PostgreSQL DB on Neon Cloud)]
  CalendarService <-->|Outbound Access Token| DescopeTokens[Descope Outbound Apps Vault]
  DescopeTokens <-->|OAuth2 Token Exchange| GoogleCloud[Google Cloud Calendar API v3]
  GoogleCloud <-->|Calendar & Meet Metadata| GoogleCal[Google Calendar / Google Meet]
```

### Architectural Highlights:
1. **Client Layer**: Next.js 16 App Router using React 19 server/client boundaries, Tailwind CSS v4, Lucide icons, and `@descope/nextjs-sdk`.
2. **Identity & Token Vault**: Descope manages user authentication (Passkeys/OAuth) while vaulting third-party Google OAuth access/refresh tokens.
3. **Backend Orchestrator**: Express.js server providing Server-Sent Events (SSE) streaming, JWT verification middleware, database pooling, and MCP tools.
4. **Agent Core**: Mastra AI orchestrates Google Gemini 3.6 Flash with dynamic JSON schema function calling and working memory sync.
5. **Database Layer**: Hosted PostgreSQL (Neon.tech / Supabase) storing user profiles, thread histories, and connection statuses.

---

## 🧩 Low-Level Design (LLD) & Data Modeling

### 1. Database Schema (PostgreSQL)

```sql
-- 1. Users Table
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id TEXT UNIQUE NOT NULL,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Connections Table (OAuth state tracking)
CREATE TABLE IF NOT EXISTS connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'connected',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, provider)
);
```

---

### 2. Agent Tool Schemas (Zod)

All tools are strictly typed with Zod schemas to ensure deterministic execution by the LLM:

* **`createMeetingTool`**:
  ```ts
  z.object({
    title: z.string().describe("Title of the meeting"),
    startTime: z.string().describe("ISO 8601 start timestamp"),
    endTime: z.string().describe("ISO 8601 end timestamp"),
    attendees: z.array(z.string().email()).optional(),
    description: z.string().optional(),
  })
  ```
* **`checkCalendarBusyTool`**:
  ```ts
  z.object({
    timeMin: z.string().describe("ISO 8601 start timestamp"),
    timeMax: z.string().describe("ISO 8601 end timestamp"),
  })
  ```
* **`listUpcomingMeetingsTool`**:
  ```ts
  z.object({
    maxResults: z.number().default(10),
    timeMin: z.string().optional(),
    timeMax: z.string().optional(),
  })
  ```
* **`rescheduleMeetingTool`**:
  ```ts
  z.object({
    eventId: z.string(),
    newStartTime: z.string(),
    newEndTime: z.string(),
  })
  ```
* **`cancelMeetingTool`**:
  ```ts
  z.object({
    eventId: z.string(),
  })
  ```

---

## 🔄 Complete End-to-End Application Workflows

### 1. User Authentication & Outbound OAuth Vaulting

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant Frontend as Next.js Frontend
  participant Descope as Descope Auth
  participant Backend as Express Backend
  participant Vault as Descope Outbound Vault
  participant Google as Google OAuth2

  User->>Frontend: Click "Sign In"
  Frontend->>Descope: Authenticate (Passkey / Google)
  Descope-->>Frontend: Returns signed JWT Session Token
  User->>Frontend: Click "Connect Google Calendar"
  Frontend->>Backend: POST /api/connections/connect
  Backend->>Vault: Generate Outbound App OAuth URL
  Vault-->>Backend: Returns Google Consent URL
  Backend-->>Frontend: Redirect User to Google Consent
  User->>Google: Grants https://www.googleapis.com/auth/calendar
  Google-->>Vault: Exchanges Code for Access & Refresh Tokens
  Vault->>Vault: Stores Tokens Encrypted (AES-256)
  Vault-->>Frontend: Redirects back to /dashboard
  Frontend->>Backend: GET /api/connections
  Backend-->>Frontend: status: "connected" (Green Pulsing Dot)
```

---

### 2. Conversational Prompt to Calendar Mutation Lifecycle

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant Chat as Chat UI
  participant SSE as SSE Stream Router
  participant Agent as Mastra / Gemini Agent
  participant Memory as Mastra Working Memory
  participant Google as Google Calendar API
  participant CalUI as Visual Calendar UI

  User->>Chat: "Schedule 30-min strategy call with alex@corp.com tomorrow at 11am"
  Chat->>SSE: POST /api/agent/stream (with Bearer Token & Prompt)
  SSE-->>Chat: event: started {"threadId": "uuid"}
  SSE->>Memory: Load User Constraints & Preferences
  Memory-->>Agent: User profile (Timezone: IST, Duration: 30m)
  Agent->>Agent: Temporal grounding (Resolves "tomorrow 11am" to ISO 8601)
  SSE-->>Chat: event: progress "Checking calendar availability..."
  Agent->>Google: Execute checkCalendarBusyTool
  Google-->>Agent: Returns 0 conflicts (11:00 AM - 11:30 AM is Free)
  SSE-->>Chat: event: progress "Creating meeting with Google Meet link..."
  Agent->>Google: Execute createMeetingTool (with conferenceDataVersion: 1)
  Google-->>Agent: Event created (ID: evt_123, Meet: meet.google.com/xyz)
  Agent->>Memory: Save meeting context to thread history
  SSE-->>Chat: event: token (Streaming markdown response with Meet link)
  SSE-->>Chat: event: completed
  Chat->>CalUI: Triggers calendarRefreshTrigger increment
  CalUI->>Google: GET /api/calendar/events
  CalUI-->>User: Visual Month/Week Grid instantly updates with new meeting card!
```

---

### 3. Conflict Detection & Smart Slot Suggestion

```mermaid
flowchart TD
  Start([User requests meeting at Time T]) --> Parse[Agent parses requested time range]
  Parse --> CheckFreeBusy[Call checkCalendarBusyTool via Google API]
  CheckFreeBusy --> IsSlotBusy{Is slot occupied?}
  IsSlotBusy -- No --> Book[Call createMeetingTool & attach Google Meet]
  Book --> Success([Confirm meeting & stream response])
  IsSlotBusy -- Yes --> FindAlt[Scan surrounding calendar window for free slots]
  FindAlt --> Propose([Agent proposes 2-3 optimal alternative time slots])
```

---

### 4. Bidirectional Reactive Visual Calendar Synchronization

The Visual Calendar and AI Chat operate in complete bidirectional synergy:
1. **Chat-to-Calendar Sync**: Any agent scheduling action automatically triggers a state change (`calendarRefreshTrigger`) that tells `<CalendarView />` to silently re-fetch live Google Calendar data and re-render event pills with Google Meet badges.
2. **Calendar-to-Chat Triggers**: Clicking **"Reschedule with AI"** on any calendar event popover automatically formats and dispatches the prompt to Muhurat AI to handle the modification conversationally.

---

### 5. Model Context Protocol (MCP) Tool Execution

External developer environments (e.g. Antigravity IDE, Cursor, Claude Desktop) connect to Muhurat AI's MCP endpoint:

```text
External IDE / AI Model ──[MCP POST /mcp]──> Express Server ──> Descope Token Vault ──> Google Calendar API
```

---

## 🎨 Design System & UI Architecture

Muhurat AI utilizes a custom **Glassmorphic Design Token System** built on **OKLCH Color Spaces**:

| Design Token | Dark Mode (`Midnight Glass`) | Light Mode (`Frosted Pearl`) |
|---|---|---|
| **Backdrop** | Deep midnight navy (`#0b101b`) | Soft pearlescent glass (`oklch(0.975 0.015 210)`) |
| **Glass Panel** | `rgba(15, 23, 42, 0.75)` + 24px blur | `rgba(255, 255, 255, 0.75)` + 24px blur |
| **Borders** | `rgba(255, 255, 255, 0.10)` | `rgba(0, 0, 0, 0.08)` |
| **Primary Accent**| Electric Cyan / Luminous Teal (`oklch(0.72 0.16 185)`) | Vivid Emerald Teal (`oklch(0.5 0.16 195)`) |
| **Scrollbars** | 6px glowing translucent teal thumb | 6px sleek slate-teal thumb |

### Micro-Animations:
* `.float-gentle`: Soft floating animation on the 3D celestial emblem logo.
* `.pulse-dot`: Live glowing emerald indicator showing active Google Calendar synchronization.
* `.slide-up-enter`: 60fps cubic-bezier entry animation for streaming chat bubbles.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons, `next-themes`, `@descope/nextjs-sdk` |
| **Backend** | Node.js, Express.js, TypeScript, `@mastra/core`, `@mastra/memory`, `@googleapis/calendar` |
| **AI / LLMs** | Google Gemini (`gemini-3.6-flash`), OpenRouter, OpenAI Fallback |
| **Auth & Vault** | Descope (Passkeys, Social Login, Outbound OAuth Application Token Vault) |
| **Database** | PostgreSQL 16+ on Neon Cloud / Supabase (`pg` connection pool) |
| **Protocol** | Model Context Protocol (MCP), Server-Sent Events (SSE) |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v20.x or v22.x LTS
* **PostgreSQL**: Local instance or hosted on [Neon.tech](https://neon.tech) / Supabase
* **Google Cloud Console**: OAuth 2.0 Client Credentials with Google Calendar API enabled
* **Descope Account**: Project ID and Management Key

---

### Environment Variables Setup

#### Backend (`backend/.env`)
```env
PORT=4000
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://neondb_owner:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# AI Provider API Keys (at least one is required)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Descope Authentication & Outbound Application
DESCOPE_PROJECT_ID=your_descope_project_id
DESCOPE_MANAGEMENT_KEY=your_descope_management_key
DESCOPE_OUTBOUND_APP_ID=google-calendar
```

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Running the Project Locally

```bash
# 1. Start Backend
cd backend
npm install
npm run migrate
npm run dev

# 2. Start Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

---

## 📡 API & MCP Reference

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/agent/stream` | `POST` | Bearer Token | SSE stream for real-time AI reasoning, tool calls, and responses |
| `/api/agent/threads` | `GET` | Bearer Token | List all user conversation threads |
| `/api/agent/threads/:id` | `GET` | Bearer Token | Load chat history for a specific thread |
| `/api/calendar/events` | `GET` | Bearer Token | Retrieve Google Calendar events between `timeMin` and `timeMax` |
| `/api/connections` | `GET` | Bearer Token | Fetch current Google Calendar connection status (`connected` / `pending` / `disconnected`) |
| `/api/connections/connect` | `POST` | Bearer Token | Generate Descope OAuth authorization URL for Google Calendar |
| `/mcp` | `POST` | Session / API Key | Model Context Protocol standard endpoint for IDEs |
| `/health` | `GET` | Public | Service health & database connectivity check |

---

## 🔒 Security & Outbound OAuth Vault

* **Stateless Tokens**: Auth tokens are validated via Descope JWT session verification middleware.
* **Encrypted Outbound Tokens**: Google OAuth refresh and access tokens are managed and rotated securely inside Descope's Outbound Application Vault, never stored in plaintext or exposed to client bundles.
* **Scoped Permissions**: Requests only access Google Calendar (`https://www.googleapis.com/auth/calendar`) strictly on behalf of the authenticated user in compliance with Google API Limited Use policy.

---

## 📄 License
MIT License © 2026 **Muhurat AI**. Built with Google Gemini, Mastra AI, and Descope.
