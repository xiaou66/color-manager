<template>
  <div>
    <a-row type="flex" justify="center">
      <a-input-search  placeholder="请输入要提取颜色的网站" style="width: 250px" @search="colorSearchHandler" v-model="searchUrl" />
    </a-row>
    <a-spin :spinning="loading">
      <a-row type="flex" justify="center" style="padding-left: 10px;" class="w-card">
     <a-col v-for="(item,index) in data" :key="index">
       <a-card :title="item.percentage" class="w-card-inner" >
         <span slot="extra">
           <a-icon type="search" @click="colorSeeHandler(item.color)"/>
           <a-icon type="copy" style="padding-left: 8px;" @click="copy(item.color)"/>
<!--           <a-icon type="plus" style="padding-left: 8px;"/>-->
         </span>
         <div class="w-box" :style="`background: ${item.color};`"></div>
       </a-card>
     </a-col>
    </a-row>
    </a-spin>
    <a-modal v-model="colorSee.visible"  :bodyStyle="{'height':'300px','padding':'0',background: colorSee.currentColor}" :footer="null" >
    </a-modal>
  </div>
</template>

<script>
import xmldom from 'xmldom'
import xpath from 'xpath'
export default {
  data () {
    return {
      resShow: false,
      loading: false,
      searchUrl: '',
      data: [],
      colorSee: {
        visible: false,
        currentColor: ''
      }
    }
  },
  methods: {
    copy (color) {
      this.$copyText(color).then(res => {
        console.log(res)
        this.$message.info(`复制成功-${res.text}`)
      })
    },
    colorSeeHandler (color) {
      this.colorSee.currentColor = color
      this.colorSee.visible = true
    },
    colorSearchHandler () {
      if (this.searchUrl) {
        this.data.length = 0
        this.loading = true
        const fromData = new FormData()
        fromData.append('url', this.searchUrl)
        fetch(`${this.$url.picker}/get-profile`, {
          method: 'POST',
          body: fromData
        }).then(res => res.text())
          .then(data => {
            const doc = new xmldom.DOMParser().parseFromString(data)
            const nodes = xpath.select("//body/section[@id='profile']/section[@class='main']/section[@id='colour-breakdown']/div[@class='grid-wrapper']/div", doc)
            nodes.forEach(node => {
              /background-color:(.*?);/.test(node.toString())
              const color = RegExp.$1;
              />(.*?)<.span>/.test(node.toString())
              const percentage = RegExp.$1
              this.data.push({ color, percentage })
              this.loading = false
            })
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .w-card {
    min-height: 60vh;
  }
  .w-card-inner {
    margin-right: 15px;
    margin-top: 5px;
    .w-box {
      width: 128px;
      height: 128px;
      border-radius: 50%;
      padding-right: 10px;
      margin: 0 auto;
    }
  }
</style>
