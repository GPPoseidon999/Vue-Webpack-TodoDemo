<template>
  <section class="real-app">
      <input 
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="你想要去做什么？"
      @keyup.enter="addTodo"
      >
      <Item 
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      />
      <!-- 绑定一个filter属性 变量为filter -->
      <tabs 
      :filter="filter" 
      :todos="todos"
      @toggle="toggleFilter"
      @clearAll="clearAllCompleted"
      />
  </section>
</template>

<script>
import Item from "./item.vue";
import tabs from './tabs.vue';
let id=0;
export default {
    data(){
        return {
            todos:[],
            filter: 'all'
        }
    },
  components: {
    Item,tabs
  },
  computed:{
    filteredTodos(){
      if(this.filter=== 'all'){
        return this.todos
      }
      const completed=this.filter==='completed'
      return this.todos.filter(todo=>completed===todo.completed)
    }
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content:e.target.value.trim(),
        completed:false
      })
      e.target.value=''
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo=>todo.id===id),1)
    },
    toggleFilter(state){
      this.filter=state
    },
    clearAllCompleted(){
      this.todos=this.todos.filter(todo=>!todo.completed)
    }
  }
};
</script>

<style scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  width: 100%;
  font-size: 20px;
  text-indent: 50px;
  line-height: 50px;
  color: #666;
  border: none;
  outline: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,.03)
}
</style>
