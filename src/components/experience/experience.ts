export type ExperienceItemType = {
  date: string
  title: string
  description: string
  stack: string[]
  link?: string
}

export const Experience: ExperienceItemType[] = [
  {
    date: 'Aug 2025 - May 2026',
    title: 'Athena AI',
    description:
      'Built and improved frontend features for an AI-powered platform that automates everyday workflows. Developed responsive interfaces with Vue.js and contributed to related web projects.',
    stack: ['Vue.js 3', 'TS', 'Nuxt', 'Pinia', 'Axios', 'Pug', 'Vuetify', 'Tailwind', 'i18n'],
    link: 'https://athenachat.ai/',
  },
  {
    date: 'Jan 2025 - June 2025',
    title: 'Freelance',
    description:
      'Developed an educational website with learning resources for teachers of young English learners.',
    stack: ['Vue.js 3', 'TS', 'Pinia', 'Axios'],
  },
  {
    date: 'Sep 2023 - Nov 2024',
    title: 'Frontend Developer (Vue.js) at Centiment',
    description:
      'Helped migrate a monolithic application to a modern Vue 3 architecture with a separate frontend. Built new pages and reusable components, collaborated on UI improvements, and supported code quality through reviews.',
    stack: ['Vue.js 2', 'Vue.js 3', 'TS', 'Storybook', 'UnoCss', 'Pinia', 'Axios'],
    link: 'https://www.centiment.co/',
  },
  {
    date: 'Jan 2022 - Jul 2023',
    title: 'Frontend Developer (Vue.js) at Godel Technologies',
    description:
      'Developed a communication monitoring platform that unified data from calls, emails, and WhatsApp. Built features with Vue.js and Lit, wrote tests, documented solutions, and contributed to code reviews and Agile planning.',
    stack: [
      'Vue.js 3',
      'TS',
      'Lit',
      'Storybook',
      'Vitest',
      'Vue Test Utils',
      'Jest',
      'Pinia',
      'Axios',
      'i18n'
    ],
    link: 'https://www.godeltech.com/',
  },
  {
    date: 'Jun 2021 - Dec 2021',
    title: 'Frontend Developer (Vue.js) at Brymonsoft',
    description:
      'Worked on an online music learning platform and a website builder. Developed new features and widgets, improved existing functionality, and contributed to planning, documentation, and code reviews.',
    stack: ['Vue.js 2', 'Vue.js 3', 'HTML', 'JS', 'SCSS', 'Axios', 'Vuex', 'Vue Router', 'Docker', 'i18n'],
    link: 'https://brymonsoft.com/',
  },
  {
    date: 'Mar 2021 - June 2021',
    title: 'Frontend Developer (Vue.js) at Antalogic',
    description:
      'Worked on an international commercial vehicle marketplace and a charity platform. Developed new features, improved code quality, and helped enhance the overall user experience.',
    stack: ['Vue.js 2', 'Vue.js 3', 'Axios', 'Nuxt', 'SCSS', 'Bootstrap', 'Vuex', 'i18n'],
  },
  {
    date: 'Jun 2020 - Mar 2021',
    title: 'Frontend Developer (Freelance)',
    description: 'Built websites and landing pages for clients, with occasional UI and web design work.',
    stack: ['JS', 'HTML', 'CSS', 'JQuery', 'AJAX'],
  },
]
