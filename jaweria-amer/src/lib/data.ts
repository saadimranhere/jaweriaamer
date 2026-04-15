import { contact } from "./contact";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: "o-level" | "a-level" | "literature" | "creative-writing";
  categoryLabel: string;
  price: string;
  duration: string;
  schedule: string;
  description: string;
  featured: boolean;
  syllabus: string[];
  curriculum: {
    title: string;
    topics: string[];
  }[];
  outcomes: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "past-paper" | "marking-scheme" | "examiner-report" | "checklist";
  typeLabel: string;
  subject: string;
  year: string;
  downloadLabel: string;
}

export const courses: Course[] = [
  {
    id: "o-level-english-1123",
    title: "O Level English Language",
    subtitle: "CAIE 1123 - Complete Preparation",
    category: "o-level",
    categoryLabel: "O Level",
    price: "PKR 25,000",
    duration: "4 Months",
    schedule: "3 sessions/week",
    description:
      "A structured, rubric-driven programme for Cambridge O Level English Language (1123). We build repeatable exam thinking through targeted practice on directed writing, composition, and comprehension.",
    featured: true,
    syllabus: [
      "Paper 1: Directed Writing & Composition",
      "Paper 2: Comprehension & Summary",
      "Examiner-aligned marking practice",
      "Timed mock examinations",
    ],
    curriculum: [
      {
        title: "Foundation: Reading & Analysis",
        topics: [
          "Comprehension strategies for unseen passages",
          "Inference and implication techniques",
          "Summary writing: precision under word limits",
          "Vocabulary building through context",
        ],
      },
      {
        title: "Directed Writing Mastery",
        topics: [
          "Understanding task requirements and audience",
          "Letter, report, speech, and article formats",
          "Tone adaptation and register control",
          "Examiner expectation alignment",
        ],
      },
      {
        title: "Composition & Creative Expression",
        topics: [
          "Narrative structure and pacing",
          "Descriptive writing: sensory detail and control",
          "Argumentative essay construction",
          "Discursive writing with balanced perspective",
        ],
      },
      {
        title: "Exam Strategy & Timed Practice",
        topics: [
          "Time allocation per question",
          "Common deduction patterns and how to avoid them",
          "Full paper mock under exam conditions",
          "Personalised feedback and improvement plans",
        ],
      },
    ],
    outcomes: [
      "Write with clarity and structure under timed conditions",
      "Identify and apply examiner marking criteria",
      "Produce directed writing that hits every assessment objective",
      "Develop a repeatable approach to comprehension and summary",
      "Build confidence through consistent, measurable progress",
    ],
  },
  {
    id: "a-level-english-9093",
    title: "AS/A Level English Language",
    subtitle: "CAIE 9093 - Advanced Programme",
    category: "a-level",
    categoryLabel: "A Level",
    price: "PKR 35,000",
    duration: "6 Months",
    schedule: "3 sessions/week",
    description:
      "An advanced programme for AS and A Level English Language (9093). We develop sophisticated analytical writing, commentary skills, and language awareness required for top-band performance.",
    featured: true,
    syllabus: [
      "Paper 1: Reading (Passages & Commentary)",
      "Paper 2: Writing (Directed & Composition)",
      "Paper 3: Text Analysis (A2)",
      "Paper 4: Language Topics (A2)",
    ],
    curriculum: [
      {
        title: "Textual Analysis & Commentary",
        topics: [
          "Linguistic framework for text analysis",
          "Audience, purpose, and context identification",
          "Stylistic feature recognition and effect analysis",
          "Commentary writing: structure and depth",
        ],
      },
      {
        title: "Advanced Directed Writing",
        topics: [
          "Complex audience adaptation",
          "Persuasive and rhetorical technique mastery",
          "Voice, register, and genre conventions",
          "Synthesis of source material into original writing",
        ],
      },
      {
        title: "Language in Context (A2)",
        topics: [
          "English as a global language: debates and perspectives",
          "Language and the self: identity and representation",
          "Language change: historical and contemporary",
          "Child language acquisition theories",
        ],
      },
      {
        title: "Examination Technique",
        topics: [
          "Band descriptor analysis for each paper",
          "Planning under pressure: structured approaches",
          "Full mock examinations with examiner-style feedback",
          "Targeted improvement based on diagnostic review",
        ],
      },
    ],
    outcomes: [
      "Analyse texts with precision using linguistic frameworks",
      "Write directed responses that demonstrate genre mastery",
      "Construct well-evidenced arguments on language topics",
      "Navigate A2 papers with confidence and critical depth",
      "Achieve top-band marks through deliberate, rubric-aligned practice",
    ],
  },
  {
    id: "english-literature",
    title: "English Literature",
    subtitle: "Poetry, Prose & Drama",
    category: "literature",
    categoryLabel: "Literature",
    price: "PKR 30,000",
    duration: "5 Months",
    schedule: "2 sessions/week",
    description:
      "Deep engagement with set texts, poetry, and drama. We develop critical reading, close analysis, and essay writing skills that go beyond surface-level interpretation.",
    featured: false,
    syllabus: [
      "Set text study: prose and drama",
      "Unseen poetry analysis",
      "Comparative essay techniques",
      "Contextual understanding and critical perspectives",
    ],
    curriculum: [
      {
        title: "Prose Study",
        topics: [
          "Character analysis and development",
          "Narrative voice and structural choices",
          "Thematic exploration across texts",
          "Contextual reading and critical lenses",
        ],
      },
      {
        title: "Drama Study",
        topics: [
          "Dramatic conventions and stagecraft",
          "Dialogue analysis and subtext",
          "Conflict, tension, and resolution",
          "Performance-aware close reading",
        ],
      },
      {
        title: "Poetry & Unseen Analysis",
        topics: [
          "Poetic form, metre, and sound",
          "Imagery, symbolism, and figurative language",
          "Unseen poetry: structured approach",
          "Comparative poetry essays",
        ],
      },
      {
        title: "Essay Craft",
        topics: [
          "Thesis development and argument structure",
          "Embedding quotations with analytical commentary",
          "Exam-style essay planning and execution",
          "Peer review and refinement",
        ],
      },
    ],
    outcomes: [
      "Produce sophisticated literary analysis essays",
      "Engage critically with set texts and unseen poetry",
      "Develop original interpretations supported by close reading",
      "Write with confidence under exam conditions",
      "Appreciate literature as a lens for understanding the world",
    ],
  },
  {
    id: "creative-writing-workshop",
    title: "Creative Writing Workshop",
    subtitle: "Voice, Craft & Expression",
    category: "creative-writing",
    categoryLabel: "Creative Writing",
    price: "PKR 15,000",
    duration: "6 Weeks",
    schedule: "1 session/week",
    description:
      "A focused workshop for students who want to strengthen their creative voice. Ideal for composition prep, personal statements, and developing writing as a lifelong skill.",
    featured: true,
    syllabus: [
      "Narrative and descriptive writing techniques",
      "Voice development and style",
      "Workshop-based peer feedback",
      "Portfolio development",
    ],
    curriculum: [
      {
        title: "Finding Your Voice",
        topics: [
          "Reading as a writer: analysing craft choices",
          "Point of view and narrative distance",
          "Developing a distinctive writing style",
          "Writing prompts and daily practice habits",
        ],
      },
      {
        title: "Craft & Technique",
        topics: [
          "Show, don't tell: sensory writing",
          "Dialogue that reveals character",
          "Pacing and structure in short fiction",
          "Editing and revision strategies",
        ],
      },
      {
        title: "Workshop & Portfolio",
        topics: [
          "Peer workshop sessions with guided feedback",
          "Responding to critique constructively",
          "Compiling a polished writing portfolio",
          "Connecting creative writing to exam composition",
        ],
      },
    ],
    outcomes: [
      "Develop a confident, distinctive writing voice",
      "Apply narrative and descriptive techniques with precision",
      "Give and receive constructive feedback effectively",
      "Build a portfolio of polished creative work",
      "Transfer creative skills to exam composition tasks",
    ],
  },
];

