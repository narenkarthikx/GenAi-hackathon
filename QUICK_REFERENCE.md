# 🚀 Quick Reference Guide - AI Skill Gap Radar

## 📚 Documentation Quick Links

| Document | Description | Use When |
|----------|-------------|----------|
| [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) | **Complete system explanation** - Tech stack, Google tools, ADK agents, full setup | Understanding the entire system |
| [VISUAL_DIAGRAMS.md](./VISUAL_DIAGRAMS.md) | **Visual flow diagrams** - User flows, API flows, database relationships | Need to visualize how things connect |
| [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) | **Setup instructions** - Step-by-step installation | Setting up for the first time |
| [docs/ADK_AGENTS_GUIDE.md](./docs/ADK_AGENTS_GUIDE.md) | **AI agents deep dive** - How each agent works | Working with AI features |
| [CODEBASE_ORGANIZATION.md](./CODEBASE_ORGANIZATION.md) | **Folder structure** - Where everything lives | Finding files or adding features |

---

## 🛠️ Tech Stack Summary

### Core Technologies
```
Frontend:   Next.js 15.1.0 + React 19 + TypeScript
Backend:    Next.js API Routes + Node.js
Database:   Supabase (PostgreSQL)
AI:         Google Gemini 2.5 Flash
Styling:    Tailwind CSS + Shadcn/ui
Charts:     Recharts
Auth:       Supabase Authentication
Package:    pnpm
```

---

## 🤖 ADK Agent System Summary

### 6 Specialized AI Agents

| Agent | Purpose | Example Query |
|-------|---------|---------------|
| **Content Generator** | Creates lessons | "Teach me quadratic equations" |
| **Gap Analyzer** | Finds knowledge gaps | "What am I missing?" |
| **Assessment Creator** | Generates tests | "Give me a practice exam" |
| **Motivator** | Encouragement | "I'm struggling with math" |
| **Personal Tutor** | 1-on-1 chat | "Explain step by step" |
| **General Assistant** | Platform help | "How do I check progress?" |

### How It Works
```
Student Query → Smart Router (Intent Detection)
              → Correct Agent → Gemini API → Response
```

---

## 🔑 Environment Variables

```env
# Supabase (Database + Auth)
NEXT_PUBLIC_SUPABASE_URL=https://wjstdbspsqmbbcgikxuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Google Gemini AI
GEMINI_API_KEY=AIzaSyA0NPkwfuUo0AcDSytvZe_b9BiV90QLmX8
```

---

## 📁 Key File Locations

### AI & Agents
```
lib/ai/
├── adk-agents.ts          ← All 6 agents + coordinator
├── ai-tutor.ts            ← Personal tutor logic
└── gap-detection.ts       ← Gap analysis algorithms
```

### API Endpoints
```
app/api/
├── adk-agent/route.ts     ← Main ADK endpoint
├── ai-tutor/route.ts      ← Chat tutor
├── generate-quiz/route.ts ← Quiz generation
└── generate-flashcards/route.ts
```

### UI Components
```
components/student/
├── adk-agent-interface.tsx    ← Agent UI
├── flashcard-viewer.tsx       ← Flashcards
└── adaptive-assessment.tsx    ← Quizzes
```

### Pages
```
app/
├── student/
│   ├── learn/          ← Main learning interface
│   ├── flashcards/     ← Flashcard practice
│   ├── adk-agents/     ← AI agent chat
│   └── progress/       ← Progress tracking
└── teacher/
    └── dashboard/      ← Teacher analytics
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Check TypeScript errors
npx tsc --noEmit
```

---

## 🌐 API Endpoints Quick Reference

### Student APIs
- `GET /api/student/dashboard` - Dashboard data
- `POST /api/generate-quiz` - Create quiz
- `POST /api/submit-quiz` - Submit answers
- `POST /api/generate-flashcards` - Generate cards
- `GET /api/student/gaps` - Get learning gaps

