export type Language = "en" | "id";
export type Theme = "dark" | "light";

export interface ProjectDeepDive {
  challenge: string;
  architecture: string;
  results: string;
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "healthcare" | "agents" | "vision" | "fullstack";
  badge: string;
  badgeType: "gold" | "cyan" | "purple";
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string | null;
  deepDive: ProjectDeepDive;
}

export interface ExperienceItem {
  id: string;
  period: string;
  organization: string;
  role: string;
  active?: boolean;
  tasks: string[];
  impact: string[];
  tags: string[];
}

export interface OrganizationItem {
  id: string;
  period: string;
  organization: string;
  role: string;
  active?: boolean;
  highlights: string[];
  tags: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  faculty: string;
  gpa: string;
  thesis: {
    label: string;
    title: string;
    description: string;
  };
  coursework: string[];
}

export interface AwardItem {
  id: string;
  period: string;
  badge: string;
  icon: string;
  title: string;
  issuer: string;
  description: string;
}

export interface FAQItem {
  qKey: string;
  aKey: string;
  qFallback: string;
  aFallback: string;
}

export interface StrategicDirective {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export interface CapabilityItem {
  id: string;
  title: string;
  level: SkillLevel;
  description: string;
  proficiencyScore: number;
}

export interface CoreFocusDomain {
  id: string;
  title: string;
  skills: CapabilityItem[];
}

export interface EngineeringTechItem {
  id: string;
  name: string;
  description: string;
  category: "Language" | "Framework" | "Library" | "Data" | "Cloud" | "AI";
  iconKey: string;
  color?: string;
}

export interface ToolingItem {
  id: string;
  name: string;
  iconKey: string;
  category: "vcs" | "editor" | "ml" | "design" | "infra" | "os";
}

