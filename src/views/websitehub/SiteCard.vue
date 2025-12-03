<template>
  <div class="card-container" @click="openUrl(url)">
    <div class="card-content">
      <div class="icon-box">
        <img
          :src="icon"
          alt=""
          @error="
            (e) => {
              const target = e.target as HTMLImageElement
              target.src = defaultIcon
            }
          "
        />
      </div>
      <div class="info">
        <h3>{{ title }}</h3>
        <p>{{ slogan }}</p>
      </div>
      <div class="shine"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Website } from '@/types/website'
const props = withDefaults(defineProps<Website>(), {
  description: '暂无描述',
  isPopular: false,
})
const defaultIcon = 'https://www.google.com/s2/favicons?domain=example.com'
const openUrl = (url: string) => window.open(url, '_blank')
</script>
<style lang="less" scoped>
@import '@/assets/websitehubstyles/mixins.less';

.card-container {
  perspective: 1000px; /* 开启3D空间 */
  cursor: pointer;

  .card-content {
    .glass-effect();
    position: relative;
    padding: 20px;
    border-radius: 16px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px var(--shadow-color);
      border-color: var(--accent-color);

      .shine {
        left: 100%; /* 光扫过效果 */
      }

      h3 {
        color: var(--accent-color);
      }
    }
  }

  .icon-box {
    font-size: 2rem;
    min-width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  .info {
    h3 {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
      transition: color 0.3s;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  /* 炫酷的光泽扫过动画 */
  .shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: left 0.5s;
    pointer-events: none;
  }
}
</style>
