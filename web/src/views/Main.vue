<template>
  <div>
    <div class="topbar bg-black px-3 py-2 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary" type="button">立即下载</button>
    </div>
    <div class="bg-primary pt-3 py-2">
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item active">
          <router-link to="/" tag="div" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" tag="div" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" tag="div" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
