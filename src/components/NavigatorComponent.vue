<template>
    <nav>
      <ul class="navigation">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/shop">商店</router-link></li>
        <!-- <li><router-link to="/contact">联系方式</router-link></li> -->
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
  </style>
  