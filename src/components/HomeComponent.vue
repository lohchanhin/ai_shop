<template>
    <div class="home-container">
      <h2>测试</h2>
      <p>欢迎来到我们的网站！这里是一些介绍信息。</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeComponent'
  }
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    color: #333;
    font-family: 'Arial', sans-serif;
  }
  
  h2 {
    color: #2c3e50;
  }
  
  p {
    font-size: 1.2rem;
    color: #606060;
  }
  </style>
  