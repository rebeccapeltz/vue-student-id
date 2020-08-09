import Vue from 'vue'
import Vuex from 'vuex'
import ListAPIData from '../util/ListAPIData'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentList: []
  },
  mutations: {
    insertStudent({ studentList }, student) {
      studentList.unshift(student)
    },
    addStudent({ studentList }, student) {
      studentList.push(student)
    },
    setStudentList({ studentList }, studentData) {
      studentList.push(...studentData)
    }
  },
  actions: {
    fetchStudents(store, cloudname) {
      const dataURL = `https://res.cloudinary.com/${cloudname}/image/list/v${Date.now()}/student-id.json`
      fetch(dataURL)
        .then(response => response.json())
        .then(data => {
          for (const student of data.resources) {
            const studentData = ListAPIData.processSingleStudent(
              student,
              cloudname
            )
            store.commit('addStudent', studentData)
          }
          return store.state.studentList
        })
        .catch(error => {
          console.log('error fetching list', error)
          return []
        })
    }
  },
  getters: {
    allStudents: state => state.studentList
  }
})
