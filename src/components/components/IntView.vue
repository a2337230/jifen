<template>
  <div class="int-view">
    <!-- 前三甲 -->
    <scroll :Count="Count" :class="{listHeight: myAink.appUser}" v-if="Count" class="list-content" @scrollToEnd="getData" :data="listOther" :key="isShow">
      <div class="int-container">
        <ul class="top-three" v-if="listTop.length">
          <li v-if="listTop.length >= 2">
            <!-- 图标 -->
            <img src="./../../common/images/two.png" alt="2" class="icon">
            <div class="top-item-container">
              <div class="avatar">
                <img :src="'https://img.xlxt.net/' + listTop[1].HeadImg" alt="">
              </div>
              <p class="int-name">{{ listTop[1].Name }}</p>
              <div class="integral">
                <span>{{ listTop[1].XLCoin.toFixed(2) | coinFormat }}</span>
                <!-- <p><img src="./../../common/images/jifen.png" alt="">积分</p> -->
              </div>
            </div>
          </li>
          <li :class="{isOne: listTop.length === 1}">
            <!-- 图标 -->
            <img src="./../../common/images/one.png" alt="2" class="icon">
            <div class="top-item-container">
              <div class="avatar">
                <img :src="'https://img.xlxt.net/' + listTop[0].HeadImg" alt="">
              </div>
              <p class="int-name">{{ listTop[0].Name }}</p>
              <div class="integral">
                <span>{{ listTop[0].XLCoin.toFixed(2)| coinFormat }}</span>
                <!-- <p><img src="./../../common/images/jifen.png" alt="">积分</p> -->
              </div>
            </div>
          </li>
          <li v-if="listTop.length === 3">
            <!-- 图标 -->
            <img src="./../../common/images/three.png" alt="2" class="icon">
            <div class="top-item-container">
              <div class="avatar">
                <img :src="'https://img.xlxt.net/' + listTop[2].HeadImg" alt="">
              </div>
              <p class="int-name">{{ listTop[2].Name }}</p>
              <div class="integral">
                <span>{{ listTop[2].XLCoin.toFixed(2) | coinFormat }}</span>
                <!-- <p><img src="./../../common/images/jifen.png" alt="">积分</p> -->
              </div>
            </div>
          </li>
        </ul>
        <!-- 其余排名 -->
          <ul class="int-list">
            <li v-for="(item, index) in listOther" :key="item.AppUserID">
              <span class="int-count">{{index + 4}}</span>
              <div class="avatar">
                <img :src="'https://img.xlxt.net/' + item.HeadImg" alt="">
              </div>
              <p class="int-name">{{item.Name}}</p>
              <span class="int-num">{{item.XLCoin.toFixed(2)}}</span>
            </li>
          </ul>
      </div>
    </scroll>
    
    <!-- 暂无数据 -->
    <div class="no-data" v-if="noList">
      <img src="./../../common/images/nomore.png" alt="">
      <p>您暂时还没有加入{{noTitle}}</p>
      <p>赶快加入{{noTitle}}与大家一决高下吧</p>
    </div>
    <!-- <p class="no-data" v-if="!Count">暂无数据</p> -->
     <!-- 个人排行 -->
     <ul class="my-rank" v-if="myAink.appUser">
       <li>
          <span class="int-count">{{myAink.rankingNum}}</span>
          <div class="avatar">
            <img :src="'https://img.xlxt.net/' + myAink.appUser.HeadImg" alt="">
          </div>
          <p class="int-name">{{myAink.appUser.Name}}</p>
          <span class="int-num">{{myAink.appUser.XLCoin.toFixed(2)}}</span>
        </li>
     </ul>
  </div>