### ADK Agent APIs
- `POST /api/adk-agent` - Main agent coordinator
- `POST /api/ai-tutor` - Personal tutor chat

### Teacher APIs
- `GET /api/teacher/dashboard` - Class analytics
- `GET /api/teacher/students` - Student list

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `user_profiles` | Student/teacher info |
| `subjects` | Math, Science, etc. |
| `chapters` | Chapter data |
| `lessons` | Lesson content |
| `student_progress` | Completion tracking |
| `quiz_results` | Quiz scores |
| `learning_gaps` | Detected gaps |
| `flashcards` | Study cards |
| `agent_interactions` | Chat history |

---

## 🔍 Common Tasks

### Adding a New Agent
1. Create agent class in `lib/ai/adk-agents.ts`
2. Add to agent map in coordinator
3. Update UI in `components/student/adk-agent-interface.tsx`

### Adding a New Subject
1. Add to `lib/curriculum/class10-curriculum.ts`
2. Update database: `INSERT INTO subjects`
3. Add chapters and lessons

### Creating New API Endpoint
1. Create `app/api/[name]/route.ts`
2. Export `POST` or `GET` function
3. Use `NextRequest` and `NextResponse`

---

## 🐛 Troubleshooting

### Gemini API Errors
```typescript
// Error: Rate limit exceeded
Solution: Using gemini-2.5-flash (stable) instead of experimental

// Error: API key invalid
Solution: Check .env.local has GEMINI_API_KEY
```

### Supabase Errors
```typescript
// Error: RLS policy violation
Solution: Check Row Level Security policies in Supabase dashboard

// Error: Connection refused
Solution: Verify NEXT_PUBLIC_SUPABASE_URL and KEY
```

### Build Errors
```bash
# TypeScript errors
npx tsc --noEmit

# Import path errors
Check @ alias in tsconfig.json: "@/*" → "./*"
```

---

## 📊 System Metrics

```
Page Load:        < 2 seconds
API Response:     < 3 seconds
Gemini AI:        2-7 seconds
Database Query:   < 500ms
Concurrent Users: 1000+
```

---

## 🎓 Student Features Checklist

- ✅ Multi-subject learning (Math, Science, English, Social, Tamil)
- ✅ Interactive video lessons
- ✅ Adaptive quizzes with instant feedback
- ✅ AI-generated flashcards
- ✅ 6 AI agents for personalized help
- ✅ Automatic gap detection
- ✅ Progress tracking dashboard
- ✅ Board exam pattern questions
- ✅ Bilingual support (Tamil/English)

---

## 👨‍🏫 Teacher Features Checklist

- ✅ Real-time class analytics
- ✅ Subject-wise performance tracking (5 subjects)
- ✅ Monthly performance trends
- ✅ Gap distribution visualization
- ✅ At-risk student identification
- ✅ Individual student drill-down
- ✅ Comparative class analysis

---

## 🔐 Security Checklist

- ✅ Supabase Row Level Security (RLS) enabled
- ✅ API keys in environment variables
- ✅ JWT authentication for all routes
- ✅ HTTPS in production
- ✅ Input validation on all APIs
- ✅ SQL injection prevention (Supabase client)

---

## 🎯 Project Goals

**Mission**: Provide quality AI-powered education to Tamil Nadu government school students

**Vision**: Close learning gaps through adaptive AI tutoring

**Target**: Classes 7 & 10 students (expandable to 1-12)

**Impact**: Personalized learning at scale

---

## 📞 Support & Resources

- **Documentation**: See all `.md` files in root and `/docs`
- **Code Organization**: [CODEBASE_ORGANIZATION.md](./CODEBASE_ORGANIZATION.md)
- **Visual Diagrams**: [VISUAL_DIAGRAMS.md](./VISUAL_DIAGRAMS.md)
- **Full Architecture**: [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)

---

**Built with ❤️ for Tamil Nadu students**
