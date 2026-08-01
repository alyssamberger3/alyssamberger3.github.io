import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'

export default defineThemeConfig({
  name: 'Alyssa Berger',
  id: 'accessible-astro-starter',
  seo: {
    title: 'Accessible Astro Starter',
    description:
      'An Accessible Starter Theme for Astro including several accessibility features and tools to help you build faster.',
    author: 'Incluud',
    image: previewImage, // Can also be a string e.g. '/social-preview-image.png',
  },
  colors: {
    primary: '#d648ff',
    secondary: '#00d1b7',
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      {
        type: 'link',
        label: 'Home',
        href: '/',
      },
      {
        type: 'link',
        label: 'Resume',
        href: '/#resume',
      },
      {
        type: 'link',
        label: 'Projects',
        href: '/#projects',
      },
      {
        type: 'link',
        label: 'Publications',
        href: '/#publications',
      },
      {
        type: 'link',
        label: 'Download resume PDF, opens in new tab',
        href: '/files/alyssa-berger-resume.pdf',
        icon: 'lucide:file-down',
        external: true,
      },
    ],
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/incluud/',
      icon: 'lucide:github',
    },
    {
      label: 'Bluesky',
      href: 'https://bsky.app/profile/incluud.dev',
      icon: 'lucide:bot-message-square',
    },
    {
      label: 'Open Collective',
      href: 'https://opencollective.com/incluud',
      icon: 'lucide:hand-heart',
    },
  ],
})