</template>
<script>
import Scroll from './scroll'
import countTo from 'vue-count-to'
export default {
  name: 'IntView',
  props: {
    listTop: {
      type: Array,
      default: () => { return [] }
    },
    listOther: {
      type: Array,
      default: () => { return [] }
    },
    Count: {
      type: Number,
      default: 0
    },
    myAink: {
      type: Object,
      default: () => { return {} }
    },
    selectKey: {
      type: String,
      default: ''
    },
    noTitle: {
      type: String,
      default: '公司'
    },
    noList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: String(new Date())
    }
  },
  methods: {
    getData () {
      this.$emit('getData')
    }
  },
  filters: {
    coinFormat (val) {
      if (val > 1000000) {
        return parseInt(val/10000) + '万+'
      }
      return val
    }
  },
  watch: {
    listTop (val) {
      console.log(val)
    },
    Count (val) {
      console.log(val)
    }
  },
  components: {
    countTo,
    Scroll
  }
}
</script>
<style lang="less" scoped>
.int-view {
  width: 100vw;
  // height: calc(~"100vh - 1.76rem");
  height: 100%;
  min-width: 100vw;
  position: relative;
  .top-three {
    padding: .3rem .3rem 0;
    position: relative;
    height: 3.5rem;
    margin-bottom: .65rem;
    li {
      width: 2.1rem;
      height: 2.7rem;
      padding-top: .05rem;
      box-shadow:0px 4px 50px 0px rgba(0,0,0,0.06);
      border-radius: .2rem;
      background-color: #C7C7C7;
      // position: relative;
      margin-top: .5rem;
      position: absolute;
      bottom: 0;
      &:active {
        animation: intClick .2s;
      }
      
      @keyframes intClick {
        0% {
          height: 2.9rem;
        }
        100% {
          height: 3rem;
        }
      }
      @keyframes intClick2 {
        0% {
          height: 3.3rem;
        }
        100% {
          height: 3.5rem;
        }
      }
      &:nth-of-type(2){
        margin-top: 0;
        height: 3.2rem;
        background-color:#D5A963;
        left: 2.7rem;
        &:active {
          animation: intClick2 .2s;
        }
        .top-item-container {
          .avatar {
            width: 1rem;
            height: 1rem;
          }
          .int-name {
            margin: .2rem;
          }
          .integral span {
            margin-bottom: .16rem;
          }
        }
      }
      &:nth-of-type(3) {
        left: 5.1rem;
        background-color:#E69064;
      }
      .icon {
        position: absolute;
        width: .4rem;
        height: .4rem;
        left: 50%;
        top: -.2rem;
        margin-left: -.2rem;
      }
      &:nth-of-type(2) .icon {
        width: .60rem;
        height: .62rem;
        top: -.34rem;
        margin-left: -.3rem;
      }
      .top-item-container {
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-items: center;
        flex-direction: column;
        border-radius: .2rem;
        .avatar {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          margin: .4rem auto 0;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .int-name {
          text-align: center;
          margin: .1rem 0.3rem;
          font-size: .3rem;
          color: #333;
          height: .42rem;
          overflow: hidden;
          // overflow: hidden;
          // text-overflow: clip;
          // white-space: nowrap;
        }
        .integral {
          text-align: center;
          display: flex;
          flex-direction: column;
          span {
            font-size: .34rem;
            // font-family: '楷体';
            margin-bottom: .1rem;
          }
          p {
            font-size: .2rem;
            color: red;
            img {
              width: .2rem;
              height: .22rem;
              margin-right: .1rem;
              vertical-align: middle;
              position: relative;
              top: -0.04rem;
            }
          }
        }
      }
      
    }
    .isOne {
      margin-top: 0;
      height: 3.5rem;
      background-color:#D5A963;
      left: 2.7rem;
      &:active {
        animation: intClick2 .2s;
      }
    }
  }
  .int-list, .my-rank {
    // position: fixed;
    padding: 0 .3rem .5rem;
    // margin-top: .68rem;
    // position: fixed;
    // bottom: 0;
    li {
      // background-color: #000;
      height: .8rem;
      margin-bottom: .4rem;
      display: flex;
      align-items: center;
      position: relative;
      .int-count {
        width: .56rem;
        text-align: left;
        font-size: .26rem;
        color: #848484;
      }
      .avatar {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        margin-right: .3rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .int-name {
        width: 3.5rem;
        // width: calc(~"100vw - .56rem");
        font-size: .3rem;
        height: .4rem;
        color: #333;
        overflow: hidden;
        text-overflow: clip;
        // white-space: nowrap;
      }
      .int-num {
        position: absolute;
        right: 0;
        font-size: .26rem;
        line-height: .8rem;
        color: #848484;
      }
    }
  }
  .my-rank {
    position: fixed;
    bottom: 0;
  }
  // .no-data {
  //   position: absolute;
  //   left: 0;
  //   top: 2rem;
  //   width: 100vw;
  //   text-align: center;
  //   color: #999;
  // }
  .no-data {
    position: absolute;
    top: 2rem;
    width: 100vw;
    // height: 3rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
    }
    p {
      color: #999;
      font-size: .3rem;
      line-height: .6rem;
    }
  }
  .list-content {
    height: calc(~"100% - 1.24rem");
    overflow: hidden;
    // margin-bottom: .2rem;
    box-sizing: border-box;
    // overflow-y: scroll;
  }
  // .listHeight {
  //   height: calc(~"100vh - 1.86rem - 4.36rem - .68rem - 1.1rem");
  // }
  .my-rank {
    // position: fixed;
    // left: 0;
    // bottom: -.5rem;
    width: 100vw;
    height: 1.24rem;
    background-color: #f6f6f6;
    z-index: 999;
    padding: .2rem .3rem 0;
    box-sizing: border-box;
    // display: flex;
    // align-items: center;
    // li {
    //   margin-bottom: 0;
    //   position: relative;
    //   .int-num {
    //     position: absolute;
    //     right: 0;
    //   }
    // }
  }
}
</style>