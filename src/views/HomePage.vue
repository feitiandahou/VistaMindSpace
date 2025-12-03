<template>
  <div class="homepage">
    <nav class="navbar">
      <ul class="nav-ul">
        <li class="nav-li">
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/website">Websites</router-link>
        </li>
        <li>
          <router-link to="/prompt">Prompt Words</router-link>
        </li>
        <li>
          <router-link to="/personal">Personal Center</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@primary-color: #4a90e2;
.navbar {
  width: 100vw;
  height: 3vw;
  background-color: @primary-color;
  .nav-ul {
    width: 60vw;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    li {
      font-size: 1.5vw;
      color: #fff;
    }
  }
}
</style>
