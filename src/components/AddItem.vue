<template>
  <form v-on:submit.prevent="noop">
    <el-row :gutter="30">
      <el-col :span="19">
        <el-input v-model="input" placeholder="Your todo here.." clearable @keyup.enter.native="createTodo" />
      </el-col>

      <el-col :span="4" @click="createTodo">
        <el-button type="primary" :icon="Plus" :disabled="!input.length">Add todo</el-button>
      </el-col>
    </el-row>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { ElNotification } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import { useTodosMachine } from "@/xstate/todos";

  const { send: sendTodo } = useTodosMachine();
  const input = ref('');

  const createTodo = () => {
    if (!input.value) return;
    sendTodo({ type: "ADD_TODO", value: input.value });
    input.value = "";

    ElNotification({
      message: 'Successfully added an item!',
      type: 'success'
    });
  };
</script>
