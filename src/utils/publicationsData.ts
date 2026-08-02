export interface PublicationEntry {
  title: string
  venue: string
  date: string
  /**
   * Short human-readable category shown next to the date, e.g. "Journal Article", "StoryMap"
   */
  type: string
  /**
   * Icon name from the lucide set (via astro-icon), e.g. "lucide:book-open"
   */
  icon: string
  authors: string[]
  summary: string
  url: string
}

export const publications: PublicationEntry[] = [
  {
    title: "You Can't Stop the Beat: Exploring Bias, Power, and Perspective Through Hairspray",
    venue: 'Communication Teacher',
    date: 'June 4, 2026',
    type: 'Journal Article',
    icon: 'lucide:scissors',
    authors: ['Alyssa Berger', 'Seungyoon Lee'],
    summary:
      "A classroom activity that uses a screening of Hairspray to teach feminist standpoint theory and structuration theory, prompting students to confront their own biases through the film's historical themes and the real-world events behind them.",
    url: 'https://doi.org/10.1080/17404622.2026.2669274',
  },
  {
    title: 'Exploring the Old Naval Observatory',
    venue: "Purdue John Martinson Honors College Scholarly Project",
    date: 'May 15, 2025',
    type: 'StoryMap',
    icon: 'lucide:map',
    authors: ['Alyssa Berger', 'Marisa Crescent'],
    summary:
      "A study into the Old Naval Observatory's construction, drawing on Library of Congress and National Archives records to examine whether enslaved or indentured labor was used to build it.",
    url: 'https://storymaps.arcgis.com/stories/a7025a5a0be5495292baa8b6fdd08bb7',
  },
  {
    title: 'Palazzos, Perimeters, and Preserving Pasts',
    venue: "2024 U.S. Department of State's Spring Diplomacy Lab",
    date: 'April 15, 2024',
    type: 'StoryMap',
    icon: 'lucide:landmark',
    authors: [
      'Alyssa Berger',
      'Johnny Dong',
      'Maggie Dong',
      'Michal Gawronski',
      'Lauren Gardner',
      'Melanie Kreutz',
      'Matthew Mozingo',
      'Amelia Simpson',
      'Alexander Repikov',
    ],
    summary:
      "An ArcGIS StoryMap documenting the history and architecture of the U.S. Chancery in Rome, part of the Historic Centre of Rome UNESCO World Heritage Site.",
    url: 'https://storymaps.arcgis.com/stories/4c0ce6e6740144ffaea964f32994a48c',
  },
]
