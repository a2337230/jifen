<template>
  <div class="int-view">
    <!-- 前三甲 -->
    <div class="int-container" v-if="Count">
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
              <span>{{ listTop[1].CoinCount }}</span>
              <p><img src="./../../common/images/jifen.png" alt="">积分</p>
            </div>
          </div>
        </li>
        <li>
          <!-- 图标 -->
          <img src="./../../common/images/one.png" alt="2" class="icon">
          <div class="top-item-container">
            <div class="avatar">
              <img :src="'https://img.xlxt.net/' + listTop[0].HeadImg" alt="">
            </div>
            <p class="int-name">{{ listTop[0].Name }}</p>
            <div class="integral">
              <span>{{ listTop[0].CoinCount }}</span>
              <p><img src="./../../common/images/jifen.png" alt="">积分</p>
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
              <span>{{ listTop[2].CoinCount }}</span>
              <p><img src="./../../common/images/jifen.png" alt="">积分</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- 其余排名 -->
      <scroll v-if="listOther.length" class="list-content" @scrollToEnd="getData" :data="listOther">
        <ul class="int-list" :class="{listHeight: myAink.appUser}">
          <li v-for="(item, index) in listOther" :key="item.AppUserID">
            <span class="int-count">{{index + 4}}</span>
            <div class="avatar">
              <img :src="'https://img.xlxt.net/' + item.HeadImg" alt="">
            </div>
            <p class="int-name">{{item.Name}}</p>
            <span class="int-num">{{item.CoinCount}}积分</span>
          </li>
        </ul>
      </scroll>
    </div>
    
    <!-- 暂无数据 -->
    <p class="no-data" v-if="!Count">暂无数据</p>
     <!-- 个人排行 -->
     <ul class="my-rank" v-if="myAink.appUser">
       <li>
          <span class="int-count">{{myAink.rankingNum}}</span>
          <div class="avatar">
            <img :src="'https://img.xlxt.net/' + myAink.appUser.HeadImg" alt="">
          </div>
          <p class="int-name">{{myAink.appUser.Name}}</p>
          <span class="int-num">{{myAink.appUser.CoinCount}}积分</span>
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
    }
  },
  methods: {
    getData () {
      this.$emit('getData')
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
  min-width: 100vw;
  padding-top: .2rem;
  position: relative;
  .top-three {
    padding: .65rem .3rem;
    display: flex;
    justify-content: space-between;
    li {
      width: 2.1rem;
      height: 3rem;
      padding-top: .05rem;
      box-shadow:0px 4px 50px 0px rgba(0,0,0,0.06);
      border-radius: .2rem;
      background-color: #C7C7C7;
      position: relative;
      margin-top: .5rem;
      &:nth-of-type(2) {
        margin-top: 0;
        height: 3.5rem;
        background-color:#D5A963;
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
          margin: .1rem 0;
          font-size: .3rem;
          color: #333;
        }
        .integral {
          text-align: center;
          display: flex;
          flex-direction: column;
          span {
            font-size: .4rem;
            font-family: '楷体';
            margin-bottom: .1rem;
          }
          p {
            font-size: .2rem;
            color: #848484;
            img {
              width: .2rem;
              height: .22rem;
              margin-right: .1rem;
              vertical-align: middle;
              position: relative;
              top: -0.01rem;
            }
          }
        }
      }
      
    }
  }
  .int-list, .my-rank {
    padding: .68rem .3rem 0;
    // margin-top: .68rem;
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
        width: 3rem;
        font-size: .3rem;
        color: #333;
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
  .no-data {
    position: absolute;
    left: 0;
    top: 2rem;
    width: 100vw;
    text-align: center;
    color: #999;
  }
  .list-content {
    height: calc(~"100vh - 1.86rem - 4.36rem - .68rem");
    overflow: hidden;
    margin-bottom: .88rem;
    box-sizing: border-box;
  }
  .listHeight {
    padding-bottom: 1.24rem;
  }
  .my-rank {
    position: fixed;
    left: 0;
    bottom: .8rem;
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