<template>
  <div id="app">
    <AppBar/> <!-- 使用组件 -->
    <router-view></router-view> <!-- Vue Router的视图输出 -->
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { useCartStore } from './store/cartStore'; // 确保路径正确
import AppBar from "./components/NavigatorComponent";

// 使用购物车状态管理功能
const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
provide('cartStore', { cart, addToCart, removeFromCart, clearCart });
</script>

<script>
export default {
  name: 'App',
  components: {
    AppBar
  }
};
</script>
