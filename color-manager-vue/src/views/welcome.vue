<template>
  <div id="welcome">
    <Loading ref="load" v-if="show" @finish="$router.push({ name: 'colourSpectrum' })"></Loading>
    <div id="tip" v-if="!show">
      <div class="title" v-if="first">欢迎第一次使用<span>颜色管理工具</span></div>
      <div class="title" v-if="!first">更新数据</div>
      <div id="desc">需要加载必要数据,插件所有数据将可以离线使用</div>
      <div id="controller">
        <button class="ok" @click="start">开始(在线)</button>
        <button class="ok" @click="startOffline">选择文件(离线)</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    first: {
      default: true
    }
  },
  methods: {
    // 离线加载数据库
    startOffline () {
      window.selectFile().then(res => {
        if (res.length) {
          this.show = true
          const readStream = window.fs.createReadStream(res[0])
          // eslint-disable-next-line no-undef
          const writeStream = window.fs.createWriteStream(`${utools.getPath('userData')}/database/colors.db`)
          // 监听 读完文件的事件
          readStream.on('end', () => {
            writeStream.end()
            this.$refs.load.done()
          })
          readStream.pipe(writeStream)
        } else {
          this.$message.info('未选择文件')
        }
      })
    },
    start () {
      this.show = true
      fetch('https://xiaou520.github.io/colors/colors.db').then(res => res.blob())
        .then(blob => {
          blob.arrayBuffer().then(arrayBuffer => {
            const buffer = window.toBuffer(arrayBuffer)
            console.log(buffer)
            // eslint-disable-next-line no-undef
            window.fs.writeFile(`${utools.getPath('userData')}/database/colors.db`, buffer, (err) => {
              if (err) throw err
              this.$refs.load.done()
            })
          })
        })
    }
  },
  components: { Loading: () => import('../components/Loading') }

}
</script>

<style lang="scss" scoped>
  $backGroud: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  #welcome {
    overflow: hidden;
    max-height: 100vh;
  }
  #tip {
    user-select: none;
    transform: translateY(calc(50% - 100px));
    text-align: center;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
  .title {
    font-size: 24px;
    padding-bottom: 20px;
    span {
      padding-left: 10px;
      background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  #desc {
    padding-bottom: 10px;
  }
  .ok {
    margin-top: 10px;
    border-radius: 10px;
    width: 150px;
    height: 50px;
    border: 0;
    outline: 0;
    color: white;
    /* pink to orange */
    background: $backGroud;
    &:hover{
      cursor: pointer;
    }
    &:last-child {
      margin-left: 10px;
    }
  }

</style>
