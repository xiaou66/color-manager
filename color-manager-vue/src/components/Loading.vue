<template>
  <div>
    <div id="logo-out">
      <div id="logo" :style="`filter: grayscale(${progress}%) drop-shadow(${shadow}px ${shadow}px ${shadow}px #c3c3c3);`">xiaou</div>
      <div class="star" v-show="show"></div>
      <button id="enter" ref="btn" :style="!show ? 'opacity:1;': ''" @click="ok">开始使用</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      progress: 100,
      shadow: 0,
      time: undefined,
      show: true
    }
  },
  created () {
    this.load()
  },
  methods: {
    ok () {
      this.$emit('finish')
    },
    done () {
      this.progress = 0
      this.shadow = 8
      this.show = false
      clearInterval(this.time)
    },
    load () {
      this.time = setInterval(() => {
        this.progress -= 1
        if (this.progress === 10) {
          this.progress += 50
        }
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
$backgroud: linear-gradient(to right, #ee0979, #ff6a00);
#enter {
    opacity: 0;
    transition: all 1s linear;
    position: absolute;
    bottom: 100px;
    left: calc(50% - 100px);
    border-radius: 10px;
    min-width: 200px;
    min-height: 50px;
    border: 0;
    outline: 0;
    color: white;
    /* pink to orange */
    background: $backgroud;
    vertical-align: top;
  &:hover {
    cursor: pointer;
  }
}
#logo-out {
  position: relative;
}
#logo{
  user-select: none;
  font-family: 'Cooper Std',serif;
  font-size: 180px;
  line-height: 600px;
  text-align: center;
  background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
  -webkit-background-clip: text;
  color: transparent;
  transition: all .8s linear;
}
// 粒子
$stars: 100;         // 粒子数
$depth: 300;         // 深度
$speed: 1s;          // 动画时间
$width: 1500;        // 宽
$height: 960;        // 高
.star{
  position: absolute;
  top: 50%;
  left: 50%;
  width:5px;
  height:5px;
  border-radius:100%;
  animation: fly $speed linear infinite;
  transform-style:preserve-3d;
  $box-shadow: ();
  @for $i from 0 through $stars {
    $box-shadow: $box-shadow, (random($width)-$width/2 + px) (random($height)-$height/2 + px) adjust-hue(#00ff00, random(360));
  }
  box-shadow: $box-shadow;
  /*&:before, &:after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    box-shadow: inherit;
  }
  &:before {
    transform: translateZ(-$depth + px);
    opacity: .3;
  }
  &:after {
    transform: translateZ(-$depth * 2 + px);
    opacity: .1;
  }*/
}
@keyframes fly {
  from {
    transform: translateZ(0px);
    top: 0;
    left: 0;
  }
  to {
    transform: translateZ($depth + px);
    top: 80%;
    left: 10%;
  }
}
</style>
