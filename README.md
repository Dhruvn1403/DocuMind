# DocuMind 🧠

> **Stop Searching Docs. Start Talking to Them.**

DocuMind is a full-stack AI-powered documentation assistant. Pick a developer documentation source, ask questions naturally, and get instant context-aware answers with code snippets — no tab hopping, no keyword gymnastics.

---

## What It Does

Instead of manually scanning through documentation, DocuMind lets you have a conversation with it. Each chat is locked to a specific documentation source, ensuring focused and accurate answers. The AI streams responses in real time, complete with code examples and source references.

**Supported documentation sources:**
- Stripe
- LiveKit
- Firebase
- OpenAI
- Next.js

---

## Features

- **Multi-provider AI** — Choose between OpenAI, Anthropic (Claude), Groq, or Google Gemini as your AI backend
- **Real-time streaming** — Responses stream token-by-token via Server-Sent Events (SSE), rendered live with markdown and syntax-highlighted code blocks
- **Multimodal attachments** — Attach images, PDFs, audio, video, Word docs, spreadsheets, and more (up to 25MB per file), stored on AWS S3
- **Documentation scoping** — Each conversation is pinned to one documentation source; the AI stays on-topic or tells you to start a new chat
- **Authentication** — Sign up with email/mobile or Google OAuth; sessions managed with secure httpOnly cookies and JWT refresh token rotation
- **Conversation management** — Create, rename, search, and delete conversations from a persistent sidebar
- **Message feedback** — Thumbs up/down on individual AI responses
- **Scheduled reminders** — Built-in scheduling system for reminders and appointments

---

## Tech Stack

### Backend (`/server`)

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express.js v5 |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| AI SDK | Vercel AI SDK (`ai`) |
| AI Providers | OpenAI, Anthropic, Groq, Google |
| File Storage | AWS S3 |
| Authentication | JWT (access + refresh tokens) + Google OAuth |
| Streaming | Server-Sent Events (SSE) |
| Validation | Zod |
| Logging | Winston + MongoDB transport |
| Job Queues | BullMQ + Redis |
| Push Notifications | Firebase Admin |

### Frontend (`/client`)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (Turbopack) |
| Language | TypeScript |
| UI Components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit + Redux Persist |
| Data Fetching | TanStack React Query |
| Live Markdown | `streamdown` (streams markdown + code in real time) |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |

---

## Architecture

```
User Browser
    │
    ▼
Next.js Frontend        ← React, Redux, React Query, Tailwind
    │  REST API + SSE
    ▼
Express Backend         ← Node.js, TypeScript, Express v5
    ├── MongoDB         ← Users, Conversations, Messages, Schedules
    ├── AWS S3          ← File & media storage
    ├── AI SDK          ── OpenAI / Anthropic / Groq / Google
    └── Redis + BullMQ  ← Background job queues
```

---

## Project Structure

```
DocuMind/
├── client/                         # Next.js frontend
│   └── src/
│       ├── app/                    # Next.js app router pages
│       │   ├── page.tsx            # Landing page
│       │   ├── chat/               # New chat page
│       │   ├── c/[conversationId]/ # Existing conversation page
│       │   ├── sign-in/
│       │   └── sign-up/
│       ├── components/
│       │   ├── chat.tsx            # Main chat interface
│       │   ├── chat-input.tsx      # Message input + file upload
│       │   ├── app-sidebar.tsx     # Conversation list sidebar
│       │   ├── ai-elements/        # Message & attachment renderers
│       │   └── landing/            # Landing page sections
│       ├── hooks/
│       └── lib/                    # API clients, utilities, types
│
└── server/                         # Express backend
    └── src/
        ├── server.ts               # App entry point
        ├── controllers/
        │   ├── auth.controller.ts          # Sign up, sign in, Google OAuth
        │   ├── message.controller.ts       # AI streaming, message CRUD
        │   ├── conversations.controller.ts # Conversation CRUD
        │   ├── upload.controller.ts        # File upload to S3
        │   └── schedule.controller.ts      # Reminders & scheduling
        ├── models/
        │   ├── users.model.ts
        │   ├── accounts.model.ts
        │   ├── conversations.model.ts
        │   ├── message.model.ts
        │   └── scheduleItem.model.ts
        ├── routes/
        ├── middlewares/
        │   ├── authentication.middleware.ts
        │   ├── multer.middleware.ts
        │   └── error.middleware.ts
        ├── utils/
        │   ├── AiProvider.ts       # Resolves AI provider + model
        │   ├── DB.ts               # MongoDB connection
        │   └── ValidationSchema.ts # Zod schemas
        ├── functions/
        │   ├── upload.functions.ts # AWS S3 upload logic
        │   ├── token.functions.ts  # JWT generation + decoding
        │   ├── encrypt.functions.ts# bcrypt password hashing
        │   └── firebase.functions.ts
        └── constants/
            └── documentation.ts    # Supported doc slugs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Redis instance
- AWS S3 bucket
- API keys for at least one AI provider (OpenAI, Anthropic, Groq, or Google)

### 1. Clone the repository

```bash
git clone https://github.com/Dhruvn1403/DocuMind.git
cd DocuMind
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env.dev` file in the `server/` directory:

```env
PORT=8000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/documind

# Redis
REDIS_URL=redis://localhost:6379

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# AI Providers (add keys for whichever you want to support)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=gsk_...
GOOGLE_API_KEY=...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CLIENT_ID_ANDROID=...
GOOGLE_CLIENT_ID_WEB=...

NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## API Reference

All routes are prefixed with `/v1/api`.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/sign-up` | Register with email/mobile + password |
| POST | `/auth/sign-in` | Sign in with credentials or Google |
| POST | `/auth/sign-out` | Clear session cookies |
| GET | `/auth/google/callback` | Google OAuth callback |

### Conversations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/conversation` | List all conversations (paginated) |
| POST | `/conversation` | Create a new conversation |
| PUT | `/conversation/:id` | Rename or update a conversation |
| DELETE | `/conversation/:id` | Delete a conversation |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/messages` | Send a message (streams SSE response) |
| GET | `/messages/:conversationId` | Get all messages in a conversation |

### Uploads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload a file to S3 (returns URL + metadata) |

### Schedule

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/schedule/upcoming` | Get upcoming reminders/appointments |
| POST | `/schedule` | Create a schedule item |
| PUT | `/schedule/:id/complete` | Mark a schedule item as complete |

---

## How the AI Chat Works

1. User selects a documentation source (e.g., `stripe`) and sends a message
2. The backend fetches the full conversation history from MongoDB
3. A system prompt is prepended: *"You are an assistant specialized in Stripe documentation. Only answer questions related to Stripe documentation."*
4. The message history is sent to the chosen AI provider via the Vercel AI SDK
5. The response streams back token-by-token over SSE
6. The frontend renders each delta live using `streamdown` (supports markdown, code blocks, math, Mermaid diagrams)
7. Once streaming completes, both the user message and AI response are saved to MongoDB

### Multimodal support

When a user attaches a file, it is first uploaded to S3 via the `/upload` endpoint. The returned URL and MIME type are included in the message payload. The backend fetches the file bytes and passes them as image or file parts to the AI model. For Groq, if the selected model doesn't support vision, the backend automatically upgrades to a vision-capable model (`llama-4-scout-17b`).

---

## Building for Production

### Backend

```bash
cd server
npm run build       # Compiles TypeScript to dist/
npm run start:api   # Starts the compiled server
```

### Frontend

```bash
cd client
npm run build
npm run start
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

This project is open source. See [LICENSE](LICENSE) for details.

---

*Built for developers. Dark by default. Works with your stack.*
