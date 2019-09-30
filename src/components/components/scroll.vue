<template>
  <div ref="wrapper" class="scroll-wrap">
    <div>
      <slot></slot>

      <!-- <div v-if="pullup" class="pullup">
        <div class="clear" v-if="!isDone">
          <div class="fl"><img width="30" src="./../../common/images/loading.gif"></div>
          <div class="fl lh30 ml10">加载中.....</div>
        </div>
        <div class="list-donetip" v-if="!isLoading && isDone">
          <slot name="doneTip">只显示这么多啦~</slot>
        </div>
      </div>
      <div v-else class="nomore">{{noMore==true?'':'暂无更多~'}}</div> -->
      <div class="pull-load" v-show="isLoading">
        <img src="./../../common/images/loading.gif" alt="">
        正在加载...
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
import { debug } from 'util';
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1,
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: true
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      /**
       * 是否开启横向滚动
       */
      scrollX:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    data(){
      return {
        isLoading: false,
        isDone: false,
        isload: 0
      }
    },

    updated(){
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX:this.scrollX,
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              //所有数据加载完毕后
              this.$on('infinitescroll.loadedDone', () => {
                this.isLoading = false;
                this.isDone = true;
              });
              //单次请求数据加载完毕后
              this.$on('infinitescroll.finishLoad', (ret) => {
                this.isLoading = false;
              });
              //重新初始化
              this.$on('infinitescroll.reInit', () => {
                this.isLoading = false;
                this.isDone = false;
              });
              this.isload++
              this.$emit('scrollToEnd')
            }
          })
        } else {
          this.isLoading = false;
          this.isDone = true;
        }

        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      resetParams(){
        setTimeout(() => {
          this.isLoading = false;
          this.isDone = false;
        },600)
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      noMore (val) {
        if (val) {
          this.isDone = true
          this.noMore = true
        } else {
          this.isDone = false
          this.pullup = false
        }
      }
    }
  }
</script>

<style scoped lang="less">
.scroll-wrap {
  padding-bottom: .5rem
}
.pull-load {
  height: .5rem;
  display: flex;
  justify-content: center;
  color: #999;
  img {
    width: .45rem;
    height: .45rem;
    margin-right: .2rem;
  }
}
</style>

