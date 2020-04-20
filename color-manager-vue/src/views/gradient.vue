<template>
  <div id="gradient">
    <a-row type="flex" justify="center" >
      <a-select defaultValue="all" style="width: 70%;margin-bottom: 10px;"  @change="dbGetData()" v-model="select.value">
        <a-select-option :value="item.key" v-for="(item, index) in select.data" :key="index">{{item.value}}</a-select-option>
      </a-select>
    </a-row>
    <a-row type="flex" justify="center" >
      <a-col v-for="(item, index) in data" :key="index">
        <a-card :title="item.type" class="w-card-inner">
          <span  slot="extra">
              <a-icon type="search" @click="colorSeeHandler(item.style)" />
              <a-icon type="copy" style="padding-left: 8px;" @click="copy(item.style)"/>
<!--              <a-icon style="padding-left: 8px;" type="plus" />-->
          </span>
          <div class="w_box"  :style="item.style" ></div>
        </a-card>
      </a-col>
    </a-row>
    <div id="pagination">
      <a-pagination :defaultPageSize="51" :total="total" @change="dbGetData"/>
    </div>
    <a-modal v-model="colorSee.visible"  :bodyStyle="{'height':'300px','padding':'0'}" :footer="null" >
      <div :style="`${colorSee.currentColor}height:100%`" @click="copy(colorSee.currentColor)"></div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'gradient',
  data () {
    return {
      select: {
        value: 'all',
        data: [
          { key: 'all', value: '所有' },
          { key: 'top', value: '推荐' },
          { key: 'blue', value: '蓝色' },
          { key: 'cyan', value: '青色' },
          { key: 'gray', value: '灰色' },
          { key: 'green', value: '绿色' },
          { key: 'orange', value: '出色' },
          { key: 'purple', value: '紫色' },
          { key: 'red', value: '红色' },
          { key: 'skyBlue', value: '天蓝色' },
          { key: 'yellow', value: '红色' }
        ]
      },
      data: [],
      total: 0,
      page: 0,
      colorSee: {
        visible: false,
        currentColor: ''
      }
    }
  },
  created () {
    console.log(this.$url.zju)
    if (this.$store.state.db) {
      this.dbLoad()
    } else {
      fetch(`${this.$url.zju}/box/-31561538`).then(res => res.json())
        .then(data => {
          this.data = data
        })
    }
  },
  methods: {
    dbGetData (page = 1) {
      console.log(page)
      page -= 1
      let condition = ''
      if (this.select.value !== 'all') {
        condition = ' where `type` = ' + `'${this.select.value}'`
        console.log('SELECT COUNT() FROM gradient_shapefactory ' + condition)
        const totalRes = this.$store.state.db.exec('SELECT COUNT() FROM gradient_shapefactory ' + condition)
        this.total = parseInt(totalRes[0].values[0][0])
      }
      const result = this.$store.state.db.exec('SELECT `type`, `style` FROM gradient_shapefactory ' + condition + ' LIMIT ' + page * 51 + ',51')
      const items = result[0].values
      console.log(result)
      if (items.length === 0) {
        return
      }
      const data = []
      items.forEach((item, index) => {
        data.push({ type: item[0], style: item[1] })
      })
      this.data.length = 0
      this.data = data
    },
    dbLoad () {
      const totalRes = this.$store.state.db.exec('SELECT COUNT() FROM gradient_shapefactory ')
      console.log(totalRes[0].values[0][0])
      this.total = parseInt(totalRes[0].values[0][0])
      this.dbGetData(1)
    },
    copy (color) {
      color = this.colorHandler(color)
      this.$copyText(color).then(res => {
        console.log(res)
        this.$message.info('复制成功')
      })
    },
    colorHandler (color) {
      return color.replace(';', ';\n')
    },
    colorSeeHandler (color) {
      this.colorSee.currentColor = color
      this.colorSee.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/pagination";
  .w-card-inner {
    margin-right: 15px;
    margin-top: 5px;
    width: 176px;
    .w_box {
      width: 128px;
      height: 128px;
      border-radius: 50%;
      padding-right: 10px;
      margin: 0 auto;
    }
  }
</style>
