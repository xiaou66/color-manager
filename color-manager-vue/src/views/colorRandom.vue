<template>
  <div id="colorRandom">
    <a-spin tip="Loading..." :spinning="loading">
    <a-row type="flex">
      <a-col v-for="(item,index) in data" :key="index">
        <div class="showColor" :style="{background: `rgba(${item.color.rgba.r},${item.color.rgba.g},${item.color.rgba.b},${item.color.rgba.a})`}">
        </div>
        <a-row class="tool">
            <span class="colors">
              <IconFont class="tool-font" type="iconzhuti_tiaosepan_o" @click="item.show = !item.show" />
              <div @mouseleave="item.show = false" class="color" v-show="item.show">
                <colorPicker v-model="item.color" ></colorPicker>
              </div>
            </span>
            <IconFont class="tool-font" @click="item.lock = !item.lock" :type="item.lock ? 'iconqiaosuo':'iconkaisuo'" />
            <IconFont class="tool-font" type="iconangle-right" style="transform: rotate(180deg)" @click="pre(index)"/>
            <IconFont class="tool-font" type="iconangle-right" @click="next(index)"/>
        </a-row>
      </a-col>
    </a-row>
    </a-spin>
    <div style="padding-top: 20px;">
      <a-button type="primary" @click="random">再随机一组</a-button>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: 'font_1756555_9qzbrhnxtzg.js'
})
export default {
  data () {
    return {
      data: [
        {
          color: {
            hex: '#194d33',
            rgba: { r: 25, g: 77, b: 51, a: 1 }
          },
          show: false,
          lock: false
        },
        {
          color: {
            hex: '#194d33',
            rgba: { r: 25, g: 77, b: 51, a: 1 }
          },
          show: false,
          lock: false
        },
        {
          color: {
            hex: '#194d33',
            rgba: { r: 25, g: 77, b: 51, a: 1 }
          },
          show: false,
          lock: false
        },
        {
          color: {
            hex: '#194d33',
            rgba: { r: 25, g: 77, b: 51, a: 1 }
          },
          show: false,
          lock: false
        },
        {
          color: {
            hex: '#194d33',
            rgba: { r: 25, g: 77, b: 51, a: 1 }
          },
          show: false,
          lock: false
        }],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    pre (index) {
      if (index === 0) {
        this.$message.warn('已经是第一个了')
        return
      }
      const newData = [...this.data]
      const tmp = newData[index - 1]
      newData[index - 1] = newData[index]
      newData[index] = tmp
      this.data = newData
    },
    next (index) {
      if (index === this.data.length - 1) {
        this.$message.warn('已经是最后一个了')
        return
      }
      const newData = [...this.data]
      const tmp = newData[index + 1]
      newData[index + 1] = newData[index]
      newData[index] = tmp
      this.data = newData
    },
    random () {
      this.getData()
    },
    getData () {
      this.loading = true
      const data = { input: ['N', 'N', 'N', 'N', 'N'], model: 'default' }
      this.data.forEach((item, index) => {
        if (item.lock) {
          data.input[index] = [item.color.rgba.r, item.color.rgba.g, item.color.rgba.b]
        }
      })
      fetch(`${this.$url.colormind}/api/`, {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(data => {
          data.result.forEach((item, index) => {
            console.log(item)
            this.data[index].color.rgba = { r: item[0], g: item[1], b: item[2], a: 1 }
          })
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  },
  components: {
    colorPicker: Sketch,
    IconFont
  }
}
</script>

<style lang="scss" scoped>
.colors {
  position: relative;
  .color {
    position: absolute;
    z-index: 100;
  }
}
#colorRandom {
  padding-top: 20px;
}
.showColor {
  width: 120px;
  height: 200px;
}
.tool {
  padding-top: 6px;
  padding-left: 4px;
}
.tool-font {
  font-size: 20px;
  padding-right: 10px;
  &:nth-child(3) {
    padding: 0;
    padding-left: 10px;
  }
}
</style>
