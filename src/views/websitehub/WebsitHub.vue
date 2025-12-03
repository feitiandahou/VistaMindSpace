<template>
  <div class="app-wrapper">
    <div class="ambient-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <header class="navbar">
      <div class="logo">🚀 WebsiteHub</div>

      <nav class="desktop-nav">
        <a v-for="cat in categories" :key="cat.name" :href="'#' + cat.name">{{ cat.name }}</a>
      </nav>

      <div class="actions">
        <button class="theme-btn" @click="toggleTheme">
          {{ isDark ? '🌙' : '☀️' }}
        </button>
        <button class="menu-btn" @click="isMenuOpen = !isMenuOpen">☰</button>
      </div>
    </header>

    <div class="mobile-drawer" :class="{ open: isMenuOpen }">
      <a
        v-for="cat in categories"
        :key="cat.name"
        :href="'#' + cat.name"
        @click="isMenuOpen = false"
      >
        {{ cat.name }}
      </a>
    </div>

    <main class="main-content">
      <section v-for="cat in categories" :key="cat.name" :id="cat.name" class="category-section">
        <h2 class="section-title"><span>#</span> {{ cat.name }}</h2>

        <div class="grid-layout">
          <SiteCard
            class="grid-item"
            v-for="website in websiteStore.allWebsites"
            :key="website.id"
            v-bind="website"
          />
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Designed with Vue 3 & Less</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SiteCard from './SiteCard.vue'
import { useWebsiteStore } from '@/stores/website'
onMounted(() => {
  websiteStore.fetchWebsites()
})
// 1. 数据源 (模拟数据)
const categories = ref([
  {
    name: '🔥 热门推荐',
    items: [
      { title: 'ChatGPT', desc: '能够改变世界的AI对话模型', url: '#', icon: '🤖' },
      { title: 'Bilibili', desc: '国内知名的视频弹幕网站', url: '#', icon: '📺' },
      { title: 'GitHub', desc: '全球最大的代码托管平台', url: '#', icon: '🐙' },
    ],
  },
  {
    name: '🎨 设计灵感',
    items: [
      { title: 'Dribbble', desc: '设计师展示才华的社区', url: '#', icon: '🏀' },
      { title: 'Behance', desc: 'Adobe旗下的创意展示平台', url: '#', icon: '🖼️' },
    ],
  },
])
const websiteStore = useWebsiteStore()
// 2. 主题切换逻辑
const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  // 设置 data-theme 属性，触发 CSS 变量切换
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}
// 3. 移动端菜单逻辑
const isMenuOpen = ref(false)
</script>

<style scoped lang="less">
@import '@/assets/websitehubstyles/mixins.less';

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition:
    background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.5s;
  margin: 0;
  font-family: 'Inter', sans-serif;
}
.app-wrapper {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* --- 背景动画 --- */
.ambient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 10s infinite ease-in-out alternate;
  }
  .blob-1 {
    width: 500px;
    height: 500px;
    background: var(--blob-color-1);
    top: -100px;
    left: -100px;
  }
  .blob-2 {
    width: 400px;
    height: 400px;
    background: var(--blob-color-2);
    bottom: -100px;
    right: -100px;
    animation-delay: -5s;
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(50px, 50px) scale(1.1);
  }
}

/* --- 导航栏 --- */
.navbar {
  .glass-effect();
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-sizing: border-box;
  z-index: 100;

  .logo {
    font-weight: 800;
    font-size: 1.5rem;
    background: linear-gradient(90deg, var(--accent-color), #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .desktop-nav {
    display: flex;
    gap: 20px;

    a {
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 500;
      position: relative;

      /* 下划线动画 */
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 0;
        background: var(--accent-color);
        transition: width 0.3s;
      }
      &:hover::after {
        width: 100%;
      }
    }

    /* 移动端隐藏桌面导航 */
    .mobile({ display: none; });
  }

  .actions {
    display: flex;
    gap: 15px;

    button {
      background: transparent;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .menu-btn {
      display: none;
      .mobile({ display: block; color: var(--text-primary); });
    }
  }
}

/* --- 移动端 Drawer --- */
.mobile-drawer {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  background: var(--bg-secondary);
  padding: 20px;
  transform: translateY(-150%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px solid var(--glass-border);

  &.open {
    transform: translateY(0);
  }

  a {
    text-decoration: none;
    color: var(--text-primary);
    font-size: 1.1rem;
    padding: 10px;
    border-radius: 8px;
    &:active {
      background: var(--accent-color);
      color: white;
    }
  }
}

/* --- 主内容 --- */
.main-content {
  padding: 100px 2rem 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .category-section {
    margin-bottom: 40px;
    scroll-margin-top: 80px; /* 锚点定位偏移 */
  }

  .section-title {
    font-size: 1.6rem;
    margin-bottom: 20px;
    span {
      color: var(--accent-color);
    }
  }

  /* 响应式 Grid 布局 */
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 默认4列 */
    gap: 25px;
    transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    } /* 手机单列 */
    .grid-item {
      transition: all 0.3s ease;
    }
  }
}
.grid-layout.resizing .grid-item {
  transform: scale(0.95);
  opacity: 0.8;
}

.footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
