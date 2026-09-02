<div align="center">

# 🌟 Muhurat AI (मुहूर्त AI)
### *Autonomous Calendar Intelligence & Vedic Time Optimization*

<p align="center">
  <img src="./muhurat-ai-logo.png" alt="Muhurat AI Logo" width="180" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(20,184,166,0.35);" />
</p>

**Muhurat AI** is a state-of-the-art autonomous calendar assistant inspired by the Vedic principle of *Muhurat* (finding the optimal, conflict-free, and auspicious moment for tasks and meetings). Built with **Google Gemini**, **Mastra AI Agent Framework**, **Descope Outbound Application Tokens**, **PostgreSQL**, and a modern **Next.js 16 + Tailwind CSS** frontend with a signature **"Midnight Glass"** and **"Frosted Pearl"** dual-theme design system.

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
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables Setup](#environment-variables-setup)
  - [Database Migrations](#database-migrations)
  - [Running the Services](#running-the-services)
- [🔌 Model Context Protocol (MCP)](#-model-context-protocol-mcp)
- [📡 API Reference](#-api-reference)
- [🎨 Design System](#-design-system)
- [🔒 Security & Outbound OAuth](#-security--outbound-oauth)
- [📄 License](#-license)

---

## ✨ Key Features

### 1. 🤖 Autonomous Conversational Calendar Agent
- **Natural Language Scheduling**: Book, reschedule, or cancel appointments via conversational requests (e.g. *"Set a 45-min strategy session tomorrow morning with alex@example.com"*).
- **Multi-Provider AI Fallback**: Dynamic engine supporting **Google Gemini (`gemini-3.6-flash`)**, **OpenRouter**, and **OpenAI**, with automated key detection and zero-downtime fallback.
- **Smart Agendas & Briefings**: Ask *"What's on today?"* or *"Summarize my week"* to get structured, contextual briefings with clickable Meet and Calendar links.

### 2. 🧠 Persistent Working Memory (Mastra Memory)
- Remembers user scheduling preferences (e.g., preferred meeting durations, working hours, frequent attendees, timezones) across conversations without needing to re-prompt.

### 3. 📅 Interactive Visual Google Calendar System
- **Dual-View & Split-View Mode**: Switch between **AI Chat**, **Visual Calendar**, or **⚡ Side-by-Side Split View** on desktop.
- **Multiple Visual Views**:
  - **Month View**: 7×5/6 interactive calendar grid with date navigation, event pills, and today indicator.
  - **Week Timeline View**: 7-day hourly grid (8 AM – 8 PM) displaying proportional meeting cards.
  - **Day Agenda View**: Granular timeline with attendee badges and action triggers.
- **Event Details Modal**: Glassmorphic popover displaying event description, location, attendee badges, direct **"Join Google Meet"** video button, and **"Reschedule with AI"** trigger.
- **Live Reactive Auto-Sync**: The visual calendar automatically updates the exact moment Muhurat AI finishes creating or rescheduling an event in chat.

### 4. ⚡ Instant Google Meet & Free/Busy Intelligence
- Automatically checks recipient and organizer calendar free/busy slots to prevent overlapping appointments.
- Generates instant Google Meet video conference links (`hangoutsMeet`) attached to calendar invites.

### 5. 🌓 Dual-Theme Glassmorphic UI System
- **🌙 Dark Mode (`Midnight Glass`)**: Deep midnight navy backdrop (`#0b101b`) with frosted translucent glass cards, luminous white/10% borders, and vibrant teal gradient accents.
- **☀️ Light Mode (`Frosted Pearl Glass`)**: Crisp pearlescent glass backdrop (`oklch(0.975 0.015 210)`), high-contrast slate typography, frosted cards, and emerald highlights.
- Zero-flicker theme toggle button with animated Sun ☀️ and Moon 🌙 transitions.

### 6. 🔌 Model Context Protocol (MCP) Server
- Exposes authenticated MCP endpoints (`POST /mcp`) enabling external IDEs (Antigravity IDE, Cursor, Claude Desktop) and external AI tools to use Muhurat AI tools.

---

## 🏗️ System Architecture

```mermaid
graph TD
  User([User Browser / Mobile]) <-->|Next.js 16 + Tailwind v4| Frontend[Frontend UI / Dashboard]
  Frontend <-->|Descope SDK Auth| DescopeAuth[Descope Identity Provider]
  Frontend <-->|SSE Streaming / REST API| Backend[Express.js Backend API]
  
  subgraph Backend Services
    Backend --> AgentService[Agent Service & Mastra Engine]
    Backend --> CalendarService[Calendar Service / Google API]
    Backend --> ConnectionService[Outbound Connection Service]
    Backend --> McpServer[MCP Mount Endpoint]
  end

  AgentService <-->|Gemini 3.6 Flash / OpenRouter| LLM[AI Model Provider]
  AgentService <-->|Thread History & Working Memory| Postgres[(PostgreSQL DB)]
  CalendarService <-->|Outbound Access Token| DescopeTokens[Descope Outbound Apps]
  DescopeTokens <-->|OAuth2 Token Exchange| GoogleCloud[Google Cloud Calendar API]
  GoogleCloud <-->|Calendar & Meet V3| GoogleCal[Google Calendar / Google Meet]
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons, `next-themes`, `@descope/nextjs-sdk` |
| **Backend** | Node.js, Express.js, TypeScript, `@mastra/core`, `@mastra/memory`, `@googleapis/calendar` |
| **AI / LLMs** | Google Gemini (`gemini-3.6-flash`), OpenRouter, OpenAI |
| **Auth & Integrations** | Descope (Passkeys, Social Login, Outbound OAuth Application Tokens) |
| **Database** | PostgreSQL 16+ (`pg` connection pool) |
| **Protocol** | Model Context Protocol (MCP), Server-Sent Events (SSE) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.x or v22.x LTS
- **PostgreSQL**: Local instance or hosted (Supabase, Neon, AWS RDS)
- **Google Cloud Console**: OAuth 2.0 Client Credentials with Google Calendar API enabled
- **Descope Account**: Project ID and Management Key

---

### Environment Variables Setup

#### 1. Backend (`backend/.env`)
```env
PORT=4000
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/calendar_agent

# AI Provider API Keys (at least one is required)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Descope Authentication & Outbound Application
DESCOPE_PROJECT_ID=your_descope_project_id
DESCOPE_MANAGEMENT_KEY=your_descope_management_key
DESCOPE_OUTBOUND_APP_ID=google-calendar
```

#### 2. Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

---

### Database Migrations

Run migrations from the `backend` folder to create the required tables (`users`, `connections`):

```bash
cd backend
npm install
npm run migrate
```

---

### Running the Services

#### Start Backend:
```bash
cd backend
npm run dev
# Server runs on http://localhost:4000
```

#### Start Frontend:
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

#### (Optional) Expose MCP Endpoint with Ngrok:
```bash
ngrok http 4000
```

---

## 🔌 Model Context Protocol (MCP)

Muhurat AI provides a dedicated **Model Context Protocol (MCP)** server for seamless integration with external coding tools and IDEs:

* **Endpoint**: `POST http://localhost:4000/mcp` (or your ngrok URL)
* **Available MCP Tools**:
  * `createMeeting`: Schedule a new meeting with Google Meet link.
  * `listUpcomingMeetings`: Retrieve upcoming calendar agenda.
  * `checkCalendarBusy`: Query busy periods and free slots.
  * `rescheduleMeeting`: Move an existing event to a new date/time.
  * `cancelMeeting`: Cancel and delete a calendar event.

---

## 📡 API Reference

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/agent/stream` | `POST` | Bearer Token | SSE stream for real-time AI reasoning, tool calls, and responses |
| `/api/agent/threads` | `GET` | Bearer Token | List all user conversation threads |
| `/api/agent/threads/:id` | `GET` | Bearer Token | Load chat history for a specific thread |
| `/api/calendar/events` | `GET` | Bearer Token | Retrieve Google Calendar events between `timeMin` and `timeMax` |
| `/api/connections` | `GET` | Bearer Token | Fetch current Google Calendar connection status (`connected` / `pending` / `disconnected`) |
| `/api/connections/connect` | `POST` | Bearer Token | Generate Descope OAuth authorization URL for Google Calendar |
| `/mcp` | `POST` | Session / API Key | Model Context Protocol standard endpoint |
| `/health` | `GET` | Public | Service health & database connectivity check |

---

## 🎨 Design System

Muhurat AI is crafted with an obsession for aesthetic excellence:

* **Frosted Glass Panels (`.glass-panel`)**: 24px backdrop blur, subtle inner specular highlights, and adaptive border opacity.
* **Interactive Hover Cards (`.glass-card`)**: Responsive scaling, gradient borders, and soft colored shadows.
* **60 FPS Micro-Animations**:
  * `float-gentle`: Soft floating emblem badge.
  * `orb-drift`: Ethereal background gradient orbs drifting smoothly in the background.
  * `pulse-dot`: Glowing emerald dot indicating live Google Calendar synchronization.

---

## 🔒 Security & Outbound OAuth

* **Stateless Tokens**: Auth tokens are validated via Descope JWT session verification middleware.
* **Encrypted Outbound Tokens**: Google OAuth refresh and access tokens are managed and rotated securely inside Descope's Outbound Application Vault, never exposed in client bundles.
* **Scoped Permissions**: Requests only access Google Calendar (`https://www.googleapis.com/auth/calendar`) strictly on behalf of the authenticated user.

---

## 📄 License
MIT License © 2026 **Muhurat AI**. Built with Google Gemini, Mastra AI, and Descope.
