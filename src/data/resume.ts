export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
  color: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  displayText: string;
}

export const professionalSummary =
  "Technical Architect with 20+ years of proven experience designing and implementing " +
  "enterprise-scale solutions at the intersection of innovation and practical business outcomes. " +
  "Expert in cloud computing (AWS, Azure), artificial intelligence, and full-stack development " +
  "with comprehensive expertise spanning application development, database administration, and " +
  "system architecture.";

export const professionalSummary2 =
  "Demonstrated success leading cross-functional teams, driving digital transformation " +
  "initiatives, and delivering scalable, cloud-native solutions that reduce costs and " +
  "improve performance. Specialized in translating complex business requirements into " +
  "cutting-edge technical strategies that drive measurable results.";

export const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "15+", label: "Years Current Role" },
  { value: "6", label: "Tech Domains" },
  { value: "40%", label: "Scalability Boost" },
];

export const experiences: Experience[] = [
  {
    id: "xminds-architect",
    role: "Technical Architect",
    company: "Xminds Infotech Pvt Ltd",
    location: "Trivandrum",
    period: "Jan 2010 - Present",
    duration: "15+ years",
    description:
      "Lead architect responsible for designing and implementing scalable enterprise solutions spanning cloud computing, AI integration, and full-stack development.",
    achievements: [
      "Architected and deployed cloud-native solutions on AWS and Azure, optimizing system performance and reducing infrastructure costs",
      "Led migration of legacy systems to microservices architecture using Docker and Kubernetes, improving scalability by 40%",
      "Designed and implemented AI-driven solutions for business process automation and intelligent data processing",
      "Established DevOps practices and CI/CD pipelines, reducing deployment time and improving release frequency",
      "Mentored development teams on best practices in Java, Python, React, and cloud technologies",
    ],
  },
  {
    id: "pollenizer",
    role: "Team Lead",
    company: "Pollenizer India",
    location: "Trivandrum",
    period: "2009 - Mar 2011",
    duration: "2 years",
    description:
      "Led large development teams at a startup incubator, driving product delivery and technical decision-making.",
    achievements: [
      "Led cross-functional development teams on multiple startup products",
      "Managed end-to-end project delivery and technical architecture decisions",
    ],
  },
  {
    id: "xminds-senior",
    role: "Senior Software Engineer",
    company: "Xminds Infotech Pvt Ltd",
    location: "Trivandrum",
    period: "Apr 2006 - Jan 2010",
    duration: "4 years",
    description:
      "Developed and maintained complex software systems for online money transfers and chat applications.",
    achievements: [
      "Designed and implemented secure payment processing systems handling high-volume transactions",
      "Built real-time chat applications using modern web technologies and WebSocket protocols",
      "Implemented security best practices and compliance measures for financial applications",
      "Led code reviews and established coding standards for development teams",
    ],
  },
  {
    id: "lecturer",
    role: "Lecturer, Computer Science",
    company: "University of Kerala",
    location: "Kerala",
    period: "Aug 2000 - Mar 2006",
    duration: "6 years",
    description:
      "Taught computer science courses covering software development, system administration, and database management.",
    achievements: [
      "Delivered courses in software development, system administration, and database management",
      "Mentored students in practical application of programming concepts and emerging technologies",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "Code2",
    skills: ["Java / J2EE", "Python", "PHP", "Rust", "Node.js", "TypeScript"],
    color: "blue",
  },
  {
    id: "frameworks",
    title: "Frameworks",
    icon: "Layers",
    skills: [
      "React / React Native",
      "Next.js",
      "Angular",
      "NestJS",
      "Spring",
      "Django",
      "Express.js",
    ],
    color: "purple",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      "AWS (EC2, S3, Lambda)",
      "Azure",
      "Docker / Kubernetes",
      "CI/CD Pipelines",
      "Terraform",
    ],
    color: "cyan",
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: "Network",
    skills: [
      "Microservices",
      "RESTful API Design",
      "System Design Patterns",
      "Distributed Systems",
      "Event-Driven Architecture",
    ],
    color: "pink",
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    skills: ["Oracle / MySQL", "PostgreSQL", "MongoDB", "Redis"],
    color: "amber",
  },
  {
    id: "ai",
    title: "AI & ML",
    icon: "Brain",
    skills: [
      "Machine Learning",
      "AI Integration",
      "Data Analytics",
      "Natural Language Processing",
      "Intelligent Systems",
    ],
    color: "emerald",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:vinu@vinuvarghese.com",
    icon: "Mail",
    displayText: "vinu@vinuvarghese.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vinuvarghese/",
    icon: "Linkedin",
    displayText: "linkedin.com/in/vinuvarghese",
  },
  {
    label: "GitHub",
    href: "https://github.com/vinu",
    icon: "Github",
    displayText: "github.com/vinu",
  },
  {
    label: "Location",
    href: "#contact",
    icon: "MapPin",
    displayText: "Thiruvananthapuram, Kerala, India",
  },
  {
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/674067/jang00",
    icon: "StackOverflow",
    displayText: "stackoverflow.com/users/674067",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
