import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentList: []
  },
  mutations: {
    addStudent({ studentList }, student) {
      studentList.push(student)
    }
  },
  getters: {
    allStudents: state => state.studentList
  }
})