<template>
  <div class="about-banner__container">
    <img class="about-banner__stadium" :src="require('~imageRoot/components/pages/about/bg_banner.png')">
    <div class="container">
      <h3 class="about-banner__hdg">
        <span>Trung tâm</span> thông tin
      </h3>
      <p class="about-banner__img"><img :src="require('~imageRoot/components/pages/about/computer.png')" alt="Computer"></p>
      <p class="about-banner__model"><img :src="require('~imageRoot/components/pages/about/hlv.png')" alt="hlv"></p>
      <p class="about-banner__alex"><img :src="require('~imageRoot/components/pages/about/alex.png')" alt="alex"></p>
    </div>
  </div>
</template>
<style lang="scss" src="~scssAsset/info/about-banner.scss">
</style>
