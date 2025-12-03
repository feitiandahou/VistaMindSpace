<script setup lang="ts"></script>

<template>
  <div class="test-less-class">如果看到粉色大字，说明 Less 生效了！</div>
  <router-view></router-view>
</template>

<style lang="less">
@import './assets/websitehubstyles/test.less';
</style>
