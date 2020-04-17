<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// import { getDb } from './js/dbUtils'
export default {
  created () {
    // eslint-disable-next-line no-undef
    // if (process.env.NODE_ENV === 'production') {
    //   // 判断数据文件是否存在
    //   // eslint-disable-next-line no-undef
    //   // eslint-disable-next-line no-undef
    //   window.fs.exists(`${window.getAppPath()}/databases/colors.db`, (exists) => {
    //     console.log(exists)
    //     if (exists) {
    //       // 存在
    //       // 对数据库版本进行检查
    //       getDb().then(res => {
    //         console.log(res)
    //       }).catch()
    //     } else {
    //       // 不存在
    //       this.welcome()
    //     }
    //   })
    // }
  },
  methods: {
    welcome () {
      this.$router.push({ name: 'welcome' })
    }
  }
}
</script>
<style lang="scss">
</style>
