<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <preload-image :imgUrlArr="imgList" @imgAllLoaded="fn"  :bgColor="bgColor" :animationShow="true" :tipStr="tipStr">
    </preload-image>
  </div>
</template>

<script>
import Vue from 'vue'
import arrList from './assets/js/imgList.js'
import preloadImage from '../dist/preloadImage.js'
Vue.use(preloadImage)
// import preloadImage from './plugin/img-pre-loading'
export default {
  name: 'App',
  // components: {
  //   preloadImage
  // },
  data () {
    return {
      imgList: [],
      bgColor: { backgroundColor: '#000', color: '#fff' },
      tipStr: '加载中...'
    }
  },
  created () {
    this.imgList = arrList
  },
  methods: {
    fn () {}
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  .imgs-container {
    background: #000;
    img {
      width: 25%;
    }
  }
  &.is-mobile {
    .imgs-container {
      img {
        width: 50%;
      }
    }
  }
}
</style>
