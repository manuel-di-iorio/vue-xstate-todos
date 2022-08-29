<template>
  <h1 class="AppTitle">Todos App | Vue, XState and ElementPlus</h1>
  <AddItem />  
  <el-divider />
  <TodosList />
</template>

<script setup>
  import AddItem from './components/AddItem.vue';
  import TodosList from './components/TodosList.vue';
</script>

<style scoped>
  .AppTitle {
    margin-bottom: 1rem;
  }
</style>
