# Edvion - Learning with Vision:Personalized AI Tutoring System

An intelligent tutoring platform for Tamil Nadu State Board students, featuring multi-agent AI system, adaptive learning, automatic gap detection, and comprehensive curriculum coverage.

## Key Features

### For Students
- **6 Specialized AI Agents**: Content Generator, Gap Analyzer, Assessment, Motivator, AI Tutor, General Assistant
- **Adaptive Learning**: System adapts to each student's pace and knowledge level
- **Interactive Flashcards**: Grade-specific flashcards for all subjects
- **Multi-subject Coverage**: Mathematics, Science, English, Social Science, Tamil
- **Automatic Gap Detection**: Identifies specific learning gaps with AI-powered analysis
- **Progress Tracking**: Visual dashboard showing improvement across all subjects
- **Multilingual Support**: Learn in Tamil, English, or Hindi
- **AI Chat Tutor**: 24/7 AI-powered tutoring with conversation memory

### For Teachers
- **Subject-based Analytics**: Track performance in Mathematics, Science, English, Social, Tamil
- **Student Progress Monitoring**: Detailed reports for each student across all subjects
- **Performance Trends**: Monthly performance charts showing subject-wise improvement
- **At-Risk Identification**: Early alerts for struggling students with subject breakdown
- **Gap Distribution**: Visualize learning gaps across subjects with pie charts
- **Class Management**: Monitor overall class health and individual student progress

## 📖 Documentation

### 🎯 Quick Start
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick links, commands, and common tasks
- **[docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)** - Step-by-step setup instructions

### 📚 Architecture & Design
- **[SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)** - Complete system overview, tech stack, Google tools
- **[VISUAL_DIAGRAMS.md](./VISUAL_DIAGRAMS.md)** - Flow diagrams, architecture visuals, database relationships

### 🤖 Feature Guides
- **[docs/ADK_AGENTS_GUIDE.md](./docs/ADK_AGENTS_GUIDE.md)** - Deep dive into AI agent system
- **[docs/FLASHCARDS_GUIDE.md](./docs/FLASHCARDS_GUIDE.md)** - Flashcard implementation details
- **[docs/CLASS10_CURRICULUM_GUIDE.md](./docs/CLASS10_CURRICULUM_GUIDE.md)** - Tamil Nadu Class 10 curriculum reference

## Quick Start

See [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) for complete setup instructions.

