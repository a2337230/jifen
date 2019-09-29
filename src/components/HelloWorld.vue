<template>
  <div class="integral">
    <!-- 头部 -->
    <header class="header">
      <span></span>
      积分排行榜
    </header>
    <!-- 选项卡 -->
    <ul class="integ-tabs">
      <li :class="{current : tabValue === index}" v-for="(item, index) in tabData" :key="item.title" @click="tabClick(index)">{{item.title}}</li>
      <div class="tab-bar"></div>
    </ul>
    <!-- 前三甲 -->
    <div class="top-three">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'integral',
  data () {
    return {
      // 选项卡列表
      tabData: [
        {
          title: '公司排行',
          index: 0
        },
        {
          title: '部门排行',
          index: 1
        }
      ],
      // 选中项
      tabValue: 0
    }
  },
  methods: {
    tabClick (index) {
      this.tabValue = index
      let tabItem = document.querySelector('.tab-bar')
      tabItem.style.left = 50 * index + 'vw'
    }
  },
}
</script>
<style lang="less" scoped>
.integral {
  .header {
    height: .88rem;
    background-color: #54b2f2;
    font-size: .4rem;
    line-height: .88rem;
    color: #fff;
    text-align: center;
    position: relative;
  }
  .integ-tabs {
    display: flex;
    height: .88rem;
    box-shadow:0 .02rem .1rem 0 rgba(0,0,0,0.06);
    position: relative;
    li {
      width: 50vw;
      text-align: center;
      line-height: .88rem;
      font-size: .3rem;
      color: #333;
      // font-weight: bold;
    }
    .current {
      color: #2F54ED;
    }
    .tab-bar {
      position: absolute;
      bottom: .1rem;
      left: 0;
      width: 50vw;
      height: .06rem;
      display: flex;
      justify-content: center;
      transition: .2s;
      &:after {
        content: '';
        display: block;
        width: .6rem;
        height: 100%;
        background-color: #2F54ED;
        border-radius: .3rem;
      }
      // background-color: #2F54ED;
    }
  }
}
</style>
