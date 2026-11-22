export type Project = {
  id: string; // also the URL slug: /projects/<id>
  title: string;
  summary: string;
  stack: string[];
  live: string; // leave "" until there is a live URL; the link is hidden
  repo: string;
  cover: { src: string; alt: string };
  screenshots?: { src: string; alt: string; caption: string; wide?: boolean }[];
  caseStudy: {
    role: string;
    year: string;
    problem: string;
    decisions: { title: string; detail: string }[];
  };
};

export const projects: Project[] = [
    {
    id: "agora",
    title: "Agora",
    summary:
      "A text-only social platform for thought-provoking posts. No images, no video, 500 words at a time.",
    stack: [
      "React",
      "Material UI",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Passport.js",
      "JWT",
      "Vitest",
      "Supertest",
      "GitHub Actions",
      "Docker",
      "AWS (EC2, RDS)",
    ],
    live: "",
    repo: "https://github.com/wadhwashivam/Agora-App",
    cover: {
      src: "/projects/agora/cover.webp",
      alt: "Agora's feed: a composer with a 500-word counter above a list of text-only posts.",
    },
    screenshots: [
      {
        src: "/projects/agora/feed.webp",
        alt: "The Agora feed with a post composer and a 500-word counter.",
        caption: "Feed. Posts are text only, up to 500 words.",
      },
      {
        src: "/projects/agora/post.webp",
        alt: "A single Agora post with a discussion thread of four replies.",
        caption: "A post and its discussion. Replies are capped at 100 words.",
      },
      {
        src: "/projects/agora/explore.webp",
        alt: "The Explore page listing users with a search box.",
        caption: "Explore. Find people by name or username and follow them.",
      },
      {
        src: "/projects/agora/signup.webp",
        alt: "The Agora sign-up page with the tagline 'A quieter place to think out loud'.",
        caption: "Sign-up.",
      },
      {
        src: "/projects/agora/ci.webp",
        alt: "A GitHub pull request showing the backend and frontend CI checks passing.",
        caption: "Every pull request runs the tests and builds the frontend. Nothing merges until both checks pass.",
        wide: true,
      },
    ],
    caseStudy: {
      role: "Solo: frontend, backend, database, testing and deployment",
      year: "Aug – Oct 2026",
      problem:
        "Most social platforms are built around photos and video, and more and more of that is AI-generated. I wanted a place where people write and think instead, so Agora is text only, with a 500-word limit on posts and 100 on replies. It is also my proof that I can build a social platform from scratch: accounts, posts, replies, likes, follows, search, tests, CI and a real deployment.",
      decisions: [
        {
          title: "Text only, on purpose",
          detail:
            "No image or video uploads, so the feed is for thinking and writing. It also keeps AI-generated media off the platform.",
        },
        {
          title: "Passport.js with JWT",
          detail:
            "Passport is what I learned in the Odin Project curriculum and it has a large, active community. JWTs are token-based, so the API stays stateless.",
        },
        {
          title: "PostgreSQL with Prisma",
          detail:
            "The data is relational (users, posts, comments, likes, follows), so Postgres fits better than a document store. Prisma handles queries and migrations, and Prisma Studio lets me inspect the data in a UI instead of the terminal.",
        },
        {
          title: "Tests against a real database, not mocks",
          detail:
            "Most of the app's rules live in the database: one like per user per post, one follow per pair, cascading deletes. Mocking Prisma would skip all of that, so the 30 integration tests run with Vitest and Supertest against a throwaway Postgres. They cover auth, protected routes, who sees what in the feed, pagination limits and who can edit whose profile. Writing them turned up two validation bugs, which I fixed.",
        },
        {
          title: "CI on every pull request",
          detail:
            "GitHub Actions starts a fresh Postgres, runs the migrations and the tests, and lints and builds the frontend. The main branch is protected, so a change can't merge until both checks pass.",
        },
        {
          title: "Fixing 'works on my machine'",
          detail:
            "My lockfile installed fine on my Mac but failed on CI's Linux runner, because npm resolves some optional dependencies differently on each platform. I regenerated it inside a Linux Docker container, and now it installs the same everywhere.",
        },
        {
          title: "Docker for the whole stack",
          detail:
            "The backend, frontend and database run in containers with Docker Compose, so I don't install dependencies by hand and production runs the same way as my machine.",
        },
        {
          title: "AWS: EC2 and RDS",
          detail:
            "I had deployed on Render and Neon before. This time I wanted to learn AWS, and keeping the app on EC2 and the database on RDS puts both in one ecosystem where they talk to each other easily. The images are built on the instance itself instead of through a registry.",
        },
        {
          title: "Planned: chat, AI-assisted search and automatic deploys",
          detail:
            "Next I want direct messages between users and AI where it helps, search for example. There will be no option to generate posts with AI. I also want merges to main to deploy to EC2 automatically instead of me pulling and rebuilding by hand.",
        },
      ],
    },
  },

  {
    id: "rag-evaluation",
    title: "RAG Retrieval Study",
    summary:
      "A RAG system for questions about research papers, and a controlled test of which chunking and search choices actually help.",
    stack: [
      "Python",
      "pgvector",
      "PostgreSQL",
      "FastAPI",
      "React",
      "sentence-transformers",
      "BM25",
      "NumPy",
      "matplotlib",
      "Ollama",
      "Docker",
    ],
    live: "",
    repo: "https://github.com/wadhwashivam/qasper-retrieval-eval",
    cover: {
      src: "/projects/rag-evaluation/cover.webp",
      alt: "Two charts from the evaluation: retrieval gain for each configuration, and paired comparisons with confidence intervals.",
    },
    screenshots: [
      {
        src: "/projects/rag-evaluation/app.png",
        alt: "The web app showing an answer with a citation linked to a highlighted passage.",
        caption: "The web app. Each [n] in the answer links to its passage; cited passages are highlighted.",
        wide: true,
      },
      {
        src: "/projects/rag-evaluation/significance.webp",
        alt: "Forest plot of eight paired comparisons with 95% bootstrap intervals and a dashed line at zero.",
        caption:
          "Paired comparisons with 95% intervals. Anything crossing the dashed line isn't significant. The reranker is clearly worse, and hybrid search makes no difference.",
        wide: true,
      },
    ],
    caseStudy: {
      role: "Solo: retrieval pipeline, evaluation design and analysis",
      year: "Oct – Nov 2026",
      problem:
        "Most RAG tutorials pick a chunk size and a search method and move on. I wanted to know which of those choices actually matter. I built a RAG system from scratch for questions about NLP research papers (the QASPER dataset), then tested 4 ways of chunking and 4 ways of searching, 16 setups in total, on 2,196 questions with human-marked evidence. Splitting at paragraph boundaries helped in every comparison, hybrid search didn't beat plain embeddings, and a reranker made things worse at 18 times the cost.",
      decisions: [
        {
          title: "No framework",
          detail:
            "I wrote the chunkers, the four ranking methods and the evaluation myself, in Python with Postgres and pgvector, so I can explain and change every part. A framework like LangChain would have hidden exactly the parts I was testing.",
        },
        {
          title: "Chunk sizes in tokens, not words",
          detail:
            "My first chunker cut every 200 words. A check showed some chunks reached 655 tokens, past the embedding model's 512-token limit, so their endings were silently ignored. I switched to cutting by the model's own tokens, slicing the original text so casing and spacing stay intact.",
        },
        {
          title: "An answer key built from character positions",
          detail:
            "Every chunk stores where it starts and ends in the paper. The human-marked evidence is located in the same text, so deciding whether a chunk is relevant is plain arithmetic on overlapping ranges. I checked the rule against a failure I had diagnosed by hand, and it agreed.",
        },
        {
          title: "A fair way to compare chunk sizes",
          detail:
            "Smaller chunks make the top 5 cover less of the paper, so Hit@5 punishes them unfairly. I measured whether the evidence shows up within the first ~1,000 tokens of retrieved text instead, and subtracted a random baseline, because papers have so few chunks that guessing scores surprisingly well.",
        },
        {
          title: "Predictions written down before the test set",
          detail:
            "I made every decision on the development split, then committed my expected results to Git before running the held-out test set once. One prediction failed: hybrid search looked better on dev but didn't hold up on test. I reported it anyway.",
        },
        {
          title: "Checking which differences are real",
          detail:
            "A paired bootstrap test showed the reranker was significantly worse (p ≤ 0.002) and hybrid search made no difference. Paragraph chunking was better in every comparison, but only significant when combined with hybrid search.",
        },
        {
          title: "Reading the failures",
          detail:
            "Only 3% of test questions failed in every setup. When I read 20 of them, about a third weren't retrieval failures at all: the system found a correct answer, but the annotators had marked a different passage. The main real failure was wording, like a question asking about a 'gold standard' when the paper says 'ground truth'.",
        },
        {
          title: "From evaluation to a working app",
          detail:
            "The best configuration, paragraph chunks with dense retrieval, now runs behind a FastAPI service with a small React front end. You pick a paper, ask a question, and get an answer where each citation links to the passage it came from. The question my first version couldn't answer now gets a correct, cited answer.",
        },
        {
          title: "Planned: an agent",
          detail:
            "Next I want to extend it into an agent that can search across papers and follow references, instead of answering from one paper at a time.",
        },
      ],
    },
  },

  {
    id: "messaging-app",
    title: "Messaging App",
    summary:
      "Sign up, pick anyone from the user list and chat one-on-one. Edit your profile with a name, bio and avatar.",
    stack: [
      "React",
      "Vite",
      "Material UI",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Passport.js",
      "JWT",
      "Render",
      "Neon",
    ],
    live: "https://messaging-app-top-1.onrender.com",
    repo: "https://github.com/wadhwashivam/Messaging-App",
    cover: { src: "/projects/messaging-app/cover.webp", alt: "Messaging App conversation view" },
    screenshots: [
      {
        src: "/projects/messaging-app/split.webp",
        alt: "Two logged-in users chatting side by side, each seeing the same conversation",
        caption:
          "Two accounts in one conversation. Each side picks up the other's messages within a few seconds.",
        wide: true,
      },
      {
        src: "/projects/messaging-app/profile.webp",
        alt: "Edit profile screen with name, bio and avatar fields",
        caption: "Profile editing: display name, bio and avatar URL.",
      },
      {
        src: "/projects/messaging-app/signup.webp",
        alt: "Sign up form",
        caption: "Sign up with a username, name and password.",
      },
    ],
    caseStudy: {
      role: "Solo: frontend, backend and database",
      year: "2026",
      problem:
        "A chat app where every registered user shows up in a sidebar. Click someone and you get one conversation thread with them, which refreshes every few seconds so replies show up without a reload. Each user has a profile with a display name, a bio and an avatar. The chat and profile screens need a login.",
      decisions: [
        {
          title: "Polling instead of WebSockets",
          detail:
            "The backend is a plain REST API and never pushes data. The client polls the open conversation every few seconds and shows your own messages instantly, so it feels live without a socket layer.",
        },
        {
          title: "A JWT that carries only the user id",
          detail:
            "The token holds nothing but the id. The client decodes it to know who is logged in, then fetches the profile separately, so no profile data sits in a token that can be copied. Sessions survive a reload by re-reading the stored token.",
        },
        {
          title: "Conversations merged into one thread",
          detail:
            "Messages sent and received between two users are fetched per user and merged into a single chronological thread on the client.",
        },
        {
          title: "Protected routes with React Context",
          detail:
            "Auth state lives in a context, and the chat and profile screens redirect to login without a valid token.",
        },
        {
          title: "Free-tier hosting",
          detail:
            "Frontend and API run on Render, with the database on Neon. Render's free tier sleeps when idle, so the first load after a quiet spell can take up to a minute.",
        },
      ],
    },
  },
  {
    id: "blog-api",
    title: "Blog API",
    summary: "A blog with a reader site and a separate author dashboard, both running on one REST API.",
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Passport.js",
      "JWT",
      "Docker",
      "Vanilla JavaScript",
      "Tailwind CSS",
    ],
    live: "",
    repo: "https://github.com/wadhwashivam/Blog-API",
    cover: { src: "/projects/blog-api/cover.webp", alt: "Blog API reader site and admin dashboard" },
    screenshots: [
  {
    src: "/projects/blog-api/reader-home.webp",
    alt: "Public reader site listing the published posts, with Login and Sign Up buttons",
    caption: "Reader site: published posts only.",
  },
  {
    src: "/projects/blog-api/reader-post.webp",
    alt: "A single post with three comments and a comment form",
    caption: "A post and its comments. Commenting needs a logged-in account.",
  },
  {
    src: "/projects/blog-api/admin-list.webp",
    alt: "Author dashboard listing all posts, with one marked as a draft",
    caption: "Author dashboard: every post, with drafts labelled.",
  },
  {
    src: "/projects/blog-api/admin-edit.webp",
    alt: "Edit post screen with a published checkbox, submit and delete buttons, and a Delete Comment button",
    caption: "Editing a post, with comment moderation underneath.",
  },
],
    caseStudy: {
      role: "Solo: API, both front-ends and database",
      year: "2026",
      problem:
        "Readers browse published posts, read the comments, and can sign up to leave their own. The author logs into a separate dashboard to write, edit, publish or unpublish posts, delete them, and remove comments. Both sites are static front-ends that call the same API.",
      decisions: [
        {
          title: "One API, two clients",
          detail:
            "Neither client touches the database. Both talk to the Express API over HTTP, so a reader site and an admin dashboard share the same posts and comments without sharing any code.",
        },
        {
          title: "Passport Local to log in, Passport JWT to protect writes",
          detail:
            "Local verifies the password with bcrypt and issues a one-hour token. Reads are public, and every write route requires the token.",
        },
        {
          title: "Draft and published posts",
          detail:
            "Posts have a published flag. The public routes return only published posts, and the admin routes return everything, clearly labelled.",
        },
        {
          title: "Cascading deletes",
          detail:
            "Deleting a post removes its comments at the database level, with an `onDelete: Cascade` relation in Prisma, so no orphaned comments are left behind.",
        },
        {
          title: "Plain static front-ends",
          detail:
            "Both clients are vanilla JavaScript and HTML with no build step, which kept the focus on the API contract. Only the API is containerised, with Docker.",
        },
        {
          title: "Planned: server-side author checks",
          detail:
            "Right now any logged-in account passes the write-route auth. Next I'm adding an author check on the API so ownership is enforced there and not just hidden in the UI.",
        },
      ],
    },
  },
];