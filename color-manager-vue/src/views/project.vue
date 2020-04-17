<template>
  <div>
    <a-row type="flex" justify="end">
      <a-col>
        <a-icon @click="addProject.visible = true" type="plus" id="add_btn"/>
      </a-col>
    </a-row>
    <a-row  type="flex" justify="start">
      <a-col v-for="(id, index) in project.projectIndex" :key="index">
        <a-card :title="project.projects[id].name" class="project_item">
          <span href="#" slot="extra">
              <a-icon type="appstore" @click="openProjectHandler(id)"/>
              <a-icon style="padding-left: 5px;" type="delete" @click="deleteProjectHandler(id)"/>
          </span>
          <div class="user">
            <a-tooltip>
              <template slot="title">
                拥有者
              </template>
              <a-avatar shape="square" :size="24" icon="user"/>
            </a-tooltip>
            <span>{{project.projects[id].owner}}</span>
          </div>
          <div>{{project.projects[id].desc}}</div>
        </a-card>
      </a-col>
    </a-row>
    <!-- 添加项目 -->
    <a-modal title="添加项目" v-model="addProject.visible" @ok="addProjectHandler" @cancel="addProjectInit">
      <a-input placeholder="请输入项目名" v-model="addProject.name"/>
      <a-textarea style="margin-top: 10px" placeholder="请输入项目描述" :rows="4" v-model="addProject.desc"/>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'project',
  computed: {
    ...mapState(['project', 'user'])
  },
  data () {
    return {
      addProject: {
        visible: false,
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    addProjectInit () {
      this.addProject = {
        visible: false,
        name: '',
        desc: ''
      }
    },
    addProjectHandler () {
      const name = this.addProject.name
      const desc = this.addProject.desc
      if (name && desc) {
        this.$store.commit('addProject', { name, desc, user: this.user.name })
        this.addProject.visible = false
        this.addProjectInit()
      } else {
        this.$message.error('项目名和描述不能为空')
      }
    },
    deleteProjectHandler (id) {
      const html = <div>你确定要删除项目 <b style="color:red;">{ this.project.projects[id].name }</b></div>
      // const html = `<div>你确定要删除项目 <b style="color:red;">${this.project.projects[id].name}</b></div>`
      this.$confirm({
        title: '删除项目',
        content: h => html,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          //  判断项目是归属
          if (this.project.projects[id].uid === this.user.uid) {
            this.$store.commit('deleteProject', id)
          } else {
            this.$message.warning('只有项目的拥有者才可以删除')
          }
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    openProjectHandler (id) {
      this.$router.push({ name: 'projectInfo', query: { projectId: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
#add_btn {
  color: white;
  background: #1890ff;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  &:hover {
    background: skyblue;
    cursor: pointer;
  }
}
.project_item {
  width: 190px;
  height: 200px;
  margin-right: 8px;
  margin-bottom: 8px;
  .user {
    padding-bottom: 10px;
    border-bottom: #ccc dashed 1px;
    span:last-child {
      padding-left: 8px;
    }
  }
  &:hover {
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
  }
}
</style>