### TL;DR
\`\`\`bash
# 1. Install dependencies
npm install && npm install @supabase/ssr

# 2. Create .env.local with Supabase credentials
echo "NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000" > .env.local

# 3. Run SQL setup from scripts/setup-database.sql in Supabase

# 4. Start development
npm run dev

# 5. Open http://localhost:3000
\`\`\`

## Technology Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.5-flash (6 specialized agents with coordinator)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: Shadcn UI
- **Charts**: Recharts
- **Package Manager**: pnpm

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── api/
│   │   ├── adk-agent/          # AI agent API endpoints
│   │   ├── ai-tutor/           # AI tutor chat API
│   │   ├── generate-assessment/# Assessment generation
│   │   └── generate-flashcards/# Flashcard generation
│   ├── auth/
│   │   ├── login/              # Authentication
│   │   └── register/           # User registration
│   ├── student/
│   │   ├── learn/              # Learning interface
│   │   ├── flashcards/         # Interactive flashcards
│   │   ├── adk-agents/         # AI agents interface
│   │   ├── assessment/         # Adaptive assessments
│   │   ├── progress/           # Progress tracking
│   │   └── syllabus/           # Curriculum viewer
│   └── teacher/
│       ├── dashboard/          # Subject-based analytics
│       └── students/           # Student management
├── lib/
│   ├── ai/                     # AI & ML functionality
│   │   ├── adk-agents.ts       # 6 AI agents + coordinator
│   │   ├── ai-tutor.ts         # Tutoring logic
│   │   └── gap-detection.ts   # Gap detection algorithms
│   ├── curriculum/             # Educational content
│   │   ├── class10-curriculum.ts    # TN Class 10 data
│   │   └── flashcards-curriculum.ts # Flashcard content
│   ├── utils/                  # Utilities
│   │   ├── i18n/               # Internationalization\n│   │   │   ├── i18n.ts         # i18n configuration\n│   │   │   └── locales/        # Translation JSON files
│   ├── supabase/               # Database utilities
│   ├── supabase.ts             # Supabase client
│   └── utils.ts                # Helper functions
├── components/
│   ├── student/                # Student components
│   │   ├── adk-agent-interface.tsx    # AI agent UI
│   │   ├── adk-agent-showcase.tsx     # Agent showcase
│   │   ├── flashcard-viewer.tsx       # Flashcard display
│   │   ├── ai-chat-tutor.tsx          # Chat interface
│   │   └── adaptive-assessment.tsx    # Assessment UI
│   └── ui/                     # Shadcn UI components
├── docs/                       # Documentation
│   ├── ADK_AGENTS_GUIDE.md     # AI agents documentation
│   ├── FLASHCARDS_GUIDE.md     # Flashcards guide
│   ├── SETUP_GUIDE.md          # Setup instructions
│   └── README.md               # Documentation index
└── scripts/
    └── setup-database.sql      # Database schema
\`\`\`

## Supported Features

- **Grades**: Class 7 & Class 10 (Tamil Nadu State Board)
- **Languages**: Tamil, English, Hindi
- **Subjects**: Mathematics, Science, English, Social Science, Tamil
- **AI Agents**: 6 specialized agents for different learning needs
- **Flashcards**: Interactive, grade-specific flashcards for all subjects
- **Assessments**: Adaptive testing with automatic gap detection
- **Progress Tracking**: Subject-wise performance monitoring
- **Teacher Analytics**: Comprehensive class and student insights
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Full dark mode support
- **Security**: Row-Level Security (RLS) for data protection

## Demo Accounts

After setup, create your own accounts through the registration flow. The system supports:
- Student role with grade and language selection
- Teacher role for monitoring classes
- Role-based dashboards and features

## Database Schema

The system uses Supabase with 8 core tables:
- `student_profiles` - Student personal data
- `teacher_profiles` - Teacher information
- `teacher_classes` - Class management
- `class_enrollments` - Student-class relationships
- `assessments` - Test results and scores
- `learning_gaps` - Identified learning deficiencies
- `lessons` - Course content
- `progress_tracking` - Lesson completion and scores

All data is protected with Row-Level Security (RLS) policies.

## Performance Optimization

- Database indexing on frequently queried fields
- Optimized React components with lazy loading
- Efficient state management with hooks
- API route caching strategies
- Mobile-responsive CSS for reduced rendering

## Security

- Supabase authentication for secure login
- Row-Level Security (RLS) policies for data access control
- Encrypted passwords and secure sessions
- Role-based access control
- Input validation and error handling

## 📁 Project Structure

```
edvion/
├── app/                        # Next.js app directory
│   ├── api/                   # API routes (AI tutor, assessments, agents)
│   ├── auth/                  # Authentication pages
│   ├── student/               # Student dashboard & features
│   └── teacher/               # Teacher dashboard & analytics
├── components/                 # React components
│   ├── student/               # Student-specific components
│   └── ui/                    # Shadcn UI components
├── lib/                       # Core business logic
│   ├── ai/                    # AI agents & tutoring logic
│   ├── curriculum/            # Curriculum data & flashcards
│   ├── supabase/              # Database utilities
│   └── utils/                 # Helper functions & i18n
├── docs/                      # Documentation
└── public/                    # Static assets
```

## Future Enhancements

- **Voice-based Learning**: Speech-to-text for voice interactions
- **Handwriting Recognition**: OCR for handwritten answers
- **Offline Mode**: IndexedDB for offline learning
- **Parent Portal**: WhatsApp/SMS notifications and progress reports
- **Advanced Analytics**: Predictive models and learning path optimization
- **More Grades**: Expand to all classes (1-12)
- **Video Lessons**: AI-generated video explanations
- **Peer Learning**: Student collaboration features

## 📞 Support

For setup issues, check the [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) troubleshooting section or refer to the documentation links above.

---

**Built with ❤️ for Tamil Nadu students**

## License

Built for equitable education in government schools. Open source for educational purposes.
