<template>
  <div id="app">
    <div><AppBar/></div> <!-- 确保组件标签正确大写，符合 PascalCase 命名 -->
    <router-view></router-view>
  </div>
</template>

<script>
import AppBar from "./components/NavigatorComponent";

export default {
  name: 'App',
  components: {
    AppBar // 这里应该是一个对象，键是组件的引用名，值是导入的组件
  }
};
</script>
