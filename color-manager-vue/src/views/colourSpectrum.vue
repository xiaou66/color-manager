<template>
  <div >
    <a-row type="flex" justify="center">
      <a-input-search placeholder="请输入要搜索的颜色" style="width: 200px" @search="colorSearchHandler" v-model="searchWord" />
    </a-row>
    <a-row type="flex" justify="center">
      <a-col v-for="(item, index) in showData" :key="index">
        <a-card :title="item.name" class="w-card-inner" :headStyle="{'background': `rgb(${item.RGB[0]},${item.RGB[1]},${item.RGB[2]})`}">
          <span  slot="extra">
            <a-icon type="search" @click="colorSeeHandler(item.hex)" />
            <a-icon type="copy" style="padding-left: 8px;" @click="copy(`rgb(${item.RGB[0]},${item.RGB[1]},${item.RGB[2]})`)"/>
            <a-icon style="padding-left: 8px;" type="plus" @click="colorAddHandler(item)"/>
          </span>
          <div class="user">
            <a-tooltip>
              <template slot="title">
                贡献者
              </template>
              <a-avatar shape="square" :size="24" icon="user"/>
            </a-tooltip>
            <span>中国颜色</span>
          </div>
          <div class="w-text" @click="copy(`rgb(${item.RGB[0]},${item.RGB[1]},${item.RGB[2]})`)">rgb:{{`${item.RGB[0]},${item.RGB[1]},${item.RGB[2]}`}}</div>
          <div class="w-text" @click="copy(item.hex)">hex:{{item.hex}} <span></span> <a-icon type="copy" style="padding-left: 8px;" @click="copy(item.hex)"/></div>
          <div class="w-text">CMYK:{{`${item.CMYK[0]},${item.CMYK[1]},${item.CMYK[2]},${item.CMYK[3]}`}}<span></span></div>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" style="padding-top: 10px;padding-left: 20px;">
      <a-button type="primary" @click="prePage">上一页</a-button>
      <span style="width: 50px;font-size: 16px;line-height: 32px;text-align: center">{{currentPage + 1}}</span>
      <a-button type="primary" @click="nextPage">下一页</a-button>
    </a-row>
    <!-- 颜色预览 -->
    <a-modal v-model="colorSee.visible" :bodyStyle="{'background':`${colorSee.currentColor}`,'height':'300px'}" :footer="null">
    </a-modal>
    <!-- 添加框 -->
    <a-drawer
      title="添加颜色"
      :maskClosable = "true"
      @close="colorAddClose"
      placement="right"
      :visible="colorAdd.visible"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
import colorData from '../color/zhongguose.json'
export default {
  name: 'colourSpectrum',
  data () {
    return {
      searchWord: '',
      listData: [],
      showData: [],
      currentPage: 0,
      colorSee: {
        visible: false,
        currentColor: ''
      },
      colorAdd: {
        visible: false,
        currentColor: ''
      }
    }
  },
  created () {
    this.listData = colorData
    this.showData = this.listData.slice(0, 51)
  },
  mounted () {

  },
  methods: {
    copy (color) {
      this.$copyText(color).then(res => {
        console.log(res)
        this.$message.info(`复制成功-${res.text}`)
      })
    },
    prePage () {
      if (this.currentPage === 0) {
        this.$message.warning('前面没有了')
        return
      }
      const pre = this.currentPage - 1
      this.showData = this.listData.slice(pre * 50, pre * 50 + 51)
      this.currentPage = pre
      window.scroll(0, 0)
    },
    nextPage () {
      const next = this.currentPage + 1
      console.log(next * 50 + 1)
      console.log(next * 50 + 52)
      const data = this.listData.slice(next * 50 + 1, next * 50 + 52)
      console.log(data)
      if (data.length === 0) {
        this.$message.warning('没有更多了')
      } else {
        this.showData = data
        this.currentPage = next
        window.scroll(0, 0)
      }
    },
    colorSearchHandler () {
      this.showData = this.listData.filter(item => item.name.includes(this.searchWord))
    },
    colorAddClose () {
      this.colorAdd.visible = false
    },
    colorAddHandler (item) {
      this.colorAdd.visible = true
    },
    colorSeeHandler (color) {
      this.colorSee.currentColor = color
      this.colorSee.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.w-card-inner {
  width: 176px;
  margin-right: 15px;
  margin-top: 5px;
  .w-text {
    font-size: 16px;
    line-height: 38px;
  }
  .user {
    padding-bottom: 10px;
    border-bottom: #ccc dashed 1px;
    span:last-child {
      padding-left: 8px;
    }
  }
}
.tip {
  background: #fff;
}
</style>
