<template>
  <div id="gradientEdit">
    渐变色编辑
    <!--<a-row>
      <a-col>
        <div id="color"></div>
      </a-col>
      <a-col id="tool">
        <span><a-icon type="plus" /></span>
        <span><a-icon type="plus" /></span>
        <span><a-icon type="plus" /></span>
        <span><a-icon type="plus" /></span>
        <span><a-icon type="plus" /></span>
      </a-col>
    </a-row>-->
  </div>
</template>

<script>
export default {
  name: 'gradientEdit'
}
</script>

<style lang="scss" scoped>
#gradientEdit {
  padding-top: 20px;
}
#color {
  width: 100%;
  height: 260px;
  background: pink;
  border-radius: 16px;
}
#tool {
  font-size: 18px;
  padding-left: 16px;
  padding-top: 10px;
  span {
    padding-left: 30px;
  }
}
</style>
