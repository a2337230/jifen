<template>
  <div class="integral">
    <!-- 头部 -->
    <header class="header">
      <span class="iconfont icon-fanhui1" @click="goPage"></span>
      杏林币排行榜
    </header> 
    <!-- 选项卡 -->
    <ul class="integ-tabs">
      <li :class="{current : tabValue === index}" v-for="(item, index) in tabData" :key="item.title" @click="tabClick(index)">{{item.title}}</li>
      <div class="tab-bar"></div>
    </ul>
    <!-- 前三甲 -->
    <v-touch class="list-box" :class="{listRight: tabValue === 1}" @swipeleft="swiperleft" @swiperight="swiperight">
      <int-view :listOther="listOther" :listTop="listTop" :Count="count1" @getData="getData" :myAink="myAink1" :noList="noList1"></int-view>
      <int-view :listOther="listOther2" :listTop="listTop2" :Count="count" @getData="getData" :myAink="myAink" :noList="noList2" :noTitle="'部门'"></int-view>
    </v-touch>
  </div>
</template>

<script>
import IntView from './components/IntView'
import { GetCoinGiftRanking, GetAllDepartmentType, GetXLCoinRanking } from '@/api/index'
export default {
  name: 'integral',
  data () {
    return {
      // 选项卡列表
      tabData: [
        {
          title: '公司排名',
          index: 0
        },
        {
          title: '部门排名',
          index: 1
        }
      ],
      // 选中项
      tabValue: 0,
      // 部门ID
      departmentID: 0,
      // 显示条数
      pageindex: 1,
      pageindex1: 1,
      pagesize: 10,
      pagesize1: 10,
      isEnterprise: true,
      // 总条数
      count: 0,
      count1: 0,
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
      myAink1: {},
      tab: 0,
      selectKey: String(new Date())
    }
  },
  mounted () {
    let integral = document.documentElement.clientHeight
    // 头部可视高度
    let header = document.querySelector('.header').clientHeight
    // 选项卡可视高度
    let tab = document.querySelector('.integ-tabs').clientHeight
    let h = integral - header - tab
    let list = document.querySelector('.list-box')
    console.log(integral, header, tab)
    list.style.height = h + 'px'
    // let view = document.querySelectorAll('.int-view')
    // let content = document.querySelectorAll('.list-content')
    // let myRank = document.querySelector('.my-rank').clientHeight
    // view.forEach(item => {
    //   item.style.height = h + 'px'
    // })
    // content.forEach(item => {
    //   item.style.height = h - myRank + 'px'
    // })
    // this.isShow = String(new Date())
    // alert(h)
    this._GetXLCoinRanking1()
    // this._GetXLCoinRanking()
  },
  methods: {
    swiperleft () {
      if (!this.tabValue) {
        console.log(this.tabValue)
        this.tabClick(1)
      }
    },
    swiperight () {
      if (this.tabValue) {
        console.log(this.tabValue)
        this.tabClick(0)
      }
    },
    goPage (e) {
      window.location.href = 'https://m2.xlxt.net/Exchange/accountcenter.html'
    },
    tabClick (index) {
      this.tab = index
      index === 0 ? this.isEnterprise = true : this.isEnterprise = false
      // this.listTop2 = []
      // this.listOther2 = []
      this.pagesize = 10
      this.tabValue = index
      let tabItem = document.querySelector('.tab-bar')
      tabItem.style.left = 50 * index + 'vw'
      if (!index) {
        if (this.listTop.length) {
          return
        }
        this._GetXLCoinRanking1()
      } else {
        // console.log(this.listTop2)
        if (this.listTop2.length) {
          return
        }
        this._GetXLCoinRanking()
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
    async _GetXLCoinRanking () {
      let result = await GetXLCoinRanking ({
        departmentID: 0,
        isAll: 0,
        pagesize: this.pagesize,
        pageindex: this.pageindex,
        isEnterprise: false
      })
      if (result.Data) {
        let data = result.Data.XLCoinRankingList
        this.listTop2 = data.splice(0,3)
        this.listOther2 = data
        this.count = result.Count
        if (!this.count) {
          this.noList2 = true
        }
        this.myAink = result.Data.CurrentRanking
      }
    },
    async _GetXLCoinRanking1 () {
      let result = await GetXLCoinRanking ({
        departmentID: 0,
        isAll: 0,
        pagesize: this.pagesize1,
        pageindex: this.pageindex1,
        isEnterprise: this.isEnterprise
      })
      if (result.Data) {
        let data = result.Data.XLCoinRankingList
        this.listTop = data.splice(0,3)
        this.listOther = data
        this.count1 = result.Count
        if (!this.count1) {
          this.noList1 = true
        }
        this.myAink1 = result.Data.CurrentRanking
      }
    },
    // 上啦加载
    async getData () {
      let result = ''
      if (this.tab) {
        this.pagesize+=20
        result = await GetXLCoinRanking ({
          departmentID: 0,
          isAll: 0,
          pagesize: this.pagesize,
          pageindex: this.pageindex,
          isEnterprise: this.isEnterprise
        })
        let data = result.Data.XLCoinRankingList.splice(3)
        this.listOther2 = data
        this.count = result.Count
      } else {
        this.pagesize1+=20
        result = await GetXLCoinRanking ({
          departmentID: 0,
          isAll: 0,
          pagesize: this.pagesize1,
          pageindex: this.pageindex1,
          isEnterprise: this.isEnterprise
        })
        let data = result.Data.XLCoinRankingList.splice(3)
        this.listOther = data
        this.count1 = result.Count
      }
      
    }
  },
  components: {
    IntView
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
    // height: 100vh;
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
