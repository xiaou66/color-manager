<template>
  <div class="index">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 菜单 -->
      <a-layout-sider collapsible="collapsible" v-model="collapsed">
        <div class="logo" />
        <a-menu theme="dark" :defaultSelectedKeys="['colourSpectrum']" mode="inline" @select="menuHandler">
          <a-sub-menu key="colorLib">
            <template slot="title"><a-icon type="code-sandbox" /><span>颜库</span></template>
            <a-menu-item key="colourSpectrum">
              <a-icon type="bg-colors" />
              <span>色谱</span>
            </a-menu-item>
            <a-menu-item key="gradient">
              <a-icon type="bg-colors" />
              <span>渐变</span>
            </a-menu-item>
            <a-menu-item key="colourMatching">
              <a-icon type="align-center" />
              <span>配色</span>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="colorTool">
            <template slot="title"><a-icon type="highlight" /><span>工具</span></template>
            <a-menu-item key="colorPicker">
              <a-icon type="highlight" />
              <span>网站提取</span>
            </a-menu-item>
            <a-menu-item key="colorRandom">
              <a-icon type="pie-chart" />
              <span>随机颜色</span>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="colorOperationDesk">
            <template slot="title"><a-icon type="code-sandbox" /><span>操作台</span></template>
            <a-menu-item key="gradientEdit">
              <a-icon type="highlight" />
              <span>渐变色编辑</span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="project">
            <a-icon type="project" />
            <span>项目</span>
          </a-menu-item>
          <a-menu-item key="user">
            <a-icon type="user" />
            <span>用户</span>
          </a-menu-item>
          <a-menu-item key="setting">
            <a-icon type="setting" />
            <span>设置</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <!-- 内容 -->
      <a-layout>
        <a-layout-content style="margin-left: 10px;">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '100vh',paddingBottom: '10px',
          maxHeight:'100vh', overflowY:'auto' }">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
// const initSqlJs = require('../lib/sql-wasm')
import getDb from '../js/dbUtils'
export default {
  data () {
    return {
      collapsed: false
    }
  },
  created: function () {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'production') {
      // 判断数据文件是否存在
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-undef
      window.fs.exists(`${utools.getPath('userData')}/databases/colors.db`, (exists) => {
        console.log(exists)
        if (exists) {
          // 存在
          // 初始化数据库连接
          fetch('https://xiaou520.github.io/colors/version.txt').then(res => res.text())
            .then(v => {
              getDb().then(db => {
                console.log(db)
                this.$store.state.db = db
                const res = db.exec('SELECT value FROM setting WHERE `key` = \'version\'')
                const version = res[0].values[0][0]
                if (parseInt(version) < parseInt(v)) {
                  console.log('数据库需要更新')
                  this.$confirm({
                    cancelText: '放弃',
                    okText: '更新',
                    title: '数据更新',
                    content: h => <div>数据库需要更新:当前版本: v{version}<br/>最新版本: v{v}</div>,
                    onOk: () => {
                      this.$router.push({
                        name: 'welcome',
                        query: { first: false }
                      })
                    },
                    onCancel () {
                      console.log('Cancel')
                    }
                  })
                } else {
                  console.log('当前已经是最新数据库')
                }
              }).catch()
            })
        } else {
          // 不存在
          this.$router.push({ name: 'welcome' })
        }
      })
    }
  },
  methods: {
    menuHandler ({ key }) {
      this.collapsed = true
      if (key.includes('collect')) {
        // TODO 个人收藏
        return
      }
      this.$router.push({ name: key })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
