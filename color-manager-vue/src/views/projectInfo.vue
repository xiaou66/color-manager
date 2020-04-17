<template>
  <div>
    <!--页头 -->
    <a-page-header style="" @back="() => this.$router.push({ name:'project' })" :title="project.projects[projectId].name" :subTitle="project.projects[projectId].desc" />
    <!-- 控制区 -->
    <a-row type="flex" justify="space-between">
      <a-col ><a-button type="link" class="underline">添加分类</a-button></a-col>
      <a-col span="8" :pull="1"><a-input-search v-model="searchWorld"  placeholder="请输入要查询的颜色名称" @search="searchHandler" /></a-col>
      <a-col ></a-col>
    </a-row>
    <a-tabs
      v-model="tabKey"
      defaultActiveKey="1"
      tabPosition="left"
      :style="{ height: 'calc(77vh)',marginTop: '5px' }"
    >
      <a-tab-pane v-for="i in 30" :tab="`Tab-${i}`" :key="i">Content of tab {{i}}</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'projectInfo',
  props: ['projectId'],
  computed: {
    ...mapState(['project', 'user'])
  },
  data () {
    return {
      tabKey: 1,
      searchWorld: ''
    }
  },
  methods: {
    searchHandler () {

    }
  }
}
</script>

<style lang="scss" scoped>
.underline:hover {
  border-bottom: 1px solid #1890ff;
}
</style>