export const resources: Resource[] = [
  {
    id: "ms-1123-2024",
    title: "O Level English 1123 - Marking Scheme",
    description: "Official CAIE marking scheme with examiner annotations and grade boundaries.",
    type: "marking-scheme",
    typeLabel: "Marking Scheme",
    subject: "O Level English 1123",
    year: "2024",
    downloadLabel: "Download PDF",
  },
  {
    id: "er-1123-2024",
    title: "O Level English 1123 - Examiner Report",
    description: "Principal examiner's feedback on common errors and areas of strength.",
    type: "examiner-report",
    typeLabel: "Examiner Report",
    subject: "O Level English 1123",
    year: "2024",
    downloadLabel: "Download PDF",
  },
  {
    id: "ms-9093-2024",
    title: "A Level English 9093 - Marking Scheme",
    description: "Detailed marking scheme for AS and A2 papers with band descriptors.",
    type: "marking-scheme",
    typeLabel: "Marking Scheme",
    subject: "A Level English 9093",
    year: "2024",
    downloadLabel: "Download PDF",
  },
  {
    id: "er-9093-2024",
    title: "A Level English 9093 - Examiner Report",
    description: "Examiner commentary on candidate performance and recommended improvements.",
    type: "examiner-report",
    typeLabel: "Examiner Report",
    subject: "A Level English 9093",
    year: "2024",
    downloadLabel: "Download PDF",
  },
  {
    id: "pp-1123-2023",
    title: "O Level English 1123 - Past Paper",
    description: "Complete past paper set for independent timed practice.",
    type: "past-paper",
    typeLabel: "Past Paper",
    subject: "O Level English 1123",
    year: "2023",
    downloadLabel: "Download PDF",
  },
  {
    id: "pp-9093-2023",
    title: "A Level English 9093 - Past Paper",
    description: "Full paper set covering Paper 1 through Paper 4.",
    type: "past-paper",
    typeLabel: "Past Paper",
    subject: "A Level English 9093",
    year: "2023",
    downloadLabel: "Download PDF",
  },
  {
    id: "checklist-composition",
    title: "Composition Writing Checklist",
    description: "A step-by-step self-review checklist aligned to CAIE marking criteria.",
    type: "checklist",
    typeLabel: "Checklist",
    subject: "O Level English 1123",
    year: "2025",
    downloadLabel: "Download PDF",
  },
  {
    id: "checklist-commentary",
    title: "Commentary Writing Framework",
    description: "Structured framework for A Level textual commentary with examiner tips.",
    type: "checklist",
    typeLabel: "Framework",
    subject: "A Level English 9093",
    year: "2025",
    downloadLabel: "Download PDF",
  },
];

