export interface ExperienceEntry {
  title: string
  organization: string
  location?: string
  period: string
  description?: string
}

export interface EducationEntry {
  degree: string
  institution: string
  location?: string
  period: string
  description?: string
}

// Placeholder content until real resume data is sourced (see TODO.md)
export const experience: ExperienceEntry[] = [
  {
    title: 'UX Design Intern',
    organization: 'Acme Digital Studio',
    location: 'West Lafayette, IN',
    period: 'Jun 2025 – Aug 2025',
    description:
      'Redesigned onboarding flows for a SaaS dashboard and ran usability tests with 12 participants, improving task completion by 30%.',
  },
  {
    title: 'Front-End Developer, Part-Time',
    organization: 'Boilermaker Web Co.',
    location: 'West Lafayette, IN',
    period: 'Sep 2024 – Present',
    description:
      'Build accessible React components and audit existing pages against WCAG 2.2 AA using axe DevTools and screen reader testing.',
  },
]

export const education: EducationEntry[] = [
  {
    degree: 'B.S. in User Experience Design',
    institution: 'Purdue University',
    location: 'West Lafayette, IN',
    period: 'Aug 2022 – May 2026 (expected)',
    description: 'Coursework in Human-Computer Interaction, Visual Design, and Accessibility Engineering.',
  },
  {
    degree: 'Accessibility Foundations Certificate',
    institution: 'Deque University',
    period: '2024',
    description: 'Completed coursework on WCAG 2.2, ARIA authoring practices, and assistive technology testing.',
  },
]
