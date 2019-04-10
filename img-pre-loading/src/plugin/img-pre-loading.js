import preImg from './img-pre-loading.vue'
let imgLoad = {}
imgLoad.install = function (Vue, options) {
  Vue.component(preImg.name, preImg)
}
export default imgLoad
