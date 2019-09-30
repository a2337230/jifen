<template>
  <div class="select-container" v-if="depData.length">
    <!-- <div class="share"></div> -->
    <div class="select">
      <div class="select-item">
        <p :class="{itemCurrent: checkItem.includes(depData[0].CommonTypeID)}">
          <span>{{depData[0].Name}}</span>
        </p>
      </div>
      <div class="select-child" v-for="(item, index) in dataChild" :key="item.CommonTypeID">
        <div class="select-froup">
          <p :class="{itemCurrent: checkItem.includes(citem.CommonTypeID)}" v-for="citem in item.Nodes" :key="citem.CommonTypeID" @click="clickChild(citem, index, item.Nodes)">
            <span>
              {{citem.Name}}
            </span>
            <!-- <marquee v-else>
              {{citem.Name}}
            </marquee> -->
          </p>
        </div>
      </div>
      
    </div>
    <div class="share"></div>
    <div class="select-btn">
      <div class="btn-froup">
        <button @click="reset">重置</button>
        <button @click="submitData">确定</button>
      </div>
    </div>
  </div>
 
</template>

<script>
import Scroll from './scroll'
export default {
  name: 'HelloWorld',
  props: {
    depData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      dataChild: [],
      checkItem: [],
      clickTime: String(new Date())
    }
  },
  created () {
    let data = {
      Nodes: this.depData[0].Nodes
    }
    this.dataChild.push(data)
    this.checkItem.push(this.depData[0].CommonTypeID)
  },
  methods: {
    // 选中一级菜单
    clickOne () {
      let checked = this.checkItem.some(item => item === this.depData[0].CommonTypeID)
      if (checked) {
        this.dataChild = []
        this.checkItem = []
        return
      }
      this.dataChild = []
      let data = {
        Nodes: this.depData[0].Nodes
      }
      this.dataChild.push(data)
      this.checkItem.push(this.depData[0].CommonTypeID)
    },
    // 选中自己动态添加
    clickChild (val, index, Nodes) {
      let box = document.querySelector('.select')
      let left = 0
      let checked = this.checkItem.some(item => item === val.CommonTypeID)
      if (!checked) {
        if (val.Nodes.length === 0) {
          this.checkItem.splice(index + 1, 1, val.CommonTypeID)
          this.checkItem.length = index + 2
          this.dataChild = this.dataChild.slice(0, index + 1)
        } else {
          let data = {
            Nodes: val.Nodes
          }
          this.checkItem.splice(index + 1, 1, val.CommonTypeID)
          this.checkItem.length = index + 2
          this.dataChild.splice(index + 1, 1, data).slice(0, index + 2)
        }
        console.log(this.checkItem, this.dataChild)
        if (this.checkItem.length >=3) {
          if (val.Nodes.length ===0) {
            if (this.checkItem.length > 3) {
              left = this.checkItem.length * 33.3 - 100
              box.style.transform = `translateX(-${left}vw)`
            }
            return
          }
          left = (this.checkItem.length + 1) * 33.3 - 100
          box.style.transform = `translateX(-${left}vw)`
          console.log((this.checkItem.length + 1) * 33.3 - 100)
        } else {
          box.style.transform = `translateX(0vw)`
        }
      } else {
        this.checkItem = this.checkItem.slice(0, index + 1)
        this.dataChild = this.dataChild.slice(0, index + 1)
        if (this.checkItem.length < 3) {
          box.style.transform = `translateX(0vw)`
          return
        }
        left = -(this.checkItem.length - 3 + 1) * 33.3
        box.style.transform = `translateX(${left}vw)`
      }
    },
    // 重置
    reset () {
      this.dataChild = []
      this.checkItem = [] 
      let box = document.querySelector('.select')
      box.style.transform = `translateX(0vw)`
    },
    // 确定选中部门
    submitData () {
      let data = this.checkItem[this.checkItem.length - 1]
      let id = data ? data : this.depData[0].CommonTypeID
      this.$emit('getInt', id)
    }
  },
  watch: {
    dataChild () {
    }
  },
  components: {
    Scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-container {
  /* padding-top: 10px; */
  position: relative;
  width: 100vw;
  overflow-x: scroll;
  background-color: #fff;
  /* background-position: -66.6vw 0; */
}
.select {
  display: flex;
  transform: translateX(0);
  transition: .3s;
  min-width: 100vw;
  position: relative;
  z-index: 2;
  /* background-color: #fff; */
}
.select-item, .select-child {
  width: 33.3%;
  height: 6rem;
  /* background-color: #fff; */
  position: relative;
  z-index: 2;
  /* overflow: hidden; */
}
.select-child {
  border-left: 1px solid #f7f7f7;
  margin-left: -1px;
}
.select-child::last-child {
  border: 0;
}
.select-item, .select-child {
  width: 33.3vw;
  min-width: 33.3vw;
  padding: 0 .4rem;
  box-sizing: border-box;
}
.select-item p, .select-child p {
  width: 100%;
  font-size: .28rem;
  line-height: .8rem;
  color: #848484;
  text-align: center;
  position: relative;
  z-index: 999;
  overflow-x: scroll;
}
.select-item p span, .select-child p span {
  white-space: nowrap;
}
.select-child p {
  /* width: 100%; */
  /* padding-left: 20px; */
  text-align: left;
  box-sizing: border-box;
}
.itemCurrent {
  color: #2F54EB !important;
}
.select-froup {
  height: 5.6rem;
  /* overflow: hidden; */
  overflow-y: scroll;
}
.select-btn {
  position: relative;
  height: 1rem;
  background-color: #f7f7f7;
}
.select-btn .btn-froup {
  position: fixed;
  left: 33.3vw;
  top: 7.84rem;
  width: calc(66.6vw);
  display: flex;
  height: 1rem;
}
.select-btn .btn-froup button {
  width: 50%;
  text-align: center;
  background-color: #CCCCCC;
  color: #fff;
}
.select-btn .btn-froup button:nth-of-type(2) {
  background-color: #2F54EB;
}
.share {
  position: absolute;
  left: 0;
  top: 0;
  width: 33.3vw;
  height: 6rem;
  background-color: #f7f7f7;
  /* z-index: 999; */
}
/* .share::after {
  content: '';
  position: absolute;
  width: 66.66vw;
  height: 300px;
  left: 33.3vw;
  top: 0;
} */
</style>