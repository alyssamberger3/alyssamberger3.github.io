import type { CollectionEntry } from 'astro:content'

export function sortProjectsByEndDate(projects: CollectionEntry<'projects'>[]) {
  return [...projects].sort((a, b) => b.data.endDate.getTime() - a.data.endDate.getTime())
}
