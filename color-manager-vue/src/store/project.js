const project = {
  state: {
    projectIndex: ['t001'],
    projects: {
      t001: {
        name: 'ww',
        desc: 'wwwwwwwwwwww',
        owner: 'xiaou',
        uid: 1,
        collaborator: []
      }
    },
    projectInfo: {
      t001: {}
    }
  },
  mutations: {
    addProject (state, data) {
      const key = `t${new Date().getTime()}`
      state.projectIndex.push(key)
      // TODO user
      state.projects[key] = { name: data.name, desc: data.desc, uid: data.uid }
      state.projectInfo[key] = {}
    },
    deleteProject (state, id) {
      const index = state.projectIndex.findIndex((i) => i === id)
      const old = [...state.projectIndex]
      old.splice(index, 1)
      state.projectIndex = old
      delete state.projects[id]
      delete state.projectInfo[id]
    }

  },
  actions: {

  },
  getters: { }
}

export default project