export const siteConfig = {
  name: "Jaweria Amer",
  title: "Jaweria Amer - O/A Level English Specialist",
  description:
    "Rubric-driven Cambridge O/A Level English tutoring in Karachi. Structured practice, precise feedback, and mentorship that builds independent thinkers.",
  tagline: "Master CAIE English with Clarity and Care",
  whatsappNumber: contact.whatsappE164,
  whatsappMessage: contact.messageDefault,
  email: contact.email,
  stats: [
    { value: "95%", label: "Students scored A*/A" },
    { value: "500+", label: "Students mentored" },
    { value: "8+", label: "Years of experience" },
    { value: "12", label: "CAIE exam sessions" },
  ],
  roadmap: [
    {
      step: 1,
      title: "Diagnostic Review",
      description: "We assess your current level, identify patterns, and pinpoint exactly what needs attention.",
    },
    {
      step: 2,
      title: "Structured Plan",
      description: "A clear, week-by-week plan aligned to your exam timeline and personal goals.",
    },
    {
      step: 3,
      title: "Targeted Practice",
      description: "Rubric-driven exercises, timed papers, and focused skill-building sessions.",
    },
    {
      step: 4,
      title: "Feedback & Refinement",
      description: "Detailed, examiner-style feedback on every piece of work. We fix what matters most.",
    },
    {
      step: 5,
      title: "Exam Readiness",
      description: "Full mock papers under real conditions. You walk into the exam hall prepared and confident.",
    },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
};
