<template>
  <!-- Empty container -->
  <el-empty description="No todos added yet" v-if="!todos.length" />

  <el-space class="ListSpaceContainer" direction="vertical" :fill="true">
    <!-- Completed todos count -->
    <small v-if="todos.length" class="CompletedTodosCount">
      <span v-text="completedTodos"></span> items out of <span v-text="todos.length"></span> completed
    </small>    
    
    <!-- Todos list -->
    <el-card v-for="(todo, index) in todos" class="box-card">
      <el-row align="middle" :gutter="20">
        <el-col :span="2">
          <el-button :icon="todo.completed ? CircleCheckFilled : CircleCheck"
           :circle="true" @click="toggleTodoCompleted(index)" />
        </el-col>

        <!-- Text -->
        <el-col :span="20">
          <el-row class="TextRow">
            <el-col v-text="todo.value" />
          </el-row>
        </el-col>

        <!-- Action button -->
        <el-col :span="2">
          <el-button :icon="Delete" :circle="true" @click="removeTodo(index)" />
        </el-col>
      </el-row>
    </el-card>
  </el-space>
</template>

<script setup>
  import { computed } from "@vue/reactivity";
  import { useTodosMachine } from "@/xstate/todos";
  import { Delete, CircleCheck, CircleCheckFilled } from "@element-plus/icons-vue";
  import { ElNotification } from 'element-plus';

  const { state: todosState, send: sendTodo } = useTodosMachine();
  const todos = computed(() => todosState.value.context.list);
  const completedTodos = computed(() => todosState.value.context.list.reduce((count, item) => count + item.completed, 0));

  const removeTodo = (index) => {    
    const todoText = todos.value[index].value;

    sendTodo({ type: 'REMOVE_TODO', index });    

    ElNotification({
      message: `Removed the item '${todoText}'`,
      type: "info"
    });
  };

  const toggleTodoCompleted = (index) => {
    sendTodo({ type: 'TOGGLE_COMPLETE_TODO', index });
  };
</script>

<style scoped>
  .ListSpaceContainer {
    width: 100%;
  }

  .CompletedTodosCount {
    text-align: right;
  }
</style>
