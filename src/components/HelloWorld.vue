<template>
  <div class="integral">
    <!-- 头部 -->
    <header class="header">
      <span class="iconfont icon-fanhui1" @click="goPage"></span>
      积分排行榜
    </header>
    <!-- 选项卡 -->
    <ul class="integ-tabs">
      <li :class="{current : tabValue === index}" v-for="(item, index) in tabData" :key="item.title" @click="tabClick(index)">{{item.title}}</li>
      <div class="tab-bar"></div>
    </ul>
    <!-- 前三甲 -->
    <v-touch class="list-box" :class="{listRight: tabValue === 1}" @swipeleft="swiperleft" @swiperight="swiperight">
      <int-view :listOther="listOther" :listTop="listTop" :Count="count" @getData="getData" :myAink="myAink"></int-view>
      <int-view :listOther="listOther2" :listTop="listTop2" :Count="count2" @getData="getData" :selectKey="selectKey"></int-view>
    </v-touch>
    <div class="select-container-box">
      <select-box :depData="options" v-if="isDep" @getInt="getInt"></select-box>
    </div>
  </div>
</template>

<script>
import { GetCoinGiftRanking, GetAllDepartmentType } from '@/api/index'
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
      tabValue: 0,
      // 部门ID
      departmentID: 0,
      // 显示条数
      pageindex: 1,
      pagesize: 10,
      // 总条数
      count: 0,
      count2: 1,
      // 前三名
      listTop: [],
      listOther: [],
      listTop2: [],
      listOther2: [],
      // 部门
      options: [],
      // 部门列表显示隐藏
      isDep: false,
      // 选中部门ID
      defaultID: 0,
      // 部门排行二次点击
      oneClick: true,
      twoClick: false,
      // 上啦加载状态
      tab1: false,
      tab2: false,
      myAink: {},
      selectKey: String(new Date())
    }
  },
  mounted () {
    this._GetCoinGiftRanking()
  },
  methods: {
    swiperleft () {
      if (!this.tabValue) {
        this.tabClick(1)
      }
    },
    swiperight () {
      if (this.tabValue) {
        this.tabClick(0)
      }
    },
    goPage (e) {
      window.location.href = 'https://m2.xlxt.net/Exchange/accountcenter.html'
    },
    tabClick (index) {
      this.tabValue = index
      let tabItem = document.querySelector('.tab-bar')
      tabItem.style.left = 50 * index + 'vw'
      if (index) {
        if (!this.options.length) {
          this._GetAllDepartmentType()
        }
        
        if (this.defaultID) {
          if (this.oneClick) {
            this.isDep = false
            this.oneClick = false
          } else {
            this.isDep = !this.isDep
          }
        } else {
          if (this.options.length) {
            this.isDep = true
          }
          return
        }
      } else {
        this.isDep = false
        this.oneClick = true
      }
    },
    // 排行列表
    async _GetCoinGiftRanking () {
      let result = await GetCoinGiftRanking({
        departmentID: this.departmentID,
        isAll: 0,
        pageindex: this.pageindex,
        pagesize: this.pagesize
      })
      if (result.Code === 401) {
        return
      }
      let data = result.Data.CoinGiftRankingList
      if (this.departmentID) {
        this.listTop2 = data.splice(0,3)
        this.listOther2 = data
        this.count2 = result.Count
      } else {
        this.listTop = data.splice(0,3)
        this.listOther = data
        this.count = result.Count
        this.myAink = result.Data.CurrentRanking
      }
      if (this.departmentID) {
        this.twoClick = true
      }
      if (result.Count <= 10) {
        if (this.tabValue) {
          this.tab2 = true
        } else {
          this.tab = true
        }
      }
    },
    // 部门列表
    async _GetAllDepartmentType () {
      let result = await GetAllDepartmentType ()
      this.options = result.Data
      setTimeout(() => {
        this.isDep = true
      }, 100)
    },
    // 选择部门获取部门ID
    getInt (val) {
      this.pagesize = 10
      this.tabs2 = false
      this.defaultID = val
      this.departmentID = val
      this._GetCoinGiftRanking()
      this.isDep = false
      this.selectKey = String(new Date())
      this.oneClick = false
    },
    // 上啦加载
    async getData () {
      this.pagesize += 10
      if (this.tabValue) {
        if (this.tab2) {
          return
        }
        this.departmentID = this.defaultID
      } else {
        if (this.tab1) {
          return
        }
        this.departmentID = 0
      }
      let result = await GetCoinGiftRanking({
        departmentID: this.departmentID,
        isAll: 0,
        pageindex: this.pageindex,
        pagesize: this.pagesize
      })
      let data = result.Data.CoinGiftRankingList.splice(3)
      if (this.departmentID) {
        this.listOther2 = data
      } else {
        this.listOther = data
      }
      if (result.Count <= 10) {
        if (this.tabValue) {
          this.tab2 = true
        } else {
          this.tab1 = true
        }
      }
      if (data.length + 3 === result.Count) {
        this.tabValue ? this.tab2 = true : this.tab1 = true
      }
    }
  },
  components: {
    IntView: () => import('./components/IntView'),
    SelectBox: () => import('./components/Select')
  }
}
</script>
<style lang="less" scoped>
.select-container-box {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 1.86rem;
}
.integral {
  .header {
    height: .88rem;
    background-color: #54b2f2;
    font-size: .4rem;
    line-height: .88rem;
    color: #fff;
    text-align: center;
    position: relative;
    .iconfont {
      position: absolute;
      width: .88rem;
      height: .88rem;
      left: 0;
      font-size: .5rem;
    }
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
  .list-box {
    display: flex;
    transition: .3s;
    transform: translateX(0);
  }
  .listRight {
    transform: translateX(-100vw);
  }
}
</style>
