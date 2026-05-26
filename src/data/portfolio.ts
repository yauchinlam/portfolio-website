export const profile = {
  name: "Yauchin M. Lam",
  headline:
    "Senior Software Engineer & Cloud Architect building secure, AI-enabled systems for the public sector",
  tagline:
    "U.S. Navy Veteran · AWS & Azure · Generative AI · TS/SCI (last active Nov 2021)",
  email: "yauchin.lam@outlook.com",
  github: "https://github.com/yauchinlam",
  linkedin: "https://www.linkedin.com/in/yauchinlam/",
};

export const about = `Senior Software Engineer, Cloud Architect, and U.S. Navy Veteran with over 5 years of experience designing, building, and deploying secure cloud-native applications, distributed data systems, and AI/LLM solutions across highly regulated environments—including AWS GovCloud and Azure GCC High.

I provide technical leadership, optimize data pipelines, and integrate generative AI frameworks to solve mission-critical public sector challenges. I am deeply adept at navigating strict compliance, security frameworks, and multi-cloud architectures to deliver scalable, high-availability enterprise systems.`;

export const skills = [
  "Python",
  "C#",
  "SQL",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "React",
  "REST APIs",
  "AWS",
  "Microsoft Azure",
  "Amazon Bedrock",
  "Azure OpenAI",
  "Docker",
  "Terraform",
  "GitHub Actions",
  "CI/CD",
  "Amazon SQS",
  "Event-Driven Architecture",
  "Azure Monitor",
  "AWS CloudWatch",
  "KQL",
  "Prompt Engineering",
  "OAuth2 / OIDC",
  "Agile / Scrum",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Terraform Infrastructure",
    description:
      "Bootstrap Terraform for Azure remote state, deploy identity, and GitHub Actions OIDC—foundational IaC for secure, repeatable cloud deployments.",
    tags: ["Terraform", "Azure", "GitHub Actions", "OIDC"],
    githubUrl: "https://github.com/yauchinlam/terraform-infrastructure",
  },
  {
    title: "AI Prompts Library",
    description:
      "Curated AI prompt instructions and patterns created with Claude AI—organized for reusable engineering, documentation, and LLM workflow design.",
    tags: ["AI", "Prompt Engineering", "Claude"],
    githubUrl: "https://github.com/yauchinlam/ai_prompts",
  },
];

export const certifications = [
  "Microsoft Certified: Azure Fundamentals",
  "AWS Certified Developer – Associate",
  "AWS Certified Solutions Architect – Associate",
];

export const education =
  "B.S. Pure & Applied Mathematics — Stevens Institute of Technology";
