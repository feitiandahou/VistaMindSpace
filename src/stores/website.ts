import { defineStore } from 'pinia'
import type { Website } from '@/types/website'

// 定义「允许更新的字段」（排除id/createdAt，只开放可修改的字段）
type UpdatableWebsite = Omit<Website, 'id' | 'createdAt'>

export const useWebsiteStore = defineStore('website', {
  state: () => ({
    websites: [] as Website[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchWebsites(): Promise<boolean> {
      this.loading = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.websites = mockWebsites
        console.log('模拟数据加载成功')
        return true
      } catch (err) {
        this.error = 'Failed to fetch websites'
        return false
      } finally {
        this.loading = false
      }
    },
    addWebsite(website: Omit<Website, 'id' | 'createdAt' | 'updatedAt'>): boolean {
      const newWebsite: Website = {
        ...website,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
        clickCount: 0,
        collectionCount: 0,
      }
      this.websites.push(newWebsite)
      console.log(`添加成功：新网站id为${newWebsite.id}`)
      return true
    },
    updateWebsite(id: number, updates: Partial<UpdatableWebsite>): boolean {
      // 前置校验：确保id是有效数字（排除NaN/0/负数）
      if (typeof id !== 'number' || isNaN(id) || id <= 0) {
        console.error('id必须是正整数')
        return false
      }
      // 过滤空更新（无有效字段时直接返回）
      const hasValidUpdates = Object.keys(updates).length > 0
      if (!hasValidUpdates) {
        console.warn('更新提示：未传入任何有效更新字段')
        return false
      }
      const index = this.websites.findIndex((w) => w.id === id)
      if (index === -1) {
        console.error(`更新失败：未找到id为${id}的网站`)
        return false
      }
      try {
        const updateWebsite: Website = {
          ...(this.websites[index] as Website),
          ...updates,
          updatedAt: new Date(),
        }
        this.websites.splice(index, 1, updateWebsite)
        console.log(`更新成功：id为${id}的网站已更新`)
        return true
      } catch (err) {
        console.error(`更新失败：${err}`)
        return false
      }
    },
    deleteWebsite(id: number) {
      this.websites = this.websites.filter((w) => w.id !== id)
      console.log(`删除成功：id为${id}的网站已删除`)
    },
  },
  getters: {
    allWebsites: (state) => state.websites,
    websitesByCategory: (state) => (category: string) => {
      return state.websites.filter((w) => w.category1 === category)
    },
    websitesByTag: (state) => (tag: string) => {
      return state.websites.filter((w) => w.tags?.includes(tag))
    },
    popularWebsites: (state) => {
      return state.websites.sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))
    },
  },
})
const mockWebsites: Website[] = [
  {
    id: 1,
    title: 'Vue.js',
    url: 'https://vuejs.org',
    slogan: 'The Progressive JavaScript Framework',
    description:
      'An approachable, performant and versatile framework for building web user interfaces.',
    category1: 'Framework',
    icon: 'https://vuejs.org/logo.png',
    tags: ['frontend', 'javascript', 'framework'],
    clickCount: 1024,
    collectionCount: 56,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-10-01'),
  },
  {
    id: 2,
    title: 'React',
    url: 'https://react.dev',
    slogan: 'A JavaScript library for building user interfaces',
    description: 'Declarative and component-based, React makes building interactive UIs a breeze.',
    category1: 'Framework',
    icon: 'https://react.dev/favicon.ico',
    tags: ['frontend', 'javascript', 'library'],
    clickCount: 2048,
    collectionCount: 128,
    createdAt: new Date('2022-05-15'),
    updatedAt: new Date('2023-09-20'),
  },
  {
    id: 3,
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    slogan: 'JavaScript with syntax for types',
    description: 'Strongly typed programming language that builds on JavaScript.',
    category1: 'Language',
    icon: 'https://www.typescriptlang.org/favicon-32x32.png',
    tags: ['typescript', 'tooling'],
    clickCount: 512,
    collectionCount: 32,
    createdAt: new Date('2021-11-03'),
    updatedAt: new Date('2023-08-10'),
  },
  {
    id: 4,
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    slogan: 'Rapidly build modern websites without ever leaving your HTML.',
    description:
      'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    category1: 'Styling',
    icon: 'https://tailwindcss.com/favicon-32x32.png',
    tags: ['css', 'frontend', 'tooling'],
    clickCount: 890,
    collectionCount: 75,
    createdAt: new Date('2022-03-10'),
    updatedAt: new Date('2023-11-05'),
  },
  {
    id: 5,
    title: 'Vite',
    url: 'https://vitejs.dev',
    slogan: 'Next Generation Frontend Tooling',
    description:
      'Instant server start, lightning-fast HMR, and optimized builds for modern web projects.',
    category1: 'Tooling',
    icon: 'https://vitejs.dev/logo.svg',
    tags: ['build-tool', 'dev-server', 'javascript'],
    clickCount: 1560,
    collectionCount: 92,
    createdAt: new Date('2021-12-01'),
    updatedAt: new Date('2023-10-22'),
  },
  {
    id: 6,
    title: 'GitHub',
    url: 'https://github.com',
    slogan: 'Where the world builds software',
    description:
      'Host and review code, manage projects, and build software alongside millions of developers.',
    category1: 'Platform',
    icon: 'https://github.com/favicon.ico',
    tags: ['git', 'collaboration', 'open-source'],
    clickCount: 5000,
    collectionCount: 320,
    createdAt: new Date('2020-01-15'),
    updatedAt: new Date('2023-12-01'),
  },
  {
    id: 7,
    title: 'Figma',
    url: 'https://www.figma.com',
    slogan: 'Design, prototype, and collaborate all in one place',
    description: 'The collaborative interface design tool used by teams worldwide.',
    category1: 'Design',
    icon: 'https://www.figma.com/favicon.ico',
    tags: ['ui-design', 'prototyping', 'collaboration'],
    clickCount: 720,
    collectionCount: 68,
    createdAt: new Date('2022-07-18'),
    updatedAt: new Date('2023-09-30'),
  },
  {
    id: 8,
    title: 'Node.js',
    url: 'https://nodejs.org',
    slogan: "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    description: 'Enables scalable network applications using JavaScript on the server side.',
    category1: 'Runtime',
    icon: 'https://nodejs.org/static/images/favicons/favicon-32x32.png',
    tags: ['backend', 'javascript', 'server'],
    clickCount: 1800,
    collectionCount: 110,
    createdAt: new Date('2021-05-20'),
    updatedAt: new Date('2023-11-12'),
  },
  {
    id: 9,
    title: 'OpenAI',
    url: 'https://openai.com',
    slogan: 'Creating safe and beneficial artificial general intelligence',
    description: 'Research lab developing cutting-edge AI models like GPT and DALL·E.',
    category1: 'AI',
    icon: 'https://openai.com/favicon.ico',
    tags: ['ai', 'machine-learning', 'api'],
    clickCount: 2200,
    collectionCount: 145,
    createdAt: new Date('2022-11-30'),
    updatedAt: new Date('2023-12-01'),
  },
  {
    id: 10,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    slogan: 'Resources for developers, by developers',
    description:
      'Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.',
    category1: 'Documentation',
    icon: 'https://developer.mozilla.org/apple-touch-icon.180x180.png',
    tags: ['docs', 'web', 'learning'],
    clickCount: 3100,
    collectionCount: 210,
    createdAt: new Date('2020-08-10'),
    updatedAt: new Date('2023-10-18'),
  },
  {
    id: 11,
    title: 'Supabase',
    url: 'https://supabase.com',
    slogan: 'The open source Firebase alternative',
    description:
      'Build backend apps with a PostgreSQL database, authentication, storage, and real-time APIs.',
    category1: 'Backend',
    icon: 'https://supabase.com/favicon.ico',
    tags: ['database', 'auth', 'realtime'],
    clickCount: 950,
    collectionCount: 88,
    createdAt: new Date('2022-09-05'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 12,
    title: 'Three.js',
    url: 'https://threejs.org',
    slogan: 'JavaScript 3D library',
    description: 'Create and display animated 3D computer graphics in a web browser using WebGL.',
    category1: 'Library',
    icon: 'https://threejs.org/files/favicon_32x32.png',
    tags: ['3d', 'webgl', 'graphics'],
    clickCount: 620,
    collectionCount: 54,
    createdAt: new Date('2021-10-12'),
    updatedAt: new Date('2023-08-28'),
  },
  {
    id: 13,
    title: 'Notion',
    url: 'https://www.notion.so',
    slogan: 'All-in-one workspace for your notes, tasks, wikis, and databases',
    description: 'A new tool that blends your everyday work apps into one, unified workspace.',
    category1: 'Productivity',
    icon: 'https://www.notion.so/images/favicon.ico',
    tags: ['notes', 'productivity', 'collaboration'],
    clickCount: 1400,
    collectionCount: 102,
    createdAt: new Date('2022-01-25'),
    updatedAt: new Date('2023-11-30'),
  },
]
