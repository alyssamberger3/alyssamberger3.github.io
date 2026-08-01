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

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface LeadershipEntry {
  organization: string
  roles: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'UX Accessibility Intern',
    organization: 'OCLC',
    period: 'May 2025 – Present',
    description:
      'Assess accessibility compliance of OCLC products against WCAG 2.2, with a focus on landmark EU (2025) and US (2027) digital accessibility regulations. Generate VPAT reports, manage Jira tickets, and re-evaluate products post-remediation, and lead UX design and research on a capstone project introducing AI applications.',
  },
  {
    title: 'Accessibility Compliance Intern',
    organization: 'Purdue University Residences',
    location: 'West Lafayette, IN',
    period: 'May 2026 – Present',
    description:
      'Remediate protocol manuals, onboarding materials, and staff documentation to meet WCAG 2.2 and Section 508 standards. Audit the Purdue University Residences website and serve as an accessibility subject-matter expert for housing staff.',
  },
  {
    title: 'Innovative Learning Support Team Lead',
    organization: 'Purdue University – Center for Instructional Excellence',
    location: 'West Lafayette, IN',
    period: 'Oct 2025 – Present',
    description:
      "Support the Student Accessibility Support Team in meeting the Department of Justice's updated ADA Title II digital accessibility requirements campus-wide. Audit student-facing instructional materials for WCAG 2.2 and Section 508 compliance and guide faculty on accessible course design.",
  },
  {
    title: 'Resident Assistant',
    organization: 'Purdue University Residences – Windsor Halls',
    location: 'West Lafayette, IN',
    period: 'Aug 2025 – Present',
    description:
      'Build community among 40+ residents through daily engagement and 32 annual programs, managing budgets and supporting resident wellbeing.',
  },
]

export const education: EducationEntry[] = [
  {
    degree: 'B.S. User Experience Design, B.A. Anthropology',
    institution: 'Purdue University',
    location: 'West Lafayette, IN',
    period: 'Expected May 2027',
    description: 'GPA: 3.98',
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'Accessibility Standards',
    skills: ['WCAG 2.2', 'Section 508', 'ADA Title II', 'EU Accessibility Act 2025', 'VPAT Authoring'],
  },
  {
    category: 'Design & Research Tools',
    skills: ['Figma', 'Jira', 'UI Design', 'Design Systems', 'Usability Testing', 'Heuristic Evaluation'],
  },
  {
    category: 'Research Methods',
    skills: ['Stakeholder Interviews', 'User Journey Mapping', 'Qualitative & Quantitative Analysis'],
  },
]

export const leadership: LeadershipEntry[] = [
  {
    organization: 'Purdue Hillel',
    roles: ['President', 'VP of Programming & Engagement'],
  },
  {
    organization: 'Purdue Student Union Board',
    roles: ['Director of Wellbeing', 'General Member'],
  },
  {
    organization: 'Residence Hall Association',
    roles: ['President', 'Windsor Hall Senator'],
  },
  {
    organization: 'Windsor Hall Club',
    roles: ['Resident Assistant Representative', 'Treasurer', 'RHA Senator'],
  },
]
