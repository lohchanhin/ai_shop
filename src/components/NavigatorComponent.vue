<template>
  <nav>
    <ul class="navigation">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/shop">商店</router-link></li>
      <li><router-link to="/car" class="cart-link">
          <i class="fas fa-shopping-cart"></i> <!-- FontAwesome购物车图标 -->
          <span class="cart-count">0</span> <!-- 可以动态显示购物车中的商品数量 -->
        </router-link></li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: 'NavigatorComponent'
}
</script>

<style scoped>
.navigation {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    margin-bottom: 20px;
}

.navigation li {
    display: inline;
}

.navigation li a {
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    display: inline-block;
}

.navigation li a:hover {
    background-color: #555;
}

.cart-link {
    margin-left: auto; /* 将购物车图标推到最右侧 */
    display: flex;
    align-items: center; /* 垂直居中图标和文字 */
}

.cart-count {
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75em;
    margin-left: 5px;
    position: relative;
    top: -2px;
}
</style>
