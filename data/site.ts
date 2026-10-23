export const site = {
  name: "Shivam Wadhwa",
  role: "Full-stack developer",
  tagline: "I build web apps end to end.",
  location: "Ontario, Canada",
  positioning: "I build full-stack web apps with React, Node.js and PostgreSQL.",
  year: new Date().getFullYear(),
  heroImage: {
    src: "/portrait.webp",
    alt: "Black-and-white portrait of Shivam Wadhwa",
  },
};

export const nav = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

export const links = {
  email: "developer.shivamwadhwa@gmail.com",
  github: "https://github.com/wadhwashivam",
  linkedin: "https://www.linkedin.com/in/wadhwa-shivam", // check this opens your profile
  resume: "/resume.pdf",
};

// Only real, checkable numbers. The hero shows the first two.
export const proof = [
  { value: "4", label: "Full-stack apps deployed" },
  { value: "103", label: "LeetCode problems solved" },
];

export const about = {
  paragraph:
    "I'm a full-stack developer. I like building things end to end, so I understand every layer, from the database to the deployed app. Agora, my biggest project, is text only on purpose: a place for people to think and write, not scroll. I built it solo and put it on AWS. I want to keep building products like that, and use AI where it actually helps, like search and finding related posts, not where it just generates more content. I studied computer science at UPEI and taught myself full-stack on top of that.",
  facts: [
    { label: "Based in", value: "Ontario, Canada" },
    { label: "Open to", value: "Full-time: full-stack, software developer and software engineer roles" },
    { label: "Focus", value: "React, Node.js, PostgreSQL" },
  ],
};

// Only list what you can talk about in an interview.
export const stack = [
  { group: "Languages", items: ["Java", "JavaScript"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Material UI", "HTML & CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Passport.js", "JWT / sessions"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "SQLite", "Prisma"] },
  { group: "Tooling", items: ["Git", "Docker", "AWS (EC2, RDS)", "Render", "Neon", "Vitest", "Supertest", "GitHub Actions"] },
];

export const cta = {
  eyebrow: "Open to work",
  heading: "Hiring a full-stack developer? Let's talk.",
  body: "I'm looking for full-stack developer, software developer or software engineer roles at the junior to intermediate level. Send me a message and I'll get back to you.",
};