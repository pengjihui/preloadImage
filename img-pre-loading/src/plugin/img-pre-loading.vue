<style lang="scss">
.vue-preload-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  text-align: center;
  .progress {
    display: table-cell;
    vertical-align: middle;
    p {
      margin: 0;
    }
    .tip-str {
      margin-top: 0.4em;
    }
    .loadingAnimation {
      width: 60px;
      height: 60px;
      background-color: #67cf22;
      margin: 0 auto;
      -webkit-animation: rotateplane 1.2s infinite ease-in-out;
      animation: rotateplane 1.2s infinite ease-in-out;
    }
    @keyframes rotateplane {
      0% {
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      }
      50% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      }
      100% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
    }
  }
}
</style>
<template>
  <div class="vue-preload-image" :style="bgColor">
    <div class="progress">
      <slot></slot>
      <div class="loadingAnimation" v-if="animationShow">
        <div class="loadingAnimation"></div>
      </div>
      <p class="tip-str" v-if="tipStrShow">{{tipStr}}<span class="progress-str" v-if="progressShow">{{progressStr}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preload-image',
  props: {
    // 需要预加载的图片url组成的数组
    imgUrlArr: {
      type: Array,
      required: true
    },
    bgColor: {},
    // 控制显示
    animationShow: {
      // 控制加载动画的显示
      type: Boolean,
      default: true
    },
    tipStrShow: {
      // 控制文字提示信息的显示
      type: Boolean,
      default: true
    },
    progressShow: {
      // 控制图片加载进程文字的显示
      type: Boolean,
      default: true
    },
    progressType: {
      // 图片加载进程文字的类型
      type: String,
      default: 'percent' // 'percent' 百分比类型 | 'count' 加载图片数量类型
    },
    order: {
      // 图片有序加载的
      type: Boolean,
      default: true
    },
    tipStr: {
      // 图片预加载中的提示语内容
      type: String,
      default: '加载中...'
    }
  },
  data () {
    return {
      msg: 'this is from vue-preload-image.vue',
      show: true,
      progressStr: '',
      imgsSum: NaN,
      loadedCount: 0
    }
  },
  methods: {
    init () {
      // 根据传入的参数初始化
      this.imgsSum = this.imgUrlArr.length
      this.progressStr =
        this.progressType === 'percent' ? '0%' : '0/' + this.imgsSum
    },
    unorderedPreload () {
      // 无序加载，并发下载图片
      this.imgUrlArr.forEach((imgUrl, i) => {
        var oImg = new Image()
        oImg.addEventListener('load', this.imgLoaded)
        oImg.addEventListener('error', this.imgLoaded)
        oImg.src = imgUrl
      })
    },
    orderPreload () {
      // 有序加载，一次只有一张图片在下载
      var oImg = new Image()
      oImg.addEventListener('load', this.imgLoaded)
      oImg.addEventListener('error', this.imgLoaded)
      oImg.src = this.imgUrlArr[this.loadedCount]
    },
    imgLoaded () {
      // 每次 图片加载完成执行，无论成功或者失败
      this.loadedCount++
      this.progressStr =
        this.progressType === 'percent'
          ? parseInt(this.loadedCount * 100 / this.imgsSum) + '%'
          : this.loadedCount + '/' + this.imgsSum
      if (this.loadedCount >= this.imgsSum) {
        this.show = false
        this.$emit('imgAllLoaded')
      } else if (this.order) {
        this.orderPreload()
      }
    }
  },
  created () {
    this.init()
    this.order ? this.orderPreload() : this.unorderedPreload()
  }
}
</script>
